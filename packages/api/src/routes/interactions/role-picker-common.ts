import { getGuild, getGuildData } from '@roleypoly/api/src/guilds/getters';
import { calculateNewRoles } from '@roleypoly/api/src/routes/guilds/guild-roles-put';
import { getName } from '@roleypoly/api/src/routes/interactions/helpers';
import {
  embedPalette,
  embedResponse,
} from '@roleypoly/api/src/routes/interactions/responses';
import { Context } from '@roleypoly/api/src/utils/context';
import { APIMember, AuthType, discordFetch } from '@roleypoly/api/src/utils/discord';
import { isIdenticalArray } from '@roleypoly/misc-utils/collection-tools';
import {
  CategoryType,
  InteractionRequest,
  InteractionResponse,
  RoleTransaction,
  TransactionType,
} from '@roleypoly/types';

export const rolePickerCommon = async (
  interaction: InteractionRequest,
  context: Context,
  action: TransactionType
): Promise<InteractionResponse> => {
  if (!interaction.guild_id) {
    return embedResponse(
      ':x: Error',
      `Hey ${getName(
        interaction
      )}. You need to use this command in a server, not in a DM.`
    );
  }

  const currentRoles = interaction.member?.roles || [];

  const [guildData, guild] = await Promise.all([
    getGuildData(context.config, interaction.guild_id),
    getGuild(context.config, interaction.guild_id),
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

  const roleToPick = interaction.data?.options?.[0]?.value;
  if (!roleToPick) {
    return embedResponse(
      ':fire: Discord sent me the wrong data',
      `Hey ${getName(interaction)}. Please try again later.`,
      embedPalette.error
    );
  }

  const hasRole = interaction.member?.roles.includes(roleToPick);
  if (action === TransactionType.Add && hasRole) {
    return embedResponse(
      `:white_check_mark: You already have that role.`,
      `Hey ${getName(interaction)}. You already have <@&${roleToPick}>!`,
      embedPalette.neutral
    );
  }

  if (action === TransactionType.Remove && !hasRole) {
    return embedResponse(
      `:white_check_mark: You don't have that role.`,
      `Hey ${getName(interaction)}. You already don't have <@&${roleToPick}>!`,
      embedPalette.neutral
    );
  }

  const extraTransactions: RoleTransaction[] = [];
  let isSingle = false;
  if (action === TransactionType.Add) {
    // For single-type categories, let's also generate the remove rules for the other roles in the category
    const category = guildData.categories.find((category) =>
      category.roles.includes(roleToPick)
    );
    if (category?.type === CategoryType.Single) {
      const otherRoles = category.roles.filter((role) => role !== roleToPick);
      extraTransactions.push(
        ...otherRoles.map((role) => ({ action: TransactionType.Remove, id: role }))
      );
      isSingle = true;
    }
  }

  const newRoles = calculateNewRoles({
    currentRoles,
    guildRoles: guild.roles,
    guildData,
    updateRequest: {
      knownState: currentRoles,
      transactions: [{ action, id: roleToPick }, ...extraTransactions],
    },
  });

  if (isIdenticalArray(currentRoles, newRoles)) {
    return embedResponse(
      ':x: You cannot pick this role.',
      `Hey ${getName(
        interaction
      )}. <@&${roleToPick}> isn't pickable. Check /pickable-roles to see which roles you can use.`,
      embedPalette.error
    );
  }

  const patchMemberRoles = await discordFetch<APIMember>(
    `/guilds/${interaction.guild_id}/members/${interaction.member?.user?.id}`,
    context.config.botToken,
    AuthType.Bot,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'x-audit-log-reason': `Picked their roles via /${
          action === TransactionType.Add ? 'pick' : 'remove'
        }-role`,
      },
      body: JSON.stringify({
        roles: newRoles,
      }),
    }
  );

  if (!patchMemberRoles) {
    return embedResponse(
      ':x: Discord stopped me from updating your roles.',
      `Hey ${getName(
        interaction
      )}. Discord didn't let me give you <@&${roleToPick}>. Could you try again later?`,
      embedPalette.error
    );
  }

  return action === TransactionType.Add
    ? embedResponse(
        ':white_check_mark: You got it!',
        `Hey ${getName(interaction)}, I gave you <@&${roleToPick}>!${
          isSingle ? `\nThe other roles in this category have been removed.` : ''
        }`,
        embedPalette.success
      )
    : embedResponse(
        ":white_check_mark: You (don't) got it!",
        `Hey ${getName(interaction)}, I took away <@&${roleToPick}>!`,
        embedPalette.success
      );
};
