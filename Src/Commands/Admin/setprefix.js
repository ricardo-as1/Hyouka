/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/setprefix.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { setPrefix } = require('../../Database/DataBase.js');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { errorEmbedColor, successEmbedColor } } = require("../../ConfigHub/System.js");

module.exports = {
  name: "setprefix",
  description: "Define um novo prefixo para o servidor.",
  aliases: ['prefix', 'changeprefix'],
  usage: `${defaultPrefix}setprefix <prefix>`,
  category: "Admin",
  permission: ["Administrator"],

  async run(client, message, args) {
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.guild) {
      message.channel.send("Servidor não encontrado.");
      return;
    }

    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      const embed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(errorEmbedColor)
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Administrador para usar este comando!**.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    const newPrefix = args[0];
    if (!newPrefix) {
      const PrefixEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(errorEmbedColor)
        .setDescription(`**${message.author.toString()} Por favor, forneça um novo prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [PrefixEmbed] });
    }

    try {
      setPrefix(message.guild.id, newPrefix);

      const SuccessEmbed = new EmbedBuilder()
        .setTitle(`<:Lootbox:1273392541319827469> Sucesso`)
        .setColor(successEmbedColor)
        .setDescription(`<:Developer:1273392334956007477> **Prefixo alterado para:** \`${newPrefix}\``)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [SuccessEmbed] });
    } catch (error) {
      console.error("Erro ao definir o prefixo:", error);
      const errorEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(errorEmbedColor)
        .setDescription(`**${message.author.toString()} Ocorreu um erro ao tentar definir o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [errorEmbed] });
    }
  }
};
