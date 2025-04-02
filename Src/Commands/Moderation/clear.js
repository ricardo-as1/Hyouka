/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/clear.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { Sync: { defaultPrefix }, Colors: { errorEmbedColor, successEmbedColor, warningEmbedColor } } = require("../../ConfigHub/System.js");

module.exports = {
  name: "clear",
  description: "Limpa o chat até a última mensagem dos últimos 14 dias.",
  aliases: ['limpar', 'c'],
  category: "Admin",
  usage: `${defaultPrefix}clear <quantidade>`,
  permission: ["ManageMessages"],

  async run(client, message, args) {
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      const embed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Moderador para usar este comando!**`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    if (!args[0] || isNaN(args[0])) {
      const embed = new EmbedBuilder()
        .setTitle(`<:ItemNotification:1272932589946142832> **${message.author.username}**`)
        .setColor(errorEmbedColor)
        .setDescription(`Por favor, forneça um número válido de mensagens para deletar.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    let deleteCount = parseInt(args[0], 10);
    if (deleteCount < 1 || deleteCount > 1000) { // Máximo ajustado para evitar requisições excessivas.
      const embed = new EmbedBuilder()
        .setTitle(`<:ItemNotification:1272932589946142832> **${message.author.username}**`)
        .setColor(warningEmbedColor)
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
          .setTitle('<:Textchannel:1272934738830823495> Chat Limpo!')
          .setColor(successEmbedColor)
          .setDescription(`Foram deletadas ${messagesDeleted} mensagens.`)
          .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
          .setTimestamp();

        message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 5000));
      } else {
        const embed = new EmbedBuilder()
          .setTitle('<:ItemNotification:1272932589946142832> Nenhuma mensagem foi apagada.')
          .setColor(warningEmbedColor)
          .setDescription('Certifique-se de que as mensagens não têm mais de 14 dias.')
          .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setTitle('<:ItemNotification:1272932589946142832> Erro')
        .setColor(errorEmbedColor)
        .setDescription('Ocorreu um erro ao tentar limpar as mensagens.')
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  }
};
