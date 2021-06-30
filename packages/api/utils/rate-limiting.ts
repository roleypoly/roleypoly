import { WrappedKVNamespace } from './kv';

export const useRateLimiter =
  (kv: WrappedKVNamespace, key: string, timeoutSeconds: number) =>
  async (): Promise<boolean> => {
    const value = await kv.get<boolean>(key);
    if (value) {
      return true;
    }

    await kv.put(key, true, timeoutSeconds);
    return false;
  };
