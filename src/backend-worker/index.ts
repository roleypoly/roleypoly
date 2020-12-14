import { BotJoin } from './handlers/bot-join';
import { GetSession } from './handlers/get-session';
import { GetSlug } from './handlers/get-slug';
import { LoginBounce } from './handlers/login-bounce';
import { LoginCallback } from './handlers/login-callback';
import { Router } from './router';

const router = new Router();

router.addFallback('root', () => {
    return new Response('hello!!');
});

router.add('GET', 'bot-join', BotJoin);
router.add('GET', 'login-bounce', LoginBounce);
router.add('GET', 'login-callback', LoginCallback);
router.add('GET', 'get-session', GetSession);
router.add('GET', 'get-slug', GetSlug);
router.add('GET', 'x-headers', (request) => {
    const headers: { [x: string]: string } = {};

    for (let [key, value] of request.headers.entries()) {
        headers[key] = value;
    }

    return new Response(JSON.stringify(headers));
});

addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(router.handle(event.request));
});
