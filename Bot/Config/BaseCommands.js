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
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
*/

/**
 * Placeholder for command data
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

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   * @param {Array<string>} args
   */

  async run(client, message, args) {

  }
}