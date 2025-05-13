/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Hyouka.js
 */

const Discord = require("discord.js");
const client = new Discord.Client({ 
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ]
});

// Carregar eventos, comandos e tratar mensagens
const loadEvents = require("./Events/LoadEvents.js");
const loadCommands = require("./Events/LoadCommands.js");
const handleMessage = require("./Events/handleMessage.js");
const { Sync: { token } } = require("./ConfigHub/System.js");

// Tratamento de erros não capturados e promisses rejeitadas
process.on('uncaughtException', (error) => {
  console.error('⭕・Erro não capturado:', error);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('⭕・Promisse rejeitada:', promise, '🔴・Razão:', reason);
});

// Carregar eventos, comandos e login do bot
loadEvents(client);
loadCommands(client);
handleMessage(client);
client.login(token);
