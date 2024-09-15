/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

const Discord = require('discord.js');

// Carregando os eventos e comandos
const loadEvents = require('./Src/Events/LoadEvents.js');
const loadCommands = require('./Src/Events/LoadCommands.js');

// Carregando o bot
const { token } = require('./Src/Config/BotConfig.js');

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