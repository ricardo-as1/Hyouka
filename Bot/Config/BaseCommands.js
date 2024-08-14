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

/**
 * @typedef {Object} CommandData
 * @property {string} name - The name of the command (must be lowercase)
 * @property {string} description - A short description of the command
 * @property {string[]} aliases - Aliases of the command
 * @property {CommandCategory} category - The category this command belongs to
 * @property {Function} run - The function that runs when the command is called
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
  args: false,
  aliases: [''],
  permission: [],

  /**
   * @param {import('discord.js').Message} message
   * @param {string[]} args
   * @param {import('discord.js').Client} client
   * @param {string} prefix
   */

  run: async (client, message, args, prefix) => {

  }
}