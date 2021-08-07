export type Handler = (
  request: Request,
  tools: HandlerTools
) => Promise<Response> | Response;

export type HandlerTools = {
  waitUntil: FetchEvent['waitUntil'];
};

type RoutingTree = {
  [method: string]: {
    [path: string]: Handler;
  };
};

type Fallbacks = {
  root: Handler;
  404: Handler;
  500: Handler;
};

export class Router {
  private routingTree: RoutingTree = {};
  private fallbacks: Fallbacks = {
    root: this.respondToRoot,
    404: this.notFound,
    500: this.serverError,
  };

  private corsOrigins: string[] = [];

  addCORSOrigins(origins: string[]) {
    this.corsOrigins = [...this.corsOrigins, ...origins];
  }

  addFallback(which: keyof Fallbacks, handler: Handler) {
    this.fallbacks[which] = handler;
  }

  add(method: string, rootPath: string, handler: Handler) {
    const lowerMethod = method.toLowerCase();

    if (!this.routingTree[lowerMethod]) {
      this.routingTree[lowerMethod] = {};
    }

    this.routingTree[lowerMethod][rootPath] = handler;
  }

  async handle(event: FetchEvent): Promise<Response> {
    const response = await this.processRequest(event);
    this.injectCORSHeaders(event.request, response.headers);
    return response;
  }

  private async processRequest({ request, waitUntil }: FetchEvent): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '') {
      return this.fallbacks.root(request, { waitUntil });
    }
    const lowerMethod = request.method.toLowerCase();
    const rootPath = url.pathname.split('/')[1];
    const handler = this.routingTree[lowerMethod]?.[rootPath];

    if (handler) {
      try {
        const response = await handler(request, { waitUntil });
        return response;
      } catch (e) {
        console.error(e);
        return this.fallbacks[500](request, { waitUntil });
      }
    }

    if (lowerMethod === 'options') {
      return new Response(null, {});
    }

    return this.fallbacks[404](request, { waitUntil });
  }

  private respondToRoot(): Response {
    return new Response('Hi there!');
  }

  private notFound(): Response {
    return new Response(JSON.stringify({ error: 'not_found' }), {
      status: 404,
    });
  }

  private serverError(): Response {
    return new Response(JSON.stringify({ error: 'internal_server_error' }), {
      status: 500,
    });
  }

  private injectCORSHeaders(request: Request, headers: Headers) {
    headers.set('access-control-allow-methods', '*');
    headers.set('access-control-allow-headers', '*');

    if (this.corsOrigins.length === 0) {
      headers.set('access-control-allow-origin', '*');
      return;
    }

    const originHeader = request.headers.get('origin');
    if (!originHeader) {
      return;
    }

    const originHostname = new URL(originHeader).hostname;
    if (this.corsOrigins.includes(originHostname)) {
      headers.set('access-control-allow-origin', originHostname);
    }
  }
}
