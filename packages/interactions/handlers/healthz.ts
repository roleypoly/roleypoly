import { respond } from '@roleypoly/worker-utils';

export const healthz = async (request: Request): Promise<Response> => {
  return respond({ ok: true });
};
