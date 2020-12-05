export type Handler = (request: Request) => Promise<Response> | Response;

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

    handle(request: Request): Promise<Response> | Response {
        if (request.url === '/') {
            return this.fallbacks.root(request);
        }
        const lowerMethod = request.method.toLowerCase();
        const url = new URL(request.url);
        const rootPath = url.pathname.split('/')[1];
        const handler = this.routingTree[lowerMethod]?.[rootPath];

        if (handler) {
            try {
                return handler(request);
            } catch (e) {
                console.error(e);
                return this.fallbacks[500](request);
            }
        }

        return this.fallbacks[404](request);
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
}
