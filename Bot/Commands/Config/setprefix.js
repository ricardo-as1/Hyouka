/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * @INFORMAÇÕES_DO_BOT
 * Name | Hyouka
 * Description | Um bot de moderação e diversão para servidores do Discord.
 * @LINKS 
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/QxQUZbv7df)
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
  args: true,
  cooldown: 10,
  category: "Config",
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

      return message.reply({ embeds: [embed] });
    }

    const newPrefix = args[0];
    if (!newPrefix) {
      const PrefixEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(EmbedColor.defaultErrorColor)
        .setDescription(`**${message.author.toString()} Por favor, forneça um novo prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.reply({ embeds: [PrefixEmbed] });
    }

    try {
      await setPrefix(message.guild.id, newPrefix);  // Certifique-se de que `setPrefix` é uma Promise

      const SuccessEmbed = new EmbedBuilder()
        .setTitle(`<:Lootbox:1273392541319827469> Sucesso`)
        .setColor(EmbedColor.defaultSuccessColor)
        .setDescription(`<:Developer:1273392334956007477> **Prefixo alterado para:** \`${newPrefix}\``)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.reply({ embeds: [SuccessEmbed] });
    } catch (error) {
      console.error("Erro ao definir o prefixo:", error);
      const errorEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> Erro`)
        .setColor(EmbedColor.defaultErrorColor)
        .setDescription(`**${message.author.toString()} Ocorreu um erro ao tentar definir o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.reply({ embeds: [errorEmbed] });
    }
  }
};
