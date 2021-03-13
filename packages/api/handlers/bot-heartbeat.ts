import { BotHeartbeatData } from 'packages/types';
import { getSharedKey, respond } from '../utils/api-tools';
import { botHeartbeatToken } from '../utils/config';
import { Infrastructure } from '../utils/kv';

const denied = () => respond({ error: 'robots only, human.' }, { status: 403 });

export const BotHeartbeat = async (request: Request): Promise<Response> => {
    const { id } = getSharedKey(request) || {};
    if (!id || id !== botHeartbeatToken) {
        return denied();
    }

    const heartbeat: BotHeartbeatData = await request.json();

    await Infrastructure.put<BotHeartbeatData>(`shard_${heartbeat.shard}`, {
        lastHeartbeat: Date.now(),
        state: heartbeat.state,
        shard: heartbeat.shard,
    });

    return respond({ status: 'ok' });
};
