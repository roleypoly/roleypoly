// @ts-ignore
import { authBounce } from '@roleypoly/api/src/routes/auth/bounce';
import { json, notFound } from '@roleypoly/api/src/utils/response';
import { Router } from 'itty-router';
import { Config, Environment, parseEnvironment } from './config';

const router = Router();

router.get('/auth/bounce', authBounce);

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
  async fetch(request: Request, env: Environment, ctx: FetchEvent) {
    const config = parseEnvironment(env);
    return router.handle(request, config, ctx);
  },
};
