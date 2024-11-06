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

const { SuccessEmbedColor, ErrorEmbedColor } = require('../../Config/Colors.js');
const { default_prefix } = require('../../Config/BotConfig.js');
const { removePrefix } = require('../../Database/DataBase.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "resetprefix",
  description: "Reseta o prefixo para o padrão.",
  aliases: ['prefixreset'],
  usage: "h!resetprefix",
  cooldown: 10,
  category: "Admin",
  permission: ["MANAGE_GUILD"],

  async run(client, message) {
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      const noPermissionEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> **${message.author.username}**`)
        .setColor(ErrorEmbedColor)
        .setDescription(`__**${message.author.toString()}, Você não tem permissão para resetar o prefixo.__`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    removePrefix(message.guild.id);

    const successEmbed = new EmbedBuilder()
      .setTitle(`<:Lootbox:1273392541319827469> Prefixo Resetado`)
      .setColor(SuccessEmbedColor)
      .setDescription(`<:Developer:1273392334956007477> **O prefixo foi resetado para o padrão: \`${default_prefix}\`**`)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    return message.channel.send({ embeds: [successEmbed] });
  }
};
