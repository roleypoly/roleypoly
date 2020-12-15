const level = require('level');
const path = require('path');
const fs = require('fs');

let hasWarned = false;

const getConversion = {
    text: (x) => x,
    json: (x) => JSON.parse(x),
    arrayBuffer: (x) => Buffer.from(x).buffer,
    stream: (x) => Buffer.from(x),
};

class KVShim {
    constructor(namespace) {
        this.namespace = namespace;

        fs.mkdirSync(path.resolve(__dirname, '../../.devdbs'), {
            recursive: true,
        });

        (async () => {
            this.level = await level(path.resolve(__dirname, '../../.devdbs', namespace));
        })();
    }

    makeValue(value, expirationTtl) {
        if (!expirationTtl) {
            return JSON.stringify({
                value,
                expires: false,
            });
        }

        return JSON.stringify({
            value,
            expires: Date.now() + 1000 * expirationTtl,
        });
    }

    validate(value) {
        if (!value) {
            return false;
        }

        if (value.expires && value.expires < Date.now()) {
            return false;
        }

        return true;
    }

    async get(key, type = 'text') {
        try {
            const result = JSON.parse(await this.level.get(key));

            if (!this.validate(result)) {
                return null;
            }

            return getConversion[type](result.value);
        } catch (e) {
            return null;
        }
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

        return await this.level.put(key, this.makeValue(value, expirationTtl));
    }

    async delete(key) {
        return this.level.del(key);
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
    KVShim,
};
