import { Context, RoleypolyMiddleware } from '@roleypoly/api/src/utils/context';
import {
  engineeringProblem,
  forbidden,
  notFound,
} from '@roleypoly/api/src/utils/response';
import { UserGuildPermissions } from '@roleypoly/types';

export const requireEditor: RoleypolyMiddleware = async (
  request: Request,
  context: Context
) => {
  if (!context.params.guildId) {
    return engineeringProblem('params not set up correctly');
  }

  if (!context.session) {
    return engineeringProblem('middleware not set up correctly');
  }

  const guild = context.session.guilds.find((g) => g.id === context.params.guildId);
  if (!guild) {
    return notFound(); // 404 because we don't want enumeration of guilds
  }

  if (guild.permissionLevel === UserGuildPermissions.User) {
    return forbidden();
  }
};

export const requireMember: RoleypolyMiddleware = async (
  request: Request,
  context: Context
) => {
  if (!context.params.guildId) {
    return engineeringProblem('params not set up correctly');
  }

  if (!context.session) {
    return engineeringProblem('middleware not set up correctly');
  }

  const guild = context.session.guilds.find((g) => g.id === context.params.guildId);
  if (!guild) {
    return notFound(); // 404 because we don't want enumeration of guilds
  }
};
