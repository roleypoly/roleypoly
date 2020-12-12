const redis = require('redis');
const { promisify } = require('util');

let hasWarned = false;

const getConversion = {
    text: (x) => x,
    json: (x) => JSON.parse(x),
    arrayBuffer: (x) => Buffer.from(x).buffer,
    stream: (x) => Buffer.from(x),
};

class RedisKVShim {
    constructor(redisClient, namespace) {
        this.namespace = namespace;
        this._redis = redisClient;
        this._redisGet = promisify(this._redis.get).bind(redisClient);
        this._redisSetex = promisify(this._redis.setex).bind(redisClient);
        this._redisSet = promisify(this._redis.set).bind(redisClient);
        this._redisDel = promisify(this._redis.del).bind(redisClient);
    }

    key(key) {
        return `${this.namespace}__${key}`;
    }

    async get(key, type = 'text') {
        const result = await this._redisGet(this.key(key));

        if (!result) {
            return null;
        }

        return getConversion[type](result);
    }

    async getWithMetadata(key, type) {
        return {
            value: await this.get(key, type),
            metadata: {},
        };
    }

    async put(key, value, { expirationTtl, expiration, metadata }) {
        if ((expiration || metadata) && !hasWarned) {
            console.warn(
                'expiration and metadata is lost in the emulator. Use expirationTtl, please.'
            );
            hasWarned = true;
        }

        if (expirationTtl) {
            return this._redisSetex(this.key(key), value, expirationTtl);
        }

        return this._redisSet(this.key(key), value);
    }

    async delete(key) {
        return this._redisDel(this.key(key));
    }

    list() {
        console.warn('List is frowned upon and will fail to fetch keys in the emulator.');
        return {
            keys: [],
            cursor: '0',
            list_complete: true,
        };
    }
}

module.exports = {
    RedisKVShim,
};
