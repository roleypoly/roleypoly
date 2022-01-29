import { Context, RoleypolyMiddleware } from '@roleypoly/api/src/utils/context';

export const getQuery = (request: Request): { [x: string]: string } => {
  const output: { [x: string]: string } = {};

  new URL(request.url).searchParams.forEach((value, key) => {
    output[key] = value;
  });

  return output;
};

export const formData = (obj: Record<string, any>): string => {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
};

export const formDataRequest = (
  obj: Record<string, any>,
  init?: RequestInit
): RequestInit => {
  return {
    method: 'POST', // First, so it can be overridden.
    ...init,
    headers: {
      ...(init?.headers || {}),
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: formData(obj),
  };
};

export const injectParams: RoleypolyMiddleware = (
  request: Request & { params?: Record<string, string> },
  context: Context
) => {
  context.params = {
    guildId: request.params?.guildId,
    memberId: request.params?.memberId,
  };
};
