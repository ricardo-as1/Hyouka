/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

/**
 * Placeholder command
 * @type {import("../../Config/baseCommands.js")}
 */

const { EmbedBuilder } = require("discord.js");
const { DefaultEmbedColor } = require("../../Config/Colors.js");

module.exports = {
  name: "avatar",
  description: "Mostra informações de avatar dos usuários.",
  category: "Global",
  usage: "avatar [@user]",
  cooldown: 10,
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
      .setColor(DefaultEmbedColor)
      .setImage(avatarURLs[2])  // Padrão de 256
      .setDescription(description)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp();

    return message.channel.send({ embeds: [embed] });
  }
}
