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
import { corsHeaders, json, notFound, serverError } from './utils/response';

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

router.get('/guilds/:guildId/slug', injectParams, withSession, guildsSlug);

router.post('/interactions', handleInteraction);

router.get('/', ((request: Request, { config }: Context) =>
  json({
    __warning: '🦊',
    this: 'is',
    a: 'fox-based',
    web: 'application',
    please: 'be',
    aware: 'of',
    your: 'surroundings',
    warning__: '🦊',
    meta: config.uiPublicURI,
    version: 2,
  })) as RoleypolyHandler);

router.options('*', (request: Request) => {
  return new Response(null, {
    headers: {
      ...corsHeaders,
    },
  });
});

router.all('/*', notFound);

const scrubURL = (urlStr: string) => {
  const url = new URL(urlStr);
  url.searchParams.delete('code');
  url.searchParams.delete('state');

  return url.toString();
};

export default {
  async fetch(request: Request, env: Environment, event: Context['fetchContext']) {
    const config = parseEnvironment(env);
    const context: Context = {
      config,
      fetchContext: {
        waitUntil: event.waitUntil.bind(event),
      },
      authMode: {
        type: 'anonymous',
      },
      params: {},
    };
    console.log(`${request.method} ${scrubURL(request.url)}`);
    return router
      .handle(request, context)
      .catch((e: Error) => (!e ? notFound() : serverError(e)));
  },
};
