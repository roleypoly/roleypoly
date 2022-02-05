import {
  getGuild,
  getGuildData,
  getGuildMember,
  getPickableRoles,
} from '@roleypoly/api/src/guilds/getters';
import {
  embedBuilder,
  getName,
  InteractionHandler,
} from '@roleypoly/api/src/routes/interactions/helpers';
import {
  embedPalette,
  embedResponse,
} from '@roleypoly/api/src/routes/interactions/responses';
import { Context } from '@roleypoly/api/src/utils/context';
import {
  CategoryType,
  Embed,
  InteractionCallbackType,
  InteractionRequest,
  InteractionResponse,
  Role,
} from '@roleypoly/types';

export const pickableRoles: InteractionHandler = async (
  interaction: InteractionRequest,
  context: Context
): Promise<InteractionResponse> => {
  if (!interaction.guild_id) {
    return embedResponse(
      ':x: Error',
      `Hey ${getName(
        interaction
      )}. You need to use this command in a server, not in a DM.`,
      embedPalette.error
    );
  }

  const [guildData, guild, member] = await Promise.all([
    getGuildData(context.config, interaction.guild_id),
    getGuild(context.config, interaction.guild_id),
    getGuildMember(context.config, interaction.guild_id, interaction.member?.user?.id!),
  ]);

  if (!guildData || !guild) {
    return embedResponse(
      ':x: Error',
      `Hey ${getName(
        interaction
      )}. Something's wrong with the server you're in. Try picking your roles at ${
        context.config.uiPublicURI
      }/s/${interaction.guild_id} instead.`,
      embedPalette.error
    );
  }

  const roles = getPickableRoles(guildData, guild);
  if (roles.length === 0) {
    return embedResponse(
      ':fire: Error',
      `Hey ${getName(
        interaction
      )}. This server might not be set up to use Roleypoly yet, as there are no roles to pick from.`,
      embedPalette.error
    );
  }

  const makeBoldIfMemberHasRole = (role: Role, base: string): string => {
    if (member?.roles.includes(role.id)) {
      return `__${base}__`;
    }

    return base;
  };

  const embed: Embed = {
    color: embedPalette.neutral,
    fields: roles.map(({ category, roles }) => {
      return {
        name: `${category.name}${
          category.type === CategoryType.Single ? ' *(pick one)*' : ''
        }`,
        value: roles
          .map((role) => makeBoldIfMemberHasRole(role, `<@&${role.id}>`))
          .join(', '),
      } as Embed['fields'][0];
    }),
    title: 'You can pick any of these roles with /pick-role',
    footer: {
      text: `Roles with an __underline__ are already picked by you.`,
    },
  };

  return {
    type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: embedBuilder(embed),
      components: [
        {
          type: 1,
          components: [
            // Link to Roleypoly
            {
              type: 2,
              label: 'Pick roles on your browser',
              url: `${context.config.uiPublicURI}/s/${interaction.guild_id}`,
              style: 5,
            },
          ],
        },
      ],
    },
  };
};

pickableRoles.ephemeral = true;
pickableRoles.deferred = true;
