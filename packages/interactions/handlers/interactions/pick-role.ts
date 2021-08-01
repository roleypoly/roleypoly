import {
  InteractionCallbackType,
  InteractionRequestCommand,
  InteractionResponse,
} from '@roleypoly/types';

export const helloWorld = async (
  interaction: InteractionRequestCommand
): Promise<InteractionResponse> => {
  return {
    type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Hey there, ${interaction.member?.nick || interaction.user?.username}`,
    },
  };
};
