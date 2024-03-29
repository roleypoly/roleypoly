export const json = <T>(obj: T, init?: ResponseInit): Response => {
  const body = JSON.stringify(obj);
  return new Response(body, {
    ...init,
    headers: {
      ...init?.headers,
      'content-type': 'application/json; charset=utf-8',
      ...corsHeaders,
    },
  });
};

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export const noContent = () => new Response(null, { status: 204, headers: corsHeaders });
export const seeOther = (url: string) =>
  new Response(
    `<!doctype html>If you are not redirected soon, <a href="${url}">click here.</a>`,
    {
      status: 303,
      headers: {
        location: url,
        'content-type': 'text/html; charset=utf-8',
      },
    }
  );

export const invalid = () => json({ error: 'invalid request' }, { status: 400 });
export const unauthorized = () => json({ error: 'unauthorized' }, { status: 401 });
export const forbidden = () => json({ error: 'forbidden' }, { status: 403 });
export const notFound = () => json({ error: 'not found' }, { status: 404 });
export const serverError = (error: Error) => {
  console.error(error);
  console.trace();
  return json({ error: 'internal server error' }, { status: 500 });
};
export const notImplemented = () => json({ error: 'not implemented' }, { status: 501 });

// Only used to bully you in particular.
// Maybe make better choices.
export const engineeringProblem = (extra?: string) =>
  json({ error: 'engineering problem', extra }, { status: 418 });
