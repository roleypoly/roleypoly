const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { ShardingManager } = require('discord.js');

const botToken = process.env['BOT_TOKEN'];

const manager = new ShardingManager('./bot.js', { token: botToken });
manager.spawn();
