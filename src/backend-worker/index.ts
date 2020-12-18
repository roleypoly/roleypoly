import { BotJoin } from './handlers/bot-join';
import { CreateRoleypolyData } from './handlers/create-roleypoly-data';
import { GetPickerData } from './handlers/get-picker-data';
import { GetSession } from './handlers/get-session';
import { GetSlug } from './handlers/get-slug';
import { LoginBounce } from './handlers/login-bounce';
import { LoginCallback } from './handlers/login-callback';
import { RevokeSession } from './handlers/revoke-session';
import { Router } from './router';

const router = new Router();

router.addFallback('root', () => {
    return new Response('hello!!');
});

router.add('GET', 'bot-join', BotJoin);
router.add('GET', 'login-bounce', LoginBounce);
router.add('GET', 'login-callback', LoginCallback);
router.add('POST', 'revoke-session', RevokeSession);
router.add('GET', 'get-session', GetSession);
router.add('GET', 'get-slug', GetSlug);
router.add('GET', 'get-picker-data', GetPickerData);
router.add('GET', 'x-headers', (request) => {
    const headers: { [x: string]: string } = {};

    for (let [key, value] of request.headers.entries()) {
        headers[key] = value;
    }

    return new Response(JSON.stringify(headers));
});
router.add('GET', 'x-create-roleypoly-data', CreateRoleypolyData);

addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(router.handle(event.request));
});
