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
 * Support Server | (https://discord.gg/HKkHaqPNac)
 **/

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
  args: false,
  cooldown: 10,
  category: "Information",
  permission: ["MANAGE_GUILD"],

  async run(client, message, args) {
    // Verifica se o usuário tem permissão para executar o comando
    if (!message.member.permissions.has("MANAGE_GUILD")) {
      const noPermissionEmbed = new EmbedBuilder()
        .setTitle(`❌ **${message.author.username}**`)
        .setColor(EmbedColor.defaultErrorColor)
        .setDescription(`Você não tem permissão para resetar o prefixo.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.reply({ embeds: [noPermissionEmbed] });
    }

    // Remove o prefixo personalizado do banco de dados
    removePrefix(message.guild.id);

    // Cria uma resposta de sucesso
    const successEmbed = new EmbedBuilder()
      .setTitle(`🔄 **Prefixo Resetado**`)
      .setColor(EmbedColor.defaultSuccessColor)
      .setDescription(`O prefixo foi resetado para o padrão: \`${defaultPrefix}\``)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp();

    return message.reply({ embeds: [successEmbed] });
  }
};
