const reexportEnv = (keys = []) => {
    return keys.reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {});
};

module.exports = {
    environment: reexportEnv([
        'BOT_CLIENT_ID',
        'BOT_CLIENT_SECRET',
        'BOT_TOKEN',
        'UI_PUBLIC_URI',
        'API_PUBLIC_URI',
        'ROOT_USERS',
    ]),
    kv: ['KV_SESSIONS', 'KV_GUILDS', 'KV_GUILD_DATA'],
};
