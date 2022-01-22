const { Client, Message } = require('discord.js');

const botToken = process.env['BOT_TOKEN'];
const allowedBots = process.env['ALLOWED_BOTS']?.split(',') ?? [];
const appUrl = process.env['UI_PUBLIC_URI'] ?? '';

function messageEventListener(message) {
  const { author, channel, client, guild, mentions } = message;

  if (!guild) {
    return;
  } // Ignore DMs

  if (
    client.user &&
    !mentions.has(client.user.id, { ignoreRoles: true, ignoreEveryone: true })
  ) {
    return;
  } // Ignore non bot mentions

  if (author.bot && !allowedBots.includes(author.id)) {
    return;
  } // Only respond to allowed bots

  const guildId = guild.id;
  channel.send({ content: `:beginner: Assign your roles here! ${appUrl}/s/${guildId}` });
}

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

client.on('messageCreate', (message) => messageEventListener(message));
client.login(botToken);
