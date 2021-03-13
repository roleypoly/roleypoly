export type BotHeartbeatData = {
    shard: number;
    state: 'ok' | 'degraded' | 'failed';
    lastHeartbeat?: number; // Date.now()
};
