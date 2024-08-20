/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');
const { getPrefix } = require('../Config/Database/database'); // Importando a função getPrefix
const default_prefix = require('../Config/botconfig.js').default_prefix;
const { getFormattedDate } = require('../Config/TimeString');

// Definindo cores
const orange = chalk.hex('#FFA500');
const white = chalk.white;

// Função para carregar eventos
const loadEvents = (client) => {
  if (client.eventsLoaded) return; // Evita carregar eventos mais de uma vez

  const eventsPath = path.join(__dirname, '../Events');
  console.log(chalk.greenBright('✔ EVENTOS CARREGADOS:'));

  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  const formattedEventFiles = eventFiles.map(file => `${getFormattedDate()} - ${white(file)}`).join('\n');
  console.log(orange(formattedEventFiles));

  eventFiles.forEach(file => {
    const event = require(path.join(eventsPath, file));
    if (event.name && typeof event.execute === 'function') {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  });

  client.eventsLoaded = true; // Marca que os eventos foram carregados
};

// Função para carregar comandos
const loadCommands = (client) => {
  if (client.commandsLoaded) return; // Evita carregar comandos mais de uma vez

  client.commands = new Collection();
  client.aliases = new Collection();

  const commandsPath = path.join(__dirname, '../Commands');
  console.log(chalk.greenBright('✔ COMANDOS CARREGADOS:'));

  if (!fs.existsSync(commandsPath)) {
    console.error(chalk.red('💥 | Diretório de comandos não encontrado.'));
    return;
  }

  const categories = fs.readdirSync(commandsPath);
  client.categories = categories;

  categories.forEach(category => {
    const categoryPath = path.join(commandsPath, category);
    const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

    if (commandFiles.length === 0) {
      console.warn(chalk.yellow(`⚠️  | Nenhum comando encontrado na categoria "${category}".`));
      return;
    }

    const formattedCommandFiles = commandFiles.map(file => `${getFormattedDate()} - ${white(file)}`).join('\n');
    console.log(orange(formattedCommandFiles));

    commandFiles.forEach(file => {
      const command = require(path.join(categoryPath, file));
      if (command.name) {
        client.commands.set(command.name, command);
      }
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach(alias => client.aliases.set(alias, command.name));
      }
    });
  });

  client.commandsLoaded = true; // Marca que os comandos foram carregados
};

// Listener para mensagens
const handleMessage = async (message, client) => {
  if (message.author.bot || message.channel.type === 'DM') return;

  // Obter o prefixo do banco de dados ou usar o padrão
  const prefix = await getPrefix(message.guild.id) || default_prefix;

  // Verificar se a mensagem começa com o prefixo
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    try {
      await command.run(client, message, args);
    } catch (err) {
      console.error(chalk.red('💥 | Erro ao executar o comando:'), err);
    }
  } else {
    console.warn(chalk.yellow(`⚠️ | Comando não encontrado: ${cmd}`));
  }
};

// Função para carregar eventos e comandos
const loadAll = (client) => {
  loadEvents(client);
  loadCommands(client);
}

module.exports = loadAll;
