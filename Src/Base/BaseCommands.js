/**
 * @typedef {Object} CommandData
 * @property {string} name - O nome do comando (deve estar em letras minúsculas)
 * @property {string} description - Uma breve descrição do comando
 * @property {string[]} aliases - Aliases do comando
 * @property {CommandCategory} category - A categoria à qual este comando pertence
 * @property {boolean} args - Se o comando requer argumentos ou não
 * @property {string} usage - O uso do comando
 * @property {string[]} permission - As permissões necessárias para usar o comando
 * @property {Function} run - A função que é executada quando o comando é chamado
 */

/**
 * Função que é executada quando o comando é chamado
 * @param {import('discord.js').Client} client - O cliente do Discord
 * @param {import('discord.js').Message} message - A mensagem que ativou o comando
 * @param {Array<string>} args - Argumentos passados para o comando
 */


/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

/**
 * Placeholder para os dados do comando
 * @type {CommandData}
 */

module.exports = {
  name: "",
  description: "",
  category: "",
  usage: "",
  cooldown: 10,
  aliases: [''],
  permission: [],

  async run(client, message, args) {

  }
}
