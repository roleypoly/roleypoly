export class WrappedKVNamespace {
  constructor(private kvNamespace: KVNamespace) {
    this.getRaw = kvNamespace.get.bind(kvNamespace);
    this.putRaw = kvNamespace.put.bind(kvNamespace);
    this.delete = kvNamespace.delete.bind(kvNamespace);
    this.list = kvNamespace.list.bind(kvNamespace);
    this.getWithMetadata = kvNamespace.getWithMetadata.bind(kvNamespace);
  }

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

  public getRaw: (
    ...args: Parameters<KVNamespace['get']>
  ) => ReturnType<KVNamespace['get']>;
  public putRaw: (
    ...args: Parameters<KVNamespace['put']>
  ) => ReturnType<KVNamespace['put']>;
  public list: (
    ...args: Parameters<KVNamespace['list']>
  ) => ReturnType<KVNamespace['list']>;
  public getWithMetadata: (
    ...args: Parameters<KVNamespace['getWithMetadata']>
  ) => ReturnType<KVNamespace['getWithMetadata']>;
  public delete: (
    ...args: Parameters<KVNamespace['delete']>
  ) => ReturnType<KVNamespace['delete']>;
}
