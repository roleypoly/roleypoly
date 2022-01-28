// @ts-ignore
import { authBot } from '@roleypoly/api/src/routes/auth/bot';
import { authCallback } from '@roleypoly/api/src/routes/auth/callback';
import { withAuthMode } from '@roleypoly/api/src/sessions/middleware';
import { Router } from 'itty-router';
import { authBounce } from './routes/auth/bounce';
import { Config, Environment, parseEnvironment } from './utils/config';
import { Context } from './utils/context';
import { json, notFound } from './utils/response';

const router = Router();

router.all('*', withAuthMode);

router.get('/auth/bot', authBot);
router.get('/auth/bounce', authBounce);
router.get('/auth/callback', authCallback);

router.get('/', (request: Request, config: Config) =>
  json({
    __warning: '🦊',
    this: 'is',
    a: 'fox-based',
    web: 'application',
    please: 'be',
    mindful: 'of',
    your: 'surroundings',
    warning__: '🦊',
    meta: config.uiPublicURI,
  })
);

router.get('*', () => notFound());

export default {
  async fetch(request: Request, env: Environment, event: Context['fetchContext']) {
    const config = parseEnvironment(env);
    const context: Context = {
      config,
      fetchContext: {
        waitUntil: event.waitUntil,
      },
      authMode: {
        type: 'anonymous',
      },
    };
    return router.handle(request, context);
  },
};
