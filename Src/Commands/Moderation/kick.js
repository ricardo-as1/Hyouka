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

const { WarningEmbedColor, ErrorEmbedColor, DefaultEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "kick",
  description: "Kick a user from the server.",
  category: "Moderation",
  usage: "h!kick <user> [reason]",
  cooldown: 10,
  aliases: ['expulsar'],
  permission: ["KICK_MEMBERS"],

  async run(client, message, args) {
    const logChannel = message.guild.channels.cache.get('1282512649791209482'); // Atualize para o nome ou ID correto do canal

    if (!message.member.permissions.has("KICK_MEMBERS")) {
      const KingNoPerm = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Você precisa da permissão \`Kick Members\` para executar este comando!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
        
      return message.reply({ embeds: [KingNoPerm] });
    }

    const user = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Sem motivo fornecido";

    if (!user) {
      const KingNoUser = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Por favor mencione um membro!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoUser] });
    }

    if (user.id === message.author.id) {
      const KingNoSelf = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Você não pode expulsar a si mesmo!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoSelf] });
    }

    if (user.id === client.user.id) {
      const KingNoSelf = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Eu não posso expulsar a mim mesmo!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoSelf] });
    }

    if (user.id === message.guild.ownerId) {
      const KingNoOwner = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Não posso expulsar o dono do servidor!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoOwner] });
    }

    if (!user.kickable) {
      const KingNoKick = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Não posso expulsar este membro!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoKick] });
    }

    const KingKick = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Kick", iconURL: client.user.displayAvatarURL() })
      .setDescription(`
        <:76342banhammer:1282511191801073674> ${user} foi expulso.
        **ID:** ${user.id}
        **Moderador:** ${message.author}
        **Motivo:** ${reason}`)
      .setColor(DefaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
      .setTimestamp();

    try {
      await user.send({ embeds: [KingKick] }).catch(() => {
        message.channel.send({ embeds: [KingKick] });
      });
      await user.kick(reason);

      if (logChannel) {
        await logChannel.send({ embeds: [KingKick] });
      }

      return message.reply({ embeds: [KingKick] });

    } catch (error) {
      const KingError = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Warning", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:Attention:1272975741557936209> Houve um erro ao tentar expulsar o usuário.\n**Motivo:** ${error.message}`)
        .setColor(WarningEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      console.error(error);
      return message.reply({ embeds: [KingError] });
    }
  }
};
