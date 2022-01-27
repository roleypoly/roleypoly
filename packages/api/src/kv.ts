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

  getRaw = this.kvNamespace.get;
  list = this.kvNamespace.list;
  getWithMetadata = this.kvNamespace.getWithMetadata;
  delete = this.kvNamespace.delete;
}
