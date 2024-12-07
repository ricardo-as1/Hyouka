/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/ban.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { WarningEmbedColor, ErrorEmbedColor, DefaultEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { IdsChannels } = require('../../Config/BotConfig.js');

module.exports = {
  name: "ban",
  description: "Bane um usuário do servidor.",
  category: "Moderation",
  usage: "h!ban <user> [reason]",
  aliases: ['banir'],
  permission: [PermissionsBitField.Flags.BanMembers],

  async run(client, message, args) {
    const logsBanId = IdsChannels.logsBan; // ID do canal de logs de banimentos
    const logsBan = message.guild.channels.cache.get(logsBanId);

    // Verifica permissão
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
          .setDescription("Você precisa da permissão `Ban Members` para executar este comando!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "Sem motivo fornecido";

    // Validações
    if (!user) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Por favor, mencione um membro ou forneça o ID!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    if (!user.bannable) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Não posso banir este usuário!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    if (user.id === message.author.id) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Você não pode banir a si mesmo!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    if (user.id === message.guild.ownerId) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Não posso banir o dono do servidor!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    // Embed de banimento
    const BanEmbed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Ban", iconURL: client.user.displayAvatarURL() })
      .setDescription(`
        <:76342banhammer:1282511191801073674> **${user} foi banido.**
        **ID:** ${user.id}
        **Moderador:** ${message.author}
        **Motivo:** ${reason}`)
      .setColor(DefaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
      .setTimestamp();

    try {
      // Envia DM ao usuário
      await user.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Você foi banido!", iconURL: client.user.displayAvatarURL() })
          .setDescription(`**Servidor:** ${message.guild.name}\n**Motivo:** ${reason}`)
          .setColor(ErrorEmbedColor)
          .setTimestamp()]
      }).catch(() => null);

      // Bane o usuário
      await user.ban({ reason });

      // Log de banimento no canal definido
      if (logsBan) {
        await logsBan.send({ embeds: [BanEmbed] });
      }

      // Confirmação no canal público
      return message.channel.send({ embeds: [BanEmbed] });
    } catch (error) {
      console.error(error);
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription(`**Erro ao banir o usuário:** ${error.message}`)
          .setColor(WarningEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }
  }
};
