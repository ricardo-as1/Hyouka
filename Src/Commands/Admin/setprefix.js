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

const { ErrorEmbedColor, SuccessEmbedColor } = require("../../Config/Colors.js");
const { EmbedBuilder } = require('discord.js');
const { setPrefix } = require('../../Database/DataBase.js');

module.exports = {
  name: "setprefix",
  description: "Define um novo prefixo para o servidor.",
  aliases: ['prefix', 'changeprefix'],
  usage: "h!setprefix <prefix>",
  cooldown: 10,
  category: "Admin",
  permission: ["MANAGE_GUILD"],

  async run(client, message, args) {

    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.guild) {
      message.channel.send("Servidor não encontrado.");
      return;
    }

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      const embed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()}, você não tem permissão para alterar o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    const newPrefix = args[0];
    if (!newPrefix) {
      const PrefixEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()} Por favor, forneça um novo prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [PrefixEmbed] });
    }

    try {
      setPrefix(message.guild.id, newPrefix);

      const SuccessEmbed = new EmbedBuilder()
        .setTitle(`<:Lootbox:1273392541319827469> Sucesso`)
        .setColor(SuccessEmbedColor)
        .setDescription(`<:Developer:1273392334956007477> **Prefixo alterado para:** \`${newPrefix}\``)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [SuccessEmbed] });
    } catch (error) {
      console.error("Erro ao definir o prefixo:", error);
      const errorEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()} Ocorreu um erro ao tentar definir o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [errorEmbed] });
    }
  }
};
