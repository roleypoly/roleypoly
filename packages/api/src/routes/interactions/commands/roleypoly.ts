import {
  getName,
  InteractionHandler,
} from '@roleypoly/api/src/routes/interactions/helpers';
import { embedResponse } from '@roleypoly/api/src/routes/interactions/responses';
import { Context } from '@roleypoly/api/src/utils/context';
import {
  Embed,
  InteractionCallbackType,
  InteractionRequest,
  InteractionResponse,
} from '@roleypoly/types';

export const roleypoly: InteractionHandler = (
  interaction: InteractionRequest,
  context: Context
): InteractionResponse => {
  if (!interaction.guild_id) {
    return embedResponse(
      ':x: Error',
      `Hey ${getName(
        interaction
      )}. You need to use this command in a server, not in a DM.`
    );
  }

  return {
    type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          color: 0x453e3d,
          title: `:beginner: Hey there, ${getName(interaction)}!`,
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
              label: `Pick roles on ${new URL(context.config.uiPublicURI).hostname}`,
              url: `${context.config.uiPublicURI}/s/${interaction.guild_id}`,
              style: 5,
            },
          ],
        },
      ],
    },
  };
};

roleypoly.ephemeral = true;
