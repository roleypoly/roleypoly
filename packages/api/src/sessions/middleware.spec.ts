import { Router } from 'itty-router';
import { Config, parseEnvironment } from '../utils/config';
import { Context } from '../utils/context';
import { json } from '../utils/response';
import { getBindings, makeSession } from '../utils/testHelpers';
import { requireSession, withAuthMode, withSession } from './middleware';

const setup = (): [Config, Context] => {
  const config = parseEnvironment(getBindings());
  const context: Context = {
    config,
    fetchContext: {
      waitUntil: () => {},
    },
    authMode: {
      type: 'anonymous',
    },
  };

  return [config, context];
};

it('detects anonymous auth mode via middleware', async () => {
  const [, context] = setup();
  const router = Router();
  router.all('*', withAuthMode).get('/', (request, context) => {
    expect(context.authMode.type).toBe('anonymous');
  });

  await router.handle(new Request('http://test.local/'), context);
});

it('detects bearer auth mode via middleware', async () => {
  const [, context] = setup();

  const token = 'abc123';
  const router = Router();
  router.all('*', withAuthMode).get('/', (request, context) => {
    expect(context.authMode.type).toBe('bearer');
    expect(context.authMode.sessionId).toBe(token);
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
    context
  );
});

it('detects bot auth mode via middleware', async () => {
  const [, context] = setup();

  const token = 'abc123';
  const router = Router();
  router.all('*', withAuthMode).get('/', (request, context) => {
    expect(context.authMode.type).toBe('bot');
    expect(context.authMode.identity).toBe(token);
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bot ${token}`,
      },
    }),
    context
  );
});

it('sets Context.session via withSession middleware', async () => {
  const [config, context] = setup();

  const session = await makeSession(config);

  const router = Router();
  router.all('*', withAuthMode, withSession).get('/', (request, context: Context) => {
    expect(context.session).toBeDefined();
    expect(context.session!.sessionID).toBe(session.sessionID);
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer ${session.sessionID}`,
      },
    }),
    context
  );
});

it('does not set Context.session when session is invalid', async () => {
  const [, context] = setup();

  const router = Router();
  router.all('*', withAuthMode, withSession).get('/', (request, context: Context) => {
    expect(context.session).not.toBeDefined();
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer abc123`,
      },
    }),
    context
  );
});

it('errors with 401 when requireSession is coupled with invalid session', async () => {
  const [, context] = setup();
  const router = Router();

  const testFn = jest.fn();
  router
    .all('*', withAuthMode, withSession, requireSession)
    .get('/', (request, context: Context) => {
      testFn();
      return json({});
    });

  const response = await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer abc123`,
      },
    }),
    context
  );

  expect(testFn).not.toHaveBeenCalled();
  expect(response.status).toBe(401);
});

it('passes through when requireSession is coupled with a valid session', async () => {
  const [config, context] = setup();

  const session = await makeSession(config);
  const router = Router();

  const testFn = jest.fn();
  router
    .all('*', withAuthMode, withSession, requireSession)
    .get('/', (request, context: Context) => {
      expect(context.session).toBeDefined();
      testFn();
      return json({});
    });

  const response = await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer ${session.sessionID}`,
      },
    }),
    context
  );

  expect(response.status).toBe(200);
  expect(testFn).toHaveBeenCalled();
});
