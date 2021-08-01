import { respond } from '@roleypoly/worker-utils';
import { Router } from '@roleypoly/worker-utils/router';
import { healthz } from './handlers/healthz';
import { uiPublicURI } from './utils/config';

const router = new Router();

router.add('GET', '/_healthz', healthz);

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
