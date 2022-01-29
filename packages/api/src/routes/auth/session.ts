import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { json, notFound } from '@roleypoly/api/src/utils/response';

export const authSession: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  if (context.session) {
    return json({
      user: context.session.user,
      guilds: context.session.guilds,
      sessionID: context.session.sessionID,
    });
  }

  return notFound();
};
