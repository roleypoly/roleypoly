import { uiPublicURI } from '@roleypoly/interactions/utils/config';
import {
  InteractionCallbackType,
  InteractionFlags,
  InteractionRequestCommand,
  InteractionResponse,
} from '@roleypoly/types';

export const roleypoly = async (
  interaction: InteractionRequestCommand
): Promise<InteractionResponse> => {
  if (interaction.guild_id) {
    return {
      type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `:beginner: Assign your roles here! ${uiPublicURI}/s/${interaction.guild_id}`,
        flags: InteractionFlags.EPHEMERAL,
      },
    };
  }

  return {
    type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `:beginner: Hey! I don't know what server you're in, so check out ${uiPublicURI}`,
    },
  };
};
