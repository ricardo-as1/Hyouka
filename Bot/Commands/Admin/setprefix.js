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

const { setPrefix } = require('../../Config/Database/database');
const { EmbedBuilder } = require('discord.js');
const EmbedColor = require("../../Config/colors");

module.exports = {
  name: "setprefix",
  description: "Define um novo prefixo para o servidor.",
  aliases: ['prefix', 'changeprefix'],
  usage: "h!setprefix <prefix>",
  cooldown: 10,
  category: "Admin",
  permission: ["MANAGE_GUILD"],

  /**
   * @param {import('discord.js').Message} message
   * @param {string[]} args
   * @param {import('discord.js').Client} client
  **/

  run: async (client, message, args) => {
    if (!message.guild) {
      console.error("Guild não encontrado.");
      return;
    }
    
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      const embed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(EmbedColor.defaultErrorColor)
        .setDescription(`**${message.author.toString()}, você não tem permissão para alterar o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    const newPrefix = args[0];
    if (!newPrefix) {
      const PrefixEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(EmbedColor.defaultErrorColor)
        .setDescription(`**${message.author.toString()} Por favor, forneça um novo prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [PrefixEmbed] });
    }

    try {
      setPrefix(message.guild.id, newPrefix);  // Certifique-se de que `setPrefix` é uma Promise

      const SuccessEmbed = new EmbedBuilder()
        .setTitle(`<:Lootbox:1273392541319827469> Sucesso`)
        .setColor(EmbedColor.defaultSuccessColor)
        .setDescription(`<:Developer:1273392334956007477> **Prefixo alterado para:** \`${newPrefix}\``)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [SuccessEmbed] });
    } catch (error) {
      console.error("Erro ao definir o prefixo:", error);
      const errorEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(EmbedColor.defaultErrorColor)
        .setDescription(`**${message.author.toString()} Ocorreu um erro ao tentar definir o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [errorEmbed] });
    }
  }
};
