require('dotenv').config();
const vm = require('vm');
const http = require('http');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const { Crypto } = require('@peculiar/webcrypto');
const roleypolyConfig = require('../backend-worker/roleypoly.config');
const { KVShim } = require('./kv');
const crypto = new Crypto();
const fetch = require('node-fetch');

const getKVs = (namespaces = []) =>
    namespaces.reduce((acc, ns) => ({ ...acc, [ns]: new KVShim(ns) }), {});

const workerShims = {
    ...roleypolyConfig.environment,
    ...getKVs(roleypolyConfig.kv),
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
            Response: fetch.Response,
            URL: URL,
            crypto: crypto,
            setTimeout: setTimeout,
            setInterval: setInterval,
            clearInterval: clearInterval,
            clearTimeout: clearTimeout,
            fetch: fetch,
            console: console,
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
            let loggedStatus = 'xxx';
            try {
                const response = await value;
                if (!response) {
                    throw new Error(
                        `response was invalid, got ${JSON.stringify(response)}`
                    );
                }
                res.statusCode = response.status;
                loggedStatus = String(response.status);
                response.headers.forEach((value, key) => res.setHeader(key, value));
                res.end(response.body);
            } catch (e) {
                console.error(e);
                res.statusCode = 500;
                loggedStatus = '500';
                res.end(JSON.stringify({ error: 'internal server error' }));
            }
            const timeEnd = Date.now();
            console.log(
                `${loggedStatus} [${timeEnd - timeStart}ms] - ${req.method} ${req.url}`
            );
        },
        request: new fetch.Request(
            new URL(`http://${req.headers.host || 'localhost'}${req.url}`),
            {
                body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
                headers: req.headers,
                method: req.method,
            }
        ),
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
                filename: 'worker.js',
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
                if (stats.hasErrors()) {
                    console.error('Compilation errored:', stats.compilation.errors);
                    return;
                }

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
