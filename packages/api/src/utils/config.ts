import { WrappedKVNamespace } from './kv';

export type Environment = {
  BOT_CLIENT_ID: string;
  BOT_CLIENT_SECRET: string;
  BOT_TOKEN: string;
  UI_PUBLIC_URI: string;
  API_PUBLIC_URI: string;
  ROOT_USERS: string;
  ALLOWED_CALLBACK_HOSTS: string;
  BOT_IMPORT_TOKEN: string;
  INTERACTIONS_SHARED_KEY: string;
  RP_SERVER_ID: string;
  RP_HELPER_ROLE_IDS: string;
  DISCORD_PUBLIC_KEY: string;
  KV_SESSIONS: KVNamespace;
  KV_GUILDS: KVNamespace;
  KV_GUILD_DATA: KVNamespace;
};

export type Config = {
  botClientID: string;
  botClientSecret: string;
  botToken: string;
  publicKey: string;
  uiPublicURI: string;
  apiPublicURI: string;
  rootUsers: string[];
  allowedCallbackHosts: string[];
  importSharedKey: string;
  interactionsSharedKey: string;
  roleypolyServerID: string;
  helperRoleIDs: string[];
  kv: {
    sessions: WrappedKVNamespace;
    guilds: WrappedKVNamespace;
    guildData: WrappedKVNamespace;
  };
  retention: {
    session: number;
    sessionState: number;
    guild: number;
    member: number;
  };
  _raw: Environment;
};

const toList = (x: string): string[] => String(x).split(',');
const safeURI = (x: string) => String(x).replace(/\/$/, '');

export const parseEnvironment = (env: Environment): Config => {
  return {
    _raw: env,
    botClientID: env.BOT_CLIENT_ID,
    botClientSecret: env.BOT_CLIENT_SECRET,
    botToken: env.BOT_TOKEN,
    publicKey: env.DISCORD_PUBLIC_KEY,
    uiPublicURI: safeURI(env.UI_PUBLIC_URI),
    apiPublicURI: safeURI(env.API_PUBLIC_URI),
    rootUsers: toList(env.ROOT_USERS),
    allowedCallbackHosts: toList(env.ALLOWED_CALLBACK_HOSTS),
    importSharedKey: env.BOT_IMPORT_TOKEN,
    interactionsSharedKey: env.INTERACTIONS_SHARED_KEY,
    roleypolyServerID: env.RP_SERVER_ID,
    helperRoleIDs: toList(env.RP_HELPER_ROLE_IDS),
    kv: {
      sessions: new WrappedKVNamespace(env.KV_SESSIONS),
      guilds: new WrappedKVNamespace(env.KV_GUILDS),
      guildData: new WrappedKVNamespace(env.KV_GUILD_DATA),
    },
    retention: {
      session: 60 * 60 * 6, // 6 hours
      sessionState: 60 * 5, // 5 minutes
      guild: 60 * 60 * 2, // 2 hours
      member: 60 * 5, // 5 minutes
    },
  };
};
