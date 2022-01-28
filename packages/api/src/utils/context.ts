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

  // Must include withSession middleware for population
  session?: SessionData;
};
