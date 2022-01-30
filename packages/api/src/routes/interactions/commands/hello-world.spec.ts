jest.mock('../../../utils/discord');

import { discordFetch } from '../../../utils/discord';
import { configContext } from '../../../utils/testHelpers';
import {
  extractInteractionResponse,
  isDeferred,
  isEphemeral,
  makeInteractionsRequest,
  mockUpdateCall,
} from '../testHelpers';

const mockDiscordFetch = discordFetch as jest.Mock;
it('responds with the username when member.nick is missing', async () => {
  const [, context] = configContext();
  const response = await makeInteractionsRequest(
    context,
    {
      name: 'hello-world',
    },
    false,
    {
      member: {
        nick: undefined,
        roles: [],
      },
    }
  );

  expect(response.status).toBe(200);

  const interaction = await extractInteractionResponse(response);

  expect(isDeferred(interaction)).toBe(true);
  expect(isEphemeral(interaction)).toBe(true);
  expect(mockDiscordFetch).toBeCalledWith(
    ...mockUpdateCall(expect, {
      content: 'Hey there, test-user',
    })
  );
});

it('responds with the nickname when member.nick is set', async () => {
  const [, context] = configContext();
  const response = await makeInteractionsRequest(context, {
    name: 'hello-world',
  });

  expect(response.status).toBe(200);

  const interaction = await extractInteractionResponse(response);

  expect(isDeferred(interaction)).toBe(true);
  expect(isEphemeral(interaction)).toBe(true);
  expect(mockDiscordFetch).toBeCalledWith(
    ...mockUpdateCall(expect, {
      content: 'Hey there, test-user-nick',
    })
  );
});
