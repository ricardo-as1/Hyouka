/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/kick.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { WarningEmbedColor, ErrorEmbedColor, DefaultEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { IdsChannels } = require('../../Config/BotConfig.js'); // Adapte o caminho conforme necessário

module.exports = {
  name: "kick",
  description: "Expulsar um usuário do servidor.",
  category: "Moderation",
  usage: "h!kick <user> [reason]",
  aliases: ['expulsar'],
  permission: [PermissionsBitField.Flags.KickMembers],

  async run(client, message, args) {
    const logsKickId = IdsChannels.logsKick; // ID do canal de logs de expulsões
    const logsKick = message.guild.channels.cache.get(logsKickId);

    // Verifica permissão
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
          .setDescription("Você precisa da permissão `Kick Members` para executar este comando!")
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

    if (user.id === message.author.id) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Você não pode expulsar a si mesmo!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    if (user.id === client.user.id) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Eu não posso expulsar a mim mesmo!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    if (user.id === message.guild.ownerId) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Não posso expulsar o dono do servidor!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    if (!user.kickable) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription("Não posso expulsar este membro!")
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }

    // Embed de expulsão
    const KickEmbed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Expulsão", iconURL: client.user.displayAvatarURL() })
      .setDescription(`
        <:76342banhammer:1282511191801073674> **${user} foi expulso.**
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
          .setAuthor({ name: "Você foi expulso!", iconURL: client.user.displayAvatarURL() })
          .setDescription(`**Servidor:** ${message.guild.name}\n**Motivo:** ${reason}`)
          .setColor(ErrorEmbedColor)
          .setTimestamp()]
      }).catch(() => null);

      // Expulsa o usuário
      await user.kick(reason);

      // Log de expulsão no canal definido
      if (logsKick) {
        await logsKick.send({ embeds: [KickEmbed] });
      }

      // Confirmação no canal público
      return message.channel.send({ embeds: [KickEmbed] });
    } catch (error) {
      console.error(error);
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription(`**Erro ao expulsar o usuário:** ${error.message}`)
          .setColor(WarningEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()]
      });
    }
  }
};
