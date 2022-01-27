import { WrappedKVNamespace } from '@roleypoly/api/src/kv';
import { monotonicFactory } from 'ulid-workers';
const ulid = monotonicFactory();

export const setupStateSession = async <T>(
  Sessions: WrappedKVNamespace,
  data: T
): Promise<string> => {
  const stateID = ulid();

  await Sessions.put(`state_${stateID}`, { data }, 60 * 5);

  return stateID;
};

export const getStateSession = async <T>(
  Sessions: WrappedKVNamespace,
  stateID: string
): Promise<T | undefined> => {
  const stateSession = await Sessions.get<{ data: T }>(`state_${stateID}`);

  return stateSession?.data;
};
