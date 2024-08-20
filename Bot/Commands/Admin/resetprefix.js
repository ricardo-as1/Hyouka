/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

/**
 * @type {import("../../Config/BaseCommands")}
 */

const EmbedColor = require('../../Config/colors');
const { removePrefix } = require('../../Config/Database/database');
const { EmbedBuilder } = require('discord.js');
const defaultPrefix = require('../../Config/botconfig').default_prefix;

module.exports = {
  name: "resetprefix",
  description: "Reseta o prefixo para o padrão.",
  aliases: ['prefixreset'],
  usage: "resetprefix",
  cooldown: 10,
  category: "Admin",
  permission: ["MANAGE_GUILD"],

  async run(client, message) {
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      const noPermissionEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> **${message.author.username}**`)
        .setColor(EmbedColor.defaultErrorColor)
        .setDescription(`__**${message.author.toString()}, Você não tem permissão para resetar o prefixo.__`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    removePrefix(message.guild.id);

    const successEmbed = new EmbedBuilder()
      .setTitle(`<:Lootbox:1273392541319827469> Prefixo Resetado`)
      .setColor(EmbedColor.defaultSuccessColor)
      .setDescription(`<:Developer:1273392334956007477> **O prefixo foi resetado para o padrão: \`${defaultPrefix}\`**`)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    return message.channel.send({ embeds: [successEmbed] });
  }
};
