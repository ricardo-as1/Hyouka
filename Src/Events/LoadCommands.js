/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Events/LoadCommands.js
 */

const { getFormattedDate } = require('../Config/TimeString.js');
const { ChalkOrange, ChalkWhite } = require('../Config/Colors.js');
const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Carrega os comandos do bot e organiza por categorias.
 * 
 * @param {Object} client - O cliente do Discord.
 */
const loadCommands = (client) => {
  if (client.commandsLoaded) return;

  client.commands = new Collection();
  client.aliases = new Collection();
  const commandsPath = path.join(__dirname, '../Commands');

  console.log(chalk.greenBright('✅ COMANDOS CARREGADOS:'));

  if (!fs.existsSync(commandsPath)) {
    console.error(chalk.red('💥 | Diretório de comandos não encontrado.'));
    return;
  }

  const categorias = fs.readdirSync(commandsPath);
  client.categories = categorias;

  categorias.forEach((category) => {
    const categoryPath = path.join(commandsPath, category);
    const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

    if (commandFiles.length > 0) {
      console.log(chalk.hex(ChalkOrange)(`📂 ${category}/`));

      commandFiles.forEach((file) => {
        const adjustedSpacing = Math.max(0, process.stdout.columns - file.length - getFormattedDate().length - 7);
        const spacing = ' '.repeat(adjustedSpacing);

        console.log(`   └── ${chalk.hex(ChalkWhite)(file)}${spacing}${chalk.hex(ChalkOrange)(getFormattedDate())}`);
        
        const command = require(path.join(categoryPath, file));
        if (command.name) {
          client.commands.set(command.name, command);
        }

        if (command.aliases && Array.isArray(command.aliases)) {
          command.aliases.forEach(alias => client.aliases.set(alias, command.name));
        }
      });
    }
  });

  client.commandsLoaded = true;
};

/**
 * Manipula mensagens e executa comandos se válidos.
 * 
 * @param {Object} message - A mensagem recebida.
 * @param {Object} client - O cliente do Discord.
 */
const handleMessage = async (message, client) => {
  if (message.author.bot || message.channel.type === 'DM') return;

  const prefix = (await getPrefix(message.guild.id)) || default_prefix;

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!cmd) return;

  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

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

module.exports = loadCommands, handleMessage;
