/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Fun/avatar.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require("discord.js");
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor } } = require("../../ConfigHub/System.js");

module.exports = {
  name: "servericon",
  description: "Mostra o ícone do servidor.",
  category: "Global",
  usage: `${defaultPrefix}servericon`,
  aliases: ["serveravatar"],

  async run(client, message) {
    const sizes = [64, 128, 256, 512, 1024, 2048];

    // Gerar URLs dos avatares
    const avatarURLs = sizes.map(size => message.guild.iconURL({ extension: "png", size }));

    // Criar a string de links dos avatares
    const description = sizes.map((size, index) => `• [x${size}](${avatarURLs[index]})`).join(' ');

    const embed = new EmbedBuilder()
      .setColor(defaultEmbedColor)
      .setImage(avatarURLs[5])  // Padrão de 2048
      .setDescription(description)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp();

    return message.channel.send({ embeds: [embed] });
  }
}
