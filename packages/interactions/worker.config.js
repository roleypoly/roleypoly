const reexportEnv = (keys = []) => {
  return keys.reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {});
};

module.exports = {
  environment: reexportEnv(['DISCORD_PUBLIC_KEY', 'UI_PUBLIC_URI', 'API_PUBLIC_URI']),
};
