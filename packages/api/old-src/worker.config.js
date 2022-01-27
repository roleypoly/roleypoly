const reexportEnv = (keys = []) => {
  return keys.reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {});
};

module.exports = {
  environment: reexportEnv([
    'BOT_CLIENT_ID',
    'BOT_CLIENT_SECRET',
    'BOT_TOKEN',
    'BOT_IMPORT_TOKEN',
    'UI_PUBLIC_URI',
    'API_PUBLIC_URI',
    'ROOT_USERS',
    'ALLOWED_CALLBACK_HOSTS',
    'INTERACTIONS_SHARED_KEY',
  ]),
  kv: ['KV_SESSIONS', 'KV_GUILDS', 'KV_GUILD_DATA'],
};
