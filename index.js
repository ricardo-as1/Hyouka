/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

const Discord = require('discord.js');

const loadAll = require('./Bot/Events/loadAll');
const { token, default_prefix } = require('./Bot/Config/botconfig.js');
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ]
});

client.messages = {};


process.on('uncaughtException', (error) => {
  console.error('⭕・Erro não capturado:', error);
  // Tente fazer log do erro e, se necessário, notificar o dono do bot
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('⭕・Promessa rejeitada:', promise, '🔴・Razão:', reason);
  // Tente fazer log do erro e, se necessário, notificar o dono do bot
});

loadAll(client);

client.login(token)