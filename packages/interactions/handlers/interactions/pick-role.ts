import { selectRole } from '@roleypoly/interactions/utils/api';
import { asyncResponse } from '@roleypoly/interactions/utils/interactions';
import { invalid, mustBeInGuild } from '@roleypoly/interactions/utils/responses';
import {
  InteractionCallbackType,
  InteractionFlags,
  InteractionRequestCommand,
  InteractionResponse,
} from '@roleypoly/types';

export const pickRole = (mode: 'add' | 'remove') =>
  asyncResponse(
    async (interaction: InteractionRequestCommand): Promise<InteractionResponse> => {
      if (!interaction.guild_id) {
        return mustBeInGuild();
      }

      const userID = interaction.member?.user?.id;
      if (!userID) {
        return mustBeInGuild();
      }

      const roleID = interaction.data.options?.find(
        (option) => option.name === 'role'
      )?.value;
      if (!roleID) {
        return invalid();
      }

      const code = await selectRole(mode, interaction.guild_id, userID, roleID);

      if (code === 409) {
        return {
          type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `:x: You ${mode === 'add' ? 'already' : "don't"} have that role.`,
            flags: InteractionFlags.EPHEMERAL,
          },
        };
      }

      if (code === 404) {
        return {
          type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `:x: <@&${roleID}> isn't pickable.`,
            flags: InteractionFlags.EPHEMERAL,
          },
        };
      }

      if (code === 403) {
        return {
          type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `:x: <@&${roleID}> has unsafe permissions.`,
            flags: InteractionFlags.EPHEMERAL,
          },
        };
      }

      if (code !== 200) {
        return {
          type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `:x: Something went wrong, please try again later.`,
            flags: InteractionFlags.EPHEMERAL,
          },
        };
      }

      return {
        type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `:white_check_mark: You ${
            mode === 'add' ? 'got' : 'removed'
          } the role: <@&${roleID}>`,
          flags: InteractionFlags.EPHEMERAL,
        },
      };
    }
  );
