export {};

declare global {
    const BOT_CLIENT_ID: string;
    const BOT_CLIENT_SECRET: string;
    const UI_PUBLIC_URI: string;
    const API_PUBLIC_URI: string;
    const ROOT_USERS: string;

    const KV_SESSIONS: KVNamespace;
    const KV_GUILDS: KVNamespace;
    const KV_GUILD_DATA: KVNamespace;
    const KV_INFRASTRUCTURE: KVNamespace;
}
