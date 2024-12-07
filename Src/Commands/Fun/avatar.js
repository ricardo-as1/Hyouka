/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Fun/avatar.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require("discord.js");
const { DefaultEmbedColor } = require("../../Config/Colors.js");

module.exports = {
  name: "avatar",
  description: "Mostra o avatar de um usuário.",
  category: "Global",
  usage: "h!avatar [@user]",
  aliases: ["av"],

  async run(client, message, args) {
    try {
      const user = message.mentions.users.first() || message.author;
      const sizes = [64, 128, 256, 512, 1024, 2048, 4096];

      // Gerar URLs dos avatares
      const avatarURLs = sizes.map(size => `[x${size}](${user.displayAvatarURL({ extension: "png", size })})`).join(" | ");

      // Criar o embed
      const embed = new EmbedBuilder()
        .setAuthor({ name: `Avatar de ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
        .setColor(DefaultEmbedColor)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 512 })) // Padrão para 512
        .setDescription(`🔗 Clique para fazer download: 
          ${avatarURLs}`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao executar o comando avatar:", error);
      const errorEmbed = new EmbedBuilder()
        .setColor(ErrorEmbedColor)
        .setTitle("❌ Erro!")
        .setDescription("Ocorreu um erro ao tentar exibir o avatar.")
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [errorEmbed] });
    }
  },
};
