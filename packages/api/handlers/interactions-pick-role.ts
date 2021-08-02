import { CategoryType, RoleSafety } from '@roleypoly/types';
import { AuthType, discordFetch, respond } from '@roleypoly/worker-utils';
import { difference, keyBy } from 'lodash';
import { interactionsEndpoint } from '../utils/api-tools';
import { botToken } from '../utils/config';
import {
  getGuild,
  getGuildData,
  getGuildMember,
  updateGuildMember,
} from '../utils/guild';
import { conflict, invalid, notAuthenticated, notFound, ok } from '../utils/responses';

export const InteractionsPickRole = interactionsEndpoint(
  async (request: Request): Promise<Response> => {
    const mode = request.method === 'PUT' ? 'add' : 'remove';
    const reqURL = new URL(request.url);
    const [, , guildID, userID, roleID] = reqURL.pathname.split('/');
    if (!guildID || !userID || !roleID) {
      return invalid();
    }

    const guildP = getGuild(guildID);
    const guildDataP = getGuildData(guildID);
    const guildMemberP = getGuildMember(
      { serverID: guildID, userID },
      { skipCachePull: true }
    );

    const [guild, guildData, guildMember] = await Promise.all([
      guildP,
      guildDataP,
      guildMemberP,
    ]);

    if (!guild || !guildData || !guildMember) {
      return notFound();
    }

    let memberRoles = guildMember.roles;

    if (
      (mode === 'add' && memberRoles.includes(roleID)) ||
      (mode !== 'add' && !memberRoles.includes(roleID))
    ) {
      return conflict();
    }

    const roleMap = keyBy(guild.roles, 'id');

    const category = guildData.categories.find((category) =>
      category.roles.includes(roleID)
    );
    // No category? illegal.
    if (!category) {
      return notFound();
    }

    // Category is hidden, this is illegal
    if (category.hidden) {
      return notFound();
    }

    // Role is unsafe, super illegal.
    if (roleMap[roleID].safety !== RoleSafety.Safe) {
      return notAuthenticated();
    }

    // In add mode, if the category is a single-mode, remove the other roles in the category.
    if (mode === 'add' && category.type === CategoryType.Single) {
      memberRoles = difference(memberRoles, category.roles);
    }

    if (mode === 'add') {
      memberRoles = [...memberRoles, roleID];
    } else {
      memberRoles = memberRoles.filter((id) => id !== roleID);
    }

    const patchMemberRoles = await discordFetch<Member>(
      `/guilds/${guildID}/members/${userID}`,
      botToken,
      AuthType.Bot,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'x-audit-log-reason': `Picked their roles via slash command`,
        },
        body: JSON.stringify({
          roles: memberRoles,
        }),
      }
    );

    if (!patchMemberRoles) {
      return respond({ error: 'discord rejected the request' }, { status: 500 });
    }

    await updateGuildMember({ serverID: guildID, userID });

    return ok();
  }
);
