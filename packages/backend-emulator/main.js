#!/usr/bin/env node
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const vm = require('vm');
const http = require('http');
const fs = require('fs');
const chokidar = require('chokidar');
const webpack = require('webpack');
const { Crypto } = require('@peculiar/webcrypto');
const { KVShim } = require('./kv');
const crypto = new Crypto();
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2));

const basePath = args.basePath || process.cwd();
if (!basePath) {
  throw new Error('--basePath is not set.');
}

const workerConfig = require(`${basePath}/worker.config.js`);

const getKVs = (namespaces = []) =>
  namespaces.reduce((acc, ns) => ({ ...acc, [ns]: new KVShim(ns) }), {});

const workerShims = {
  ...workerConfig.environment,
  ...getKVs(workerConfig.kv),
};

let listeners = [];

let isResponseConstructorAllowed = false;

/**
 * SafeResponse wraps a fetch Response to yell loudly if constructed at an unsafe time.
 * Cloudflare will reject all Response objects that aren't created during a request, so no pre-generation is allowed.
 */
class SafeResponse extends fetch.Response {
  constructor(...args) {
    super(...args);

    if (!isResponseConstructorAllowed) {
      throw new Error(
        'Response object created outside of request context. This will be rejected by Cloudflare.'
      );
    }
  }
}

const context = () =>
  vm.createContext(
    {
      addEventListener: (a, fn) => {
        if (a === 'fetch') {
          console.log('addEventListeners: added fetch');
          listeners.push(fn);
        }
      },
      Response: SafeResponse,
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
      let loggedStatus;
      try {
        const response = await value;
        if (!response) {
          throw new Error(`response was invalid, got ${JSON.stringify(response)}`);
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
      isResponseConstructorAllowed = false;
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

  isResponseConstructorAllowed = true;
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
      fs.readFileSync(path.resolve(__dirname, `${basePath}/dist/worker.js`)),
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
    const webpackConfig = require(`${basePath}/webpack.config.js`);
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

const watcher = chokidar.watch(path.resolve(__dirname, basePath), {
  ignoreInitial: true,
  ignore: '**/{dist,node_modules}',
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
