import { Config } from '@roleypoly/api/src/utils/config';
import { SessionData } from '@roleypoly/types';

export type AuthMode =
  | {
      type: 'anonymous';
    }
  | {
      type: 'bearer';
      sessionId: string;
    }
  | {
      type: 'bot';
      identity: string;
    };

export type Context = {
  config: Config;
  fetchContext: {
    waitUntil: FetchEvent['waitUntil'];
  };
  authMode: AuthMode;
  params: {
    guildId?: string;
    memberId?: string;
  };

  // Must include withSession middleware for population
  session?: SessionData;
};

export type RoleypolyHandler = (
  request: Request,
  context: Context
) => Promise<Response> | Response;

export type RoleypolyMiddleware = (
  request: Request,
  context: Context
) => Promise<Response | void> | Response | void;
