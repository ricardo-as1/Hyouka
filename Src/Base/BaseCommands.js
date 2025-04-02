/**
 * @typedef {Object} CommandData // Placeholder para os dados do comando
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
 * Como importar essa base dentro dos novos comandos: 
 * const { CommandData } = require('../../Base/BaseCommands');
 * Detalhe importante: A base tem que ser importada primeiro, pois ela contém o CommandData
 * O que é CommandData: é uma tipagem para os dados do comando.
**/

/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

module.exports = {
  name: '',
  description: '',
  category: '',
  usage: '',
  aliases: [''],
  permission: [''],

  async run(client, message, args) {

  }
}