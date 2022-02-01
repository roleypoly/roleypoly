import { uiPublicURI } from '@roleypoly/interactions/utils/config';
import {
  Embed,
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
        embeds: [
          {
            color: 0x453e3d,
            title: `:beginner: Hey there, ${
              interaction.member?.nick || interaction.member?.user?.username || 'friend'
            }!`,
            description: `Try these slash commands, or pick roles from your browser!`,
            fields: [
              { name: 'See all the roles', value: '/pickable-roles' },
              { name: 'Pick a role', value: '/pick-role' },
              { name: 'Remove a role', value: '/remove-role' },
            ],
          } as Embed,
        ],
        components: [
          {
            type: 1,
            components: [
              // Link to Roleypoly
              {
                type: 2,
                label: `Pick roles on ${new URL(uiPublicURI).hostname}`,
                url: `${uiPublicURI}/s/${interaction.guild_id}`,
                style: 5,
              },
            ],
          },
        ],
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
