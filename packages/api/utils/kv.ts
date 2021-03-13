export class WrappedKVNamespace {
    constructor(private kvNamespace: KVNamespace) {}

    async get<T>(key: string): Promise<T | null> {
        const data = await this.kvNamespace.get(key, 'text');
        if (!data) {
            return null;
        }

        return JSON.parse(data) as T;
    }

    async put<T>(key: string, value: T, ttlSeconds?: number) {
        await this.kvNamespace.put(key, JSON.stringify(value), {
            expirationTtl: ttlSeconds,
        });
    }

    list = this.kvNamespace.list;
    getWithMetadata = this.kvNamespace.getWithMetadata;
    delete = this.kvNamespace.delete;
}

class EmulatedKV implements KVNamespace {
    constructor() {
        console.warn('EmulatedKV used. Data will be lost.');
    }

    private data: Map<string, any> = new Map();

    async get<T>(key: string): Promise<T | null> {
        if (!this.data.has(key)) {
            return null;
        }

        return this.data.get(key);
    }

    async getWithMetadata<T, Metadata = unknown>(
        key: string
    ): KVValueWithMetadata<T, Metadata> {
        return {
            value: await this.get<T>(key),
            metadata: {} as Metadata,
        };
    }

    async put(key: string, value: string | ReadableStream<any> | ArrayBuffer | FormData) {
        this.data.set(key, value);
    }

    async delete(key: string) {
        this.data.delete(key);
    }

    async list(options?: {
        prefix?: string;
        limit?: number;
        cursor?: string;
    }): Promise<{
        keys: { name: string; expiration?: number; metadata?: unknown }[];
        list_complete: boolean;
        cursor: string;
    }> {
        let keys: { name: string }[] = [];

        for (let key of this.data.keys()) {
            if (options?.prefix && !key.startsWith(options.prefix)) {
                continue;
            }

            keys.push({ name: key });
        }

        return {
            keys,
            cursor: '0',
            list_complete: true,
        };
    }
}

const kvOrLocal = (namespace: KVNamespace | null): KVNamespace =>
    namespace || new EmulatedKV();

const self = (global as any) as Record<string, any>;

export const Sessions = new WrappedKVNamespace(kvOrLocal(self.KV_SESSIONS ?? null));
export const GuildData = new WrappedKVNamespace(kvOrLocal(self.KV_GUILD_DATA ?? null));
export const Guilds = new WrappedKVNamespace(kvOrLocal(self.KV_GUILDS ?? null));
export const Infrastructure = new WrappedKVNamespace(
    kvOrLocal(self.KV_INFRASTRUCTURE ?? null)
);
