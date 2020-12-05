class WrappedKVNamespace {
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

export const Sessions = new WrappedKVNamespace(KV_SESSIONS);
export const GuildData = new WrappedKVNamespace(KV_GUILD_DATA);
export const Guilds = new WrappedKVNamespace(KV_GUILDS);
