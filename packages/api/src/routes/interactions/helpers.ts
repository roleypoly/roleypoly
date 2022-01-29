import { Config } from '@roleypoly/api/src/utils/config';
import { Context } from '@roleypoly/api/src/utils/context';
import { AuthType, discordFetch } from '@roleypoly/api/src/utils/discord';
import {
  InteractionCallbackType,
  InteractionFlags,
  InteractionRequest,
  InteractionResponse,
} from '@roleypoly/types';

export const verifyRequest = async (
  config: Config,
  request: Request,
  interaction: InteractionRequest
): Promise<boolean> => {
  const timestamp = request.headers.get('x-signature-timestamp');
  const signature = request.headers.get('x-signature-ed25519');

  if (!timestamp || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    Buffer.from(config.publicKey, 'hex'),
    { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519', public: true } as any,
    false,
    ['verify']
  );

  return crypto.subtle.verify(
    'NODE-ED25519',
    key,
    Buffer.from(signature, 'hex'),
    Buffer.from(timestamp + JSON.stringify(interaction))
  );
};

export type InteractionHandler = ((
  interaction: InteractionRequest,
  context: Context
) => Promise<InteractionResponse> | InteractionResponse) & {
  ephemeral?: boolean;
  deferred?: boolean;
};

export const runAsync = async (
  handler: InteractionHandler,
  interaction: InteractionRequest,
  context: Context
): Promise<void> => {
  const url = `/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`;

  try {
    const response = await handler(interaction, context);
    await discordFetch(url, '', AuthType.None, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: handler.ephemeral ? InteractionFlags.EPHEMERAL : 0,
          ...response.data,
        },
      }),
    });
  } catch (e) {
    console.error('/interations runAsync failed', {
      e,
      interaction: {
        data: interaction.data,
        user: interaction.user,
        guild: interaction.guild_id,
      },
    });
    try {
      await discordFetch(url, '', AuthType.None, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "I'm sorry, I'm having trouble processing this request.",
            flags: InteractionFlags.EPHEMERAL,
          },
        } as InteractionResponse),
      });
    } catch (e) {}
  }
};
