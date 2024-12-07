/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/unban.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { WarningEmbedColor, ErrorEmbedColor, DefaultEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { IdsChannels } = require('../../Config/BotConfig.js');

module.exports = {
  name: "unban",
  description: "Remove o banimento de um usuário do servidor.",
  category: "Moderation",
  usage: "h!unban <userID> [reason]",
  aliases: ['desbanir'],
  permission: [PermissionsBitField.Flags.BanMembers],

  async run(client, message, args) {
    const logChannel = client.channels.cache.get(IdsChannels.logsUnban); // Obtém o canal de logs

    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      const NoPerm = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Você precisa da permissão \`Ban Members\` para executar este comando!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.channel.send({ embeds: [NoPerm] });
    }

    const userID = args[0];
    const reason = args.slice(1).join(" ") || "Sem motivo fornecido";

    // Verifica se o ID do usuário é válido
    if (!userID || isNaN(userID)) {
      const NoUser = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:CheckIncorrect:1272975727821590561> Por favor, forneça um ID válido de usuário!`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      return message.channel.send({ embeds: [NoUser] });
    }

    try {
      // Busca os banimentos ativos no servidor
      const bans = await message.guild.bans.fetch();
      const bannedUser = bans.get(userID);

      if (!bannedUser) {
        const NotBanned = new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription(`<:CheckIncorrect:1272975727821590561> O usuário com o ID \`${userID}\` não está banido!`)
          .setColor(ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp();
        return message.channel.send({ embeds: [NotBanned] });
      }

      // Remove o banimento
      await message.guild.members.unban(userID, reason);

      // Mensagem ao canal de execução
      const UnbanEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Unban", iconURL: client.user.displayAvatarURL() })
        .setDescription(`
          <:76342banhammer:1282511191801073674> O usuário com o ID \`${userID}\` foi desbanido.
          **Moderador:** ${message.author}
          **Motivo:** ${reason}`)
        .setColor(DefaultEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();

      if (logChannel) {
        await logChannel.send({ embeds: [UnbanEmbed] });
      }

      return message.channel.send({ embeds: [UnbanEmbed] });

    } catch (error) {
      // Tratamento de erros
      const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Aviso", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:Attention:1272975741557936209> Houve um erro ao tentar desbanir o usuário.\n**Motivo:** ${error.message}`)
        .setColor(WarningEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();
      console.error(error);
      return message.channel.send({ embeds: [ErrorEmbed] });
    }
  }
};
