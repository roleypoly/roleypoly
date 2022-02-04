import { helloWorld } from '@roleypoly/api/src/routes/interactions/commands/hello-world';
import {
  InteractionHandler,
  runAsync,
  verifyRequest,
} from '@roleypoly/api/src/routes/interactions/helpers';
import { notImplemented } from '@roleypoly/api/src/routes/interactions/responses';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { invalid, json } from '@roleypoly/api/src/utils/response';
import {
  InteractionCallbackType,
  InteractionData,
  InteractionFlags,
  InteractionRequest,
  InteractionResponse,
  InteractionType,
} from '@roleypoly/types';

const commands: Record<InteractionData['name'], InteractionHandler> = {
  'hello-world': helloWorld,
};

export const handleInteraction: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  const interaction: InteractionRequest = await request.json();
  if (!interaction) {
    return invalid();
  }

  if (!(await verifyRequest(context.config, request, interaction))) {
    console.warn('interactions: invalid signature');
    return new Response('invalid request signature', { status: 401 });
  }

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    if (interaction.type === InteractionType.PING) {
      console.info('interactions: ping');
      return json({ type: InteractionCallbackType.PONG });
    }

    console.warn('interactions: not application command');
    return json({ err: 'not implemented' }, { status: 400 });
  }

  if (!interaction.data) {
    return json({ err: 'data missing' }, { status: 400 });
  }

  const handler = commands[interaction.data.name] || notImplemented;

  try {
    if (handler.deferred) {
      context.fetchContext.waitUntil(runAsync(handler, interaction, context));

      return json({
        type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: handler.ephemeral ? InteractionFlags.EPHEMERAL : 0,
        },
      } as InteractionResponse);
    }

    const response = await handler(interaction, context);
    return json({
      type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        flags: handler.ephemeral ? InteractionFlags.EPHEMERAL : 0,
        ...response.data,
      },
    });
  } catch (e) {
    console.error('/interactions error:', {
      interaction: {
        data: interaction.data,
        user: interaction.user,
        guild: interaction.guild_id,
      },
      e,
    });
    return invalid();
  }
};
