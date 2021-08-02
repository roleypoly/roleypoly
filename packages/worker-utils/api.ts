export const respond = (obj: Record<string, any>, init: ResponseInit = {}) =>
  new Response(JSON.stringify(obj), {
    ...init,
    headers: {
      ...(init.headers || {}),
      'content-type': 'application/json',
    },
  });

export const userAgent =
  'DiscordBot (https://github.com/roleypoly/roleypoly, git-main) (+https://roleypoly.com)';

export const getQuery = (request: Request): { [x: string]: string } => {
  const output: { [x: string]: string } = {};

  for (let [key, value] of new URL(request.url).searchParams.entries()) {
    output[key] = value;
  }

  return output;
};
