import { Router } from 'itty-router';
import { Context } from '../utils/context';
import { json } from '../utils/response';
import { configContext, makeSession } from '../utils/testHelpers';
import { requireSession, withAuthMode, withSession } from './middleware';

it('detects anonymous auth mode via middleware', async () => {
  const [, context] = configContext();
  const router = Router();
  const testFn = jest.fn();

  router.all('*', withAuthMode).get('/', (request, context) => {
    expect(context.authMode.type).toBe('anonymous');
    testFn();
    return json({});
  });

  await router.handle(new Request('http://test.local/'), context);

  expect(testFn).toHaveBeenCalled();
});

it('detects bearer auth mode via middleware', async () => {
  const [, context] = configContext();
  const testFn = jest.fn();

  const token = 'abc123';
  const router = Router();
  router.all('*', withAuthMode).get('/', (request, context) => {
    expect(context.authMode.type).toBe('bearer');
    expect(context.authMode.sessionId).toBe(token);
    testFn();
    return json({});
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
    context
  );

  expect(testFn).toHaveBeenCalled();
});

it('detects bot auth mode via middleware', async () => {
  const testFn = jest.fn();
  const [, context] = configContext();

  const token = 'abc123';
  const router = Router();
  router.all('*', withAuthMode).get('/', (request, context) => {
    expect(context.authMode.type).toBe('bot');
    expect(context.authMode.identity).toBe(token);
    testFn();
    return json({});
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bot ${token}`,
      },
    }),
    context
  );

  expect(testFn).toHaveBeenCalled();
});

it('sets Context.session via withSession middleware', async () => {
  const testFn = jest.fn();
  const [config, context] = configContext();

  const session = await makeSession(config);

  const router = Router();
  router.all('*', withAuthMode, withSession).get('/', (request, context: Context) => {
    expect(context.session).toBeDefined();
    expect(context.session!.sessionID).toBe(session.sessionID);
    testFn();
    return json({});
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer ${session.sessionID}`,
      },
    }),
    context
  );
  expect(testFn).toHaveBeenCalledTimes(1);
});

it('does not set Context.session when session is invalid', async () => {
  const testFn = jest.fn();
  const [, context] = configContext();

  const router = Router();
  router.all('*', withAuthMode, withSession).get('/', (request, context: Context) => {
    expect(context.session).not.toBeDefined();
    testFn();
    return json({});
  });

  await router.handle(
    new Request('http://test.local/', {
      headers: {
        authorization: `Bearer abc123`,
      },
    }),
    context
  );

  expect(testFn).toHaveBeenCalledTimes(1);
});

it('errors with 401 when requireSession is coupled with invalid session', async () => {
  const [, context] = configContext();
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
  const [config, context] = configContext();

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
