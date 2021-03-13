import { BotHeartbeatData } from 'packages/types';
import { respond } from '../utils/api-tools';
import { Infrastructure } from '../utils/kv';

export const GetInfrastructureStatus = async (request: Request): Promise<Response> => {
    const cachedStatus = await Infrastructure.get('cached_status');
    if (cachedStatus) {
        return respond({ status: cachedStatus });
    }

    const [shardStatus, discord, cloudflare] = await Promise.all([
        getAllShardStatus(),
        getDiscordStatus(),
        getCloudflareStatus(),
    ]);

    const status = {
        shards: shardStatus,
        discord,
        cloudflare,
    };

    await Infrastructure.put('cached_status', status, 60 * 5);

    return respond({
        status,
    });
};

const getAllShardStatus = async (): Promise<BotHeartbeatData[]> => {
    const shards: BotHeartbeatData[] = [];
    let currentShard = 0;

    do {
        const thisShard = await getShardStatus(currentShard);
        if (!thisShard) {
            break;
        }

        shards.push(thisShard);
        currentShard++;
    } while (currentShard < 64); // If we hit 64, there's bigger issues.

    return shards;
};

const getShardStatus = async (shardNumber: number): Promise<BotHeartbeatData | null> => {
    const shardHeartbeat = await Infrastructure.get<BotHeartbeatData>(
        `shard_${shardNumber}`
    );
    if (!shardHeartbeat) {
        return null;
    }

    return shardHeartbeat;
};

const getDiscordStatus = async () => {
    const req = await fetch('https://srhpyqt94yxb.statuspage.io/api/v2/summary.json');
    const status = await req.json();

    const api =
        status.components.find(
            (component: { id: string }) => component.id === 'rhznvxg4v7yh'
        )?.status !== 'operational';

    return { api };
};

const getCloudflareStatus = async () => {
    const req = await fetch('https://yh6f0r4529hb.statuspage.io/api/v2/summary.json');
    const status = await req.json();

    const workers =
        status.components.find(
            (component: { id: string }) => component.id === '57srcl8zcn7c'
        )?.status !== 'operational';

    const storage =
        status.components.find(
            (component: { id: string }) => component.id === 'tmh50tx2nprs'
        )?.status !== 'operational';

    return { workers, storage };
};
