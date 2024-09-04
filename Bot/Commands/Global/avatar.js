/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

/**
 * @type {import("../../Config/BaseCommands.js")}
 */

const { EmbedBuilder } = require("discord.js");
const { defaultEmbedColor } = require("../../Config/colors.js");

module.exports = {
  name: "avatar",
  description: "Mostra informações de avatar dos usuários.",
  category: "Global",
  usage: "h!avatar @user",
  cooldown: 10,
  aliases: ["av"],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   * @param {Array<string>} args
   */

  async run(client, message) {
    const user = message.mentions.users.first() || message.author;
    const x64 = user.displayAvatarURL({ extension: "png", size: 64 });
    const x128 = user.displayAvatarURL({ extension: "png", size: 128 });
    const x256 = user.displayAvatarURL({ extension: "png", size: 256 });
    const x512 = user.displayAvatarURL({ extension: "png", size: 512 });
    const x1024 = user.displayAvatarURL({ extension: "png", size: 1024 });
    const x2048 = user.displayAvatarURL({ extension: "png", size: 2048 });
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${user.username}`)
      .setColor(defaultEmbedColor)
      .setImage(x256)
      .setDescription(
        `Links: • [x64](${x64}) ` +
        `• [x128](${x128}) ` +
        `• [x256](${x256}) ` +
        `• [x512](${x512}) ` +
        `• [x1024](${x1024}) ` +
        `• [x2048](${x2048}) `)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    await message.channel.send({ embeds: [embed] });
  }
};
