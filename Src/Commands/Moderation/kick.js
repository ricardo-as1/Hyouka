/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/kick.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor, errorEmbedColor, warningEmbedColor }, Logs: { kickChannel } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "kick",
  description: "Kick a user from the server.",
  category: "Moderation",
  usage: `${defaultPrefix}kick <user> [reason]`,
  aliases: ['expulsar'],
  permission: ["KickMembers"],

  async run(client, message, args) {

    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      const embed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Moderador para usar este comando!**`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    const user = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Sem motivo fornecido";

    if (!user) {
      const KingNoUser = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Por favor mencione um membro!`)
        .setColorer(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoUser] });
    }

    if (user.id === message.author.id) {
      const KingNoSelf = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Você não pode expulsar a si mesmo!`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoSelf] });
    }

    if (user.id === client.user.id) {
      const KingNoSelf = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Eu não posso expulsar a mim mesmo!`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoSelf] });
    }

    if (user.id === message.guild.ownerId) {
      const KingNoOwner = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Não posso expulsar o dono do servidor!`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.reply({ embeds: [KingNoOwner] });
    }

    if (!user.kickable) {
      const KingNoKick = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Não posso expulsar este membro!`)
        .setColor(errorEmbedColor)
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
      .setColor(defaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
      .setTimestamp();

    try {
      await user.send({ embeds: [KingKick] }).catch(() => {
        message.channel.send({ embeds: [KingKick] });
      });
      await user.kick(reason);

      if (kickChannel) {
        await kickChannel.send({ embeds: [KingKick] });
      }

      return message.reply({ embeds: [KingKick] });

    } catch (error) {
      const KingError = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Warning", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:Attention:1272975741557936209> Houve um erro ao tentar expulsar o usuário.\n**Motivo:** ${error.message}`)
        .setColor(warningEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      console.error(error);
      return message.reply({ embeds: [KingError] });
    }
  }
};
