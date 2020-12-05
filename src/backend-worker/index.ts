import { BotJoin } from './handlers/bot-join';
import { GetSession } from './handlers/get-session';
import { LoginBounce } from './handlers/login-bounce';
import { LoginCallback } from './handlers/login-callback';
import { Router } from './router';

const router = new Router();

router.add('GET', 'bot-join', BotJoin);
router.add('GET', 'login-bounce', LoginBounce);
router.add('GET', 'login-callback', LoginCallback);
router.add('GET', 'get-session', GetSession);

addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(router.handle(event.request));
});
