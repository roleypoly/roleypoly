import { getPickableRoles } from '@roleypoly/interactions/utils/api';
import { uiPublicURI } from '@roleypoly/interactions/utils/config';
import {
  asyncPreflightEphemeral,
  asyncResponse,
} from '@roleypoly/interactions/utils/interactions';
import { mustBeInGuild } from '@roleypoly/interactions/utils/responses';
import {
  CategoryType,
  Embed,
  InteractionCallbackType,
  InteractionFlags,
  InteractionRequestCommand,
  InteractionResponse,
} from '@roleypoly/types';

export const pickableRoles = asyncResponse(
  async (interaction: InteractionRequestCommand): Promise<InteractionResponse> => {
    if (!interaction.guild_id) {
      return mustBeInGuild();
    }

    const pickableRoles = await getPickableRoles(interaction.guild_id);
    const embed: Embed = {
      color: 0xab9b9a,
      fields: [],
      title: 'You can pick any of these roles with /pick-role',
    };

    for (let categoryName in pickableRoles) {
      const { roles, type } = pickableRoles[categoryName];

      embed.fields.push({
        name: `${categoryName}${type === CategoryType.Single ? ' *(pick one)*' : ''}`,
        value: roles.map((role) => `<@&${role}>`).join('\n'),
        inline: true,
      });
    }

    return {
      type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [embed],
        flags: InteractionFlags.EPHEMERAL,
        components: [
          {
            type: 1,
            components: [
              // Link to Roleypoly
              {
                type: 2,
                label: 'Pick roles on your browser',
                url: `${uiPublicURI}/s/${interaction.guild_id}`,
                style: 5,
              },
            ],
          },
        ],
      },
    };
  },
  asyncPreflightEphemeral
);
