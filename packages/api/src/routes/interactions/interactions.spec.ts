jest.mock('../../utils/discord');
import { InteractionCallbackType, InteractionFlags } from '@roleypoly/types';
import { AuthType, discordFetch } from '../../utils/discord';
import { configContext } from '../../utils/testHelpers';
import { extractInteractionResponse, makeInteractionsRequest } from './testHelpers';

const mockDiscordFetch = discordFetch as jest.Mock;

it('responds with a simple hello-world!', async () => {
  const [config, context] = configContext();
  const response = await makeInteractionsRequest(context, {
    name: 'hello-world',
  });

  expect(response.status).toBe(200);

  const interaction = await extractInteractionResponse(response);

  expect(interaction.type).toEqual(
    InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
  );
  expect(interaction.data).toEqual({
    flags: InteractionFlags.EPHEMERAL,
  });
  expect(mockDiscordFetch).toBeCalledWith(expect.any(String), '', AuthType.None, {
    body: JSON.stringify({
      content: 'Hey there, test-user-nick',
    }),
    headers: expect.any(Object),
    method: 'PATCH',
  });
});

it('does not allow requests that are invalid', async () => {
  const [config, context] = configContext();
  const response = await makeInteractionsRequest(
    context,
    {
      name: 'hello-world',
    },
    true
  );

  expect(response.status).toBe(401);
});
