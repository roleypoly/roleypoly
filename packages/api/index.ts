import { BotJoin } from './handlers/bot-join';
import { ClearGuildCache } from './handlers/clear-guild-cache';
import { CreateRoleypolyData } from './handlers/create-roleypoly-data';
import { GetPickerData } from './handlers/get-picker-data';
import { GetSession } from './handlers/get-session';
import { GetSlug } from './handlers/get-slug';
import { LoginBounce } from './handlers/login-bounce';
import { LoginCallback } from './handlers/login-callback';
import { RevokeSession } from './handlers/revoke-session';
import { SyncFromLegacy } from './handlers/sync-from-legacy';
import { UpdateRoles } from './handlers/update-roles';
import { Router } from './router';
import { respond } from './utils/api-tools';
import { uiPublicURI } from './utils/config';

const router = new Router();

// OAuth
router.add('GET', 'bot-join', BotJoin);
router.add('GET', 'login-bounce', LoginBounce);
router.add('GET', 'login-callback', LoginCallback);

// Session
router.add('GET', 'get-session', GetSession);
router.add('POST', 'revoke-session', RevokeSession);

// Main biz logic
router.add('GET', 'get-slug', GetSlug);
router.add('GET', 'get-picker-data', GetPickerData);
router.add('PATCH', 'update-roles', UpdateRoles);
router.add('POST', 'sync-from-legacy', SyncFromLegacy);
router.add('POST', 'clear-guild-cache', ClearGuildCache);

// Root users only
router.add('GET', 'x-create-roleypoly-data', CreateRoleypolyData);

// Tester Routes
router.add('GET', 'x-headers', (request) => {
  const headers: { [x: string]: string } = {};

  for (let [key, value] of request.headers.entries()) {
    headers[key] = value;
  }

  return new Response(JSON.stringify(headers));
});

// Root Zen <3
router.addFallback('root', () => {
  return respond({
    __warning: '🦊',
    this: 'is',
    a: 'fox-based',
    web: 'application',
    please: 'be',
    mindful: 'of',
    your: 'surroundings',
    warning__: '🦊',
    meta: uiPublicURI,
  });
});

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request));
});
