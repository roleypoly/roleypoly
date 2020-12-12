require('dotenv').config();
const vm = require('vm');
const http = require('http');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const { Crypto } = require('@peculiar/webcrypto');
const roleypolyConfig = require('../backend-worker/roleypoly.config');
const redis = require('redis');
const { RedisKVShim } = require('./kv');
const crypto = new Crypto();

const redisClient = redis.createClient({ host: 'redis' });

const getKVs = (redisClient, namespaces = []) => {
    namespaces.reduce(
        (acc, ns) => ({ ...acc, [ns]: new RedisKVShim(redisClient, ns) }),
        {}
    );
};

const workerShims = {
    ...roleypolyConfig.environment,
    ...getKVs(redisClient, roleypolyConfig.kv),
};

let listeners = [];

const context = () =>
    vm.createContext(
        {
            addEventListener: (a, fn) => {
                if (a === 'fetch') {
                    console.log('addEventListeners: added fetch');
                    listeners.push(fn);
                }
            },
            Response: class {
                constructor(body, opts = {}) {
                    this.body = Buffer.from(body || '');
                    this.headers = opts.headers || {};
                    this.url = opts.url || {};
                    this.status = opts.status || 200;
                }
            },
            URL: URL,
            crypto: crypto,
            setTimeout: setTimeout,
            setInterval: setInterval,
            clearInterval: clearInterval,
            clearTimeout: clearTimeout,
            ...workerShims,
        },
        {
            codeGeneration: {
                strings: false,
                wasm: false,
            },
        }
    );

const server = http.createServer((req, res) => {
    const event = {
        respondWith: async (value) => {
            const timeStart = Date.now();
            const response = await value;
            const timeEnd = Date.now();
            console.log(
                `${response.status} [${timeEnd - timeStart}ms] - ${req.method} ${req.url}`
            );
            res.statusCode = response.status;
            Object.entries(response.headers).forEach(([k, v]) => res.setHeader(k, v));
            res.end(response.body);
        },
        request: {
            url: `http://${req.headers.host || 'localhost'}${req.url}`,
            body: req,
            headers: Object.entries(req.headers).reduce(
                (acc, [k, v]) => acc.set(k, v),
                new Map()
            ),
            method: req.method,
        },
    };

    event.request.headers.set('cf-client-ip', req.connection.remoteAddress);

    if (listeners.length === 0) {
        res.statusCode = 503;
        res.end('No handlers are available.');
        console.error('No handlers are available');
        return;
    }

    for (let listener of listeners) {
        try {
            listener(event);
        } catch (e) {
            console.error('listener errored', e);
        }
    }
});

const fork = async (fn) => fn();

const reload = () => {
    // Clear listeners...
    listeners = [];

    // Fork and re-run
    fork(async () =>
        vm.runInContext(
            fs.readFileSync(path.resolve(__dirname, '../backend-worker/dist/worker.js')),
            context(),
            {
                displayErrors: true,
            }
        )
    );
};

const rebuild = () =>
    new Promise((resolve, reject) => {
        const webpackConfig = require('../backend-worker/webpack.config.js');
        webpackConfig.output.filename = 'worker.js';
        webpack(webpackConfig).run((err, stats) => {
            if (err) {
                console.log('Compilation failed.', err);
                reject(err);
            } else {
                console.log('Compilation done.');
                resolve();
            }
        });
    });

const watcher = chokidar.watch(path.resolve(__dirname, '../backend-worker'), {
    ignoreInitial: true,
    ignore: '**/dist',
});

watcher.on('all', async (type, path) => {
    if (path.includes('dist')) {
        return;
    }

    console.log('change detected, rebuilding and reloading', { type, path });

    await rebuild();
    reload();
});

fork(async () => {
    await rebuild();
    reload();
});

console.log('starting on http://localhost:6609');
server.listen(6609, '0.0.0.0');
