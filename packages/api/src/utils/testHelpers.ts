import { Environment } from '@roleypoly/api/src/config';
import index from '../index';

export const makeRequest = (
  method: string,
  path: string,
  init?: RequestInit,
  env?: Partial<Environment>
): Promise<Response> => {
  const request = new Request(`https://localhost:22000${path}`, {
    method,
    ...init,
  });

  return index.fetch(
    request,
    {
      ...getMiniflareBindings(),
      ...env,
    },
    {
      waitUntil: async (promise: Promise<{}>) => await promise,
    }
  );
};

export const getBindings = (): Environment => getMiniflareBindings();
