/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/clear.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { ErrorEmbedColor, SuccessEmbedColor, WarningEmbedColor } = require("../../Config/Colors.js");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Limpa o chat até a última mensagem dos últimos 14 dias.",
  aliases: ['limpar', 'c'],
  category: "Admin",
  usage: "h!clear <quantidade>",
  permission: [PermissionsBitField.Flags.ManageMessages],

  async run(client, message, args) {
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`Você precisa da permissão \`Gerenciar Mensagens\` para executar esse comando.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

    return message.channel.send({ embeds: [embed] });
    }

    if (!args[0] || isNaN(args[0])) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`Por favor, forneça um número válido de mensagens para deletar.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

    return message.channel.send({ embeds: [embed] });
    }

    let deleteCount = parseInt(args[0], 10);
    if (deleteCount < 1 || deleteCount > 1000) { // Máximo ajustado para evitar requisições excessivas.
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(WarningEmbedColor)
        .setDescription(`O número deve ser entre 1 e 1000.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

    return message.channel.send({ embeds: [embed] });
    }

    try {
      const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
      let messagesDeleted = 0;

      while (deleteCount > 0) {
        const messages = await message.channel.messages.fetch({ limit: Math.min(deleteCount, 100) });
        const messagesToDelete = messages.filter(msg => msg.createdTimestamp >= fourteenDaysAgo);

        if (messagesToDelete.size === 0) break;

        await message.channel.bulkDelete(messagesToDelete, true);
        messagesDeleted += messagesToDelete.size;

        deleteCount -= messagesToDelete.size;
      }

      if (messagesDeleted > 0) {
        const embed = new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Sucesso", iconURL: client.user.displayAvatarURL() })
          .setColor(SuccessEmbedColor)
          .setDescription(`Foram deletadas ${messagesDeleted} mensagens.`)
          .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
          .setTimestamp();

      return message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 5000));
      } else {
        const embed = new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Aviso", iconURL: client.user.displayAvatarURL() })
          .setColor(WarningEmbedColor)
          .setDescription('Certifique-se de que as mensagens não têm mais de 14 dias.')
          .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
          .setTimestamp();

      return message.channel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription('Ocorreu um erro ao tentar limpar as mensagens.')
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }
  }
};
