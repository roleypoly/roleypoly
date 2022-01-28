import { parseEnvironment } from '../utils/config';
import { getBindings } from '../utils/testHelpers';
import { getStateSession, setupStateSession } from './state';

it('creates and fetches a state session', async () => {
  const config = parseEnvironment(getBindings());

  const stateID = await setupStateSession(config, {
    test: 'test-data',
  });

  const stateSession = await getStateSession(config, stateID);

  expect(stateSession).toEqual({
    test: 'test-data',
  });
});

it('returns undefined when state is invalid', async () => {
  const config = parseEnvironment(getBindings());

  const stateSession = await getStateSession(config, 'invalid-state-id');

  expect(stateSession).toBeUndefined();
});
