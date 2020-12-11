import { Guild, Member, Role, RoleSafety } from 'roleypoly/common/types';
import { cacheLayer, discordFetch } from './api-tools';
import { botToken } from './config';
import { Guilds } from './kv';

type APIGuild = {
    // Only relevant stuff
    id: string;
    name: string;
    icon: string;
    roles: APIRole[];
};

type APIRole = {
    id: string;
    name: string;
    color: number;
    position: number;
    permissions: string;
    managed: boolean;
};

export const getGuild = cacheLayer(
    Guilds,
    (id: string) => `guilds/${id}`,
    async (id: string) => {
        const guildRaw = await discordFetch<APIGuild>(`/guilds/${id}`, botToken, 'Bot');

        // Filters the raw guild data into data we actually want
        const guild: Guild = {
            id: guildRaw.id,
            name: guildRaw.name,
            icon: guildRaw.icon,
            roles: guildRaw.roles.map<Role>((role) => ({
                ...role,
                safety: RoleSafety.SAFE, // TODO: calculate safety
            })),
        };

        return guild;
    }
);

export const getGuildMember = async (
    serverID: string,
    userID: string
): Promise<Member> => {
    return {} as any;
};
