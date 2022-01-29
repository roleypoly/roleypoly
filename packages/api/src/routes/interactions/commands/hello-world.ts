import { InteractionHandler } from '@roleypoly/api/src/routes/interactions/helpers';
import { Context } from '@roleypoly/api/src/utils/context';
import {
  InteractionCallbackType,
  InteractionRequest,
  InteractionResponse,
} from '@roleypoly/types';

export const helloWorld: InteractionHandler = (
  interaction: InteractionRequest,
  context: Context
): InteractionResponse => {
  return {
    type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Hey there, ${interaction.member?.nick || interaction.user?.username}`,
    },
  };
};

helloWorld.ephemeral = true;
helloWorld.deferred = true;
