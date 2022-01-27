import { kvOrLocal, WrappedKVNamespace } from '@roleypoly/worker-utils';

const self = global as any as Record<string, any>;

export const Sessions = new WrappedKVNamespace(kvOrLocal(self.KV_SESSIONS ?? null));
export const GuildData = new WrappedKVNamespace(kvOrLocal(self.KV_GUILD_DATA ?? null));
export const Guilds = new WrappedKVNamespace(kvOrLocal(self.KV_GUILDS ?? null));
