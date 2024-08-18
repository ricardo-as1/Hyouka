/**
 * @typedef {Object} CommandData
 * @property {string} name - The name of the command (must be lowercase)
 * @property {string} description - A short description of the command
 * @property {string[]} aliases - Aliases of the command
 * @property {CommandCategory} category - The category this command belongs to
 * @property {boolean} args - Whether or not the command requires arguments
 * @property {string} usage - The usage of the command
 * @property {string[]} permission - The permission required to use the command
 * @property {Function} run - The function that runs when the command is called
 */

/**
 * Placeholder for command data
 * @type {CommandData}
 */


/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * @INFORMAÇÕES_DO_BOT
 * Name | Hyouka
 * Description | Um bot de moderação e diversão para servidores do Discord.
 * @LINKS 
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/QxQUZbv7df)
 */


module.exports = {
  name: "",
  description: "",
  category: "",
  usage: "",
  cooldown: 10,
  args: false,
  aliases: [''],
  permission: [],

  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
   */

  run: async (client, message, args) => {

  }
}