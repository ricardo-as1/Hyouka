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
  name: "avatar",
  description: "Mostra informações de avatar dos usuários.",
  category: "Global",
  usage: `${defaultPrefix}avatar [@user]`,
  aliases: ["av"],

  async run(client, message) {
    const user = message.mentions.users.first() || message.author;
    const sizes = [64, 128, 256, 512, 1024, 2048];

    // Gerar URLs dos avatares
    const avatarURLs = sizes.map(size => user.displayAvatarURL({ extension: "png", size }));

    // Criar a string de links dos avatares
    const description = sizes.map((size, index) => `• [x${size}](${avatarURLs[index]})`).join(' ');

    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${user.username}`)
      .setColor(defaultEmbedColor)
      .setImage(avatarURLs[4])  // Padrão de 1024
      .setDescription(description)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp();

    return message.channel.send({ embeds: [embed] });
  }
}
