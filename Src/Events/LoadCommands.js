/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

const { ChalkOrange, ChalkWhite } = require('../Config/Colors.js');
const { getFormattedDate } = require('../Config/TimeString.js');
const { default_prefix } = require('../Config/BotConfig.js');
const { Collection } = require('discord.js');
const { getPrefix } = require('../Database/DataBase.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const loadCommands = (client) => {
  if (client.commandsLoaded) return;

  client.commands = new Collection();
  client.aliases = new Collection();

  const commandsPath = path.join(__dirname, '../Commands');
  console.log(chalk.greenBright('✔ COMANDOS CARREGADOS:'));

  if (!fs.existsSync(commandsPath)) {
    console.error(chalk.red('💥 | Diretório de comandos não encontrado.'));
    return;
  }

  const categorias = fs.readdirSync(commandsPath);
  client.categories = categorias;

  categorias.forEach(category => {
    const categoryPath = path.join(commandsPath, category);
    const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

    if (commandFiles.length === 0) {
      console.warn(chalk.yellow(`⚠️ Aviso: Nenhum comando encontrado na categoria "${category}", sem riscos de quebrar o bot!`));
      return;
    }

    const formattedCommandFiles = commandFiles.map(file => `${getFormattedDate()} - ${chalk.hex(ChalkWhite)(file)}`).join('\n');
    console.log(chalk.hex(ChalkOrange)(formattedCommandFiles));

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

  client.commandsLoaded = true;
};

const handleMessage = async (message, client) => {
  if (message.author.bot || message.channel.type === 'DM') return;

  const prefix = await getPrefix(message.guild.id) || default_prefix;

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

module.exports = loadCommands;
