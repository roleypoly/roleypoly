import { Router } from 'itty-router';
import { json } from '../utils/response';
import { configContext, makeSession } from '../utils/testHelpers';
import { requireEditor } from './middleware';

describe('requireEditor', () => {
  it('continues the request when user is an editor', async () => {
    const testFn = jest.fn();
    const [config, context] = configContext();
    const session = await makeSession(config);
    const router = Router();

    router.all('*', requireEditor).get('/:guildId', (request, context) => {
      testFn();
      return json({});
    });

    const response = await router.handle(
      new Request(`http://test.local/${session.guilds[1].id}`, {
        headers: {
          authorization: `Bearer ${session.sessionID}`,
        },
      }),
      { ...context, session, params: { guildId: session.guilds[1].id } }
    );

    expect(response.status).toBe(200);
    expect(testFn).toHaveBeenCalledTimes(1);
  });

  it('403s the request when user is not an editor', async () => {
    const testFn = jest.fn();
    const [config, context] = configContext();
    const session = await makeSession(config);
    const router = Router();

    router.all('*', requireEditor).get('/:guildId', (request, context) => {
      testFn();
      return json({});
    });

    const response = await router.handle(
      new Request(`http://test.local/${session.guilds[0].id}`, {
        headers: {
          authorization: `Bearer ${session.sessionID}`,
        },
      }),
      { ...context, session, params: { guildId: session.guilds[0].id } }
    );

    expect(response.status).toBe(403);
    expect(testFn).not.toHaveBeenCalled();
  });

  it('404s the request when the guild isnt in session', async () => {
    const testFn = jest.fn();
    const [config, context] = configContext();
    const session = await makeSession(config);
    const router = Router();

    router.all('*', requireEditor).get('/:guildId', (request, context) => {
      testFn();
      return json({});
    });

    const response = await router.handle(
      new Request(`http://test.local/invalid-session-id`, {
        headers: {
          authorization: `Bearer ${session.sessionID}`,
        },
      }),
      { ...context, session, params: { guildId: 'invalid-session-id' } }
    );

    expect(response.status).toBe(404);
    expect(testFn).not.toHaveBeenCalled();
  });
});
