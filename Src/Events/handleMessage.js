/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Events/handleMessage.js
 */

const { getPrefix } = require('../Database/DataBase.js');
const { Sync: { defaultPrefix } } = require('../ConfigHub/System.js');

/**
 * Manipula mensagens e executa comandos se válidos.
 * @param {Object} message - A mensagem recebida.
 * @param {Object} client - O cliente do Discord.
 */

const handleMessage = async (message, client) => {
  if (!message || !message.author || !message.guild || !message.channel) return;
  if (message.author.bot || message.channel.type === 'DM') return;

  const prefix = (await getPrefix(message.guild.id)) || defaultPrefix;

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!cmd) return;

  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (command) {
    try {
      await command.run(client, message, args);
    } catch (err) {
      console.error('💥 | Erro ao executar o comando:', err);
    }
  } else {
    console.warn(`🚧 | Comando não encontrado: ${cmd}`);
  }
};

module.exports = handleMessage;