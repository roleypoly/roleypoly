import { requireEditor, requireMember } from '@roleypoly/api/src/guilds/middleware';
import { authBot } from '@roleypoly/api/src/routes/auth/bot';
import { authCallback } from '@roleypoly/api/src/routes/auth/callback';
import { authSessionDelete } from '@roleypoly/api/src/routes/auth/delete-session';
import { authSession } from '@roleypoly/api/src/routes/auth/session';
import { guildsGuild } from '@roleypoly/api/src/routes/guilds/guild';
import { guildsCacheDelete } from '@roleypoly/api/src/routes/guilds/guild-cache-delete';
import { guildsRolesPut } from '@roleypoly/api/src/routes/guilds/guild-roles-put';
import { guildsGuildPatch } from '@roleypoly/api/src/routes/guilds/guilds-patch';
import { guildsSlug } from '@roleypoly/api/src/routes/guilds/slug';
import { handleInteraction } from '@roleypoly/api/src/routes/interactions/interactions';
import {
  requireSession,
  withAuthMode,
  withSession,
} from '@roleypoly/api/src/sessions/middleware';
import { injectParams } from '@roleypoly/api/src/utils/request';
import { Router } from 'itty-router';
import { authBounce } from './routes/auth/bounce';
import { Environment, parseEnvironment } from './utils/config';
import { Context, RoleypolyHandler } from './utils/context';
import { json, notFound, notImplemented, serverError } from './utils/response';

const router = Router();

router.all('*', withAuthMode);

router.get('/auth/bot', authBot);
router.get('/auth/bounce', authBounce);
router.get('/auth/callback', authCallback);
router.get('/auth/session', withSession, requireSession, authSession);
router.delete('/auth/session', withSession, requireSession, authSessionDelete);

const guildsCommon = [injectParams, withSession, requireSession, requireMember];
router.get('/guilds/:guildId', ...guildsCommon, guildsGuild);
router.patch('/guilds/:guildId', ...guildsCommon, requireEditor, guildsGuildPatch);
router.delete(
  '/guilds/:guildId/cache',
  ...guildsCommon,
  requireEditor,
  guildsCacheDelete
);
router.put('/guilds/:guildId/roles', ...guildsCommon, guildsRolesPut);

// Slug is unauthenticated...
router.get('/guilds/slug/:guildId', injectParams, guildsSlug);

router.post('/interactions', handleInteraction);

router.get(
  '/legacy/preflight/:guildId',
  injectParams,
  withSession,
  requireSession,
  notImplemented
);
router.put(
  '/legacy/import/:guildId',
  injectParams,
  withSession,
  requireSession,
  notImplemented
);

router.get('/', ((request: Request, { config }: Context) =>
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
  })) as RoleypolyHandler);

router.any('*', () => notFound());

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
      params: {},
    };
    return router
      .handle(request, context)
      .catch((e: Error) => (!e ? notFound() : serverError(e)));
  },
};
