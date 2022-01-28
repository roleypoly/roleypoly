import { Context } from '@roleypoly/api/src/utils/context';

export const withSession = (request: Request, context: Context) => {};

export const requireSession = (request: Request, context: Context) => {
  if (context.authMode.type !== 'bearer') {
    throw new Error('Not authed');
  }
};

export const withAuthMode = (request: Request, context: Context) => {
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
