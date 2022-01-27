export const json = (obj: any, init?: ResponseInit): Response => {
  const body = JSON.stringify(obj);
  return new Response(body, {
    ...init,
    headers: {
      ...init?.headers,
      'content-type': 'application/json; charset=utf-8',
    },
  });
};

export const notFound = () => json({ error: 'not found' }, { status: 404 });

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
