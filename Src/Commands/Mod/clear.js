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

const { ErrorEmbedColor, SuccessEmbedColor, WarningEmbedColor } = require("../../Config/Colors.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Limpa o chat.",
  aliases: ['limpar', 'c'],
  category: "Admin",
  usage: "h!clear <quantidade>",
  cooldown: 10,
  permission: ["MANAGE_MESSAGES"],

  async run(client, message, args) {
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      const embed = new EmbedBuilder()
        .setTitle(`<:ItemNotification:1272932589946142832> **${message.author.username}**`)
        .setColor(ErrorEmbedColor)
        .setDescription(`Você precisa da permissão \`Gerenciar Mensagens\` para executar esse comando.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    if (!args[0] || isNaN(args[0])) {
      const embed = new EmbedBuilder()
        .setTitle(`<:ItemNotification:1272932589946142832> **${message.author.username}**`)
        .setColor(ErrorEmbedColor)
        .setDescription(`Por favor, forneça um número válido de 1 a 100.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    const deleteCount = parseInt(args[0], 10);
    if (deleteCount < 1 || deleteCount > 100) {
      const embed = new EmbedBuilder()
        .setTitle(`<:ItemNotification:1272932589946142832> **${message.author.username}**`)
        .setColor(WarningEmbedColor)
        .setDescription(`O número deve ser entre 1 e 100.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    try {
      await message.channel.bulkDelete(deleteCount +1, true);
      const embed = new EmbedBuilder()
        .setTitle('<:Textchannel:1272934738830823495> Chat Limpo!')
        .setColor(SuccessEmbedColor)
        .setDescription(`Foram deletadas ${deleteCount} mensagens.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      message.channel.send({ embeds: [embed] }).then(msg => {
        setTimeout(() => msg.delete(), 5000);
      });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setTitle('<:ItemNotification:1272932589946142832> Erro')
        .setColor(ErrorEmbedColor)
        .setDescription('Ocorreu um erro ao tentar limpar as mensagens. Verifique se as mensagens não têm mais de 14 dias.')
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      message.channel.send({ embeds: [embed] });
    }
  }
};
