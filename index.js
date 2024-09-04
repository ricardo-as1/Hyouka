/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

const Discord = require('discord.js');

// Carregando os eventos e comandos
const loadEvents = require('./Bot/Events/loadEvents.js');
const loadCommands = require('./Bot/Events/loadCommands.js');

// Carregando o bot
const { token } = require('./Bot/Config/botconfig.js');

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
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('⭕・Promessa rejeitada:', promise, '🔴・Razão:', reason);
});

loadEvents(client);
loadCommands(client);

client.login(token)