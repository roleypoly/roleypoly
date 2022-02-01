import { Context, RoleypolyMiddleware } from '@roleypoly/api/src/utils/context';
import { unauthorized } from '@roleypoly/api/src/utils/response';
import { SessionData } from '@roleypoly/types';

export const withSession: RoleypolyMiddleware = async (
  request: Request,
  context: Context
) => {
  if (context.authMode.type !== 'bearer') {
    return;
  }

  const session = await context.config.kv.sessions.get<SessionData>(
    context.authMode.sessionId
  );
  if (!session) {
    return;
  }

  context.session = session;
};

export const requireSession: RoleypolyMiddleware = (
  request: Request,
  context: Context
) => {
  if (context.authMode.type !== 'bearer' || !context.session) {
    return unauthorized();
  }
};

export const withAuthMode: RoleypolyMiddleware = (request: Request, context: Context) => {
  const auth = extractAuthentication(request);

  if (auth.authType === 'Bearer') {
    context.authMode = {
      type: 'bearer',
      sessionId: auth.token,
    };

    return;
  }

  if (auth.authType === 'Bot') {
    context.authMode = {
      type: 'bot',
      identity: auth.token,
    };
    return;
  }

  context.authMode = {
    type: 'anonymous',
  };
};

export const extractAuthentication = (
  request: Request
): { authType: string; token: string } => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return { authType: 'None', token: '' };
  }

  const [authType, token] = authHeader.split(' ');
  return { authType, token };
};
