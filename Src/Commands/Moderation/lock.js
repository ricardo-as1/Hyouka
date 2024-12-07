/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/lock.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { ErrorEmbedColor, SuccessEmbedColor } = require('../../Config/Colors.js');

module.exports = {
  name: "lock",
  description: "Bloqueia o canal atual.",
  category: "Moderation",
  usage: "h!lock",
  aliases: ['bloquear'],
  permission: [PermissionsBitField.Flags.ManageChannels],

  async run(client, message) {
    // Verifica se o autor do comando tem permissão
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Você precisa da permissão \`Gerenciar Canais\` para executar esse comando!**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

    return message.channel.send({ embeds: [embed] });
    }

    // Verifica se o bot tem permissão para gerenciar canais
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Insuficiente", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Eu preciso da permissão \`Gerenciar Canais\` para executar esse comando!**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

    return message.channel.send({ embeds: [embed] });
    }

    // Bloqueia o canal
    try {
      const everyoneRole = message.guild.roles.everyone;
      await message.channel.permissionOverwrites.edit(everyoneRole, { SendMessages: false });

      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Canal Bloqueado", iconURL: client.user.displayAvatarURL() })
        .setColor(SuccessEmbedColor)
        .setDescription(`**<:CheckCorrect:1272975713330401450> O canal ${message.channel} foi bloqueado com sucesso!**\nOs membros agora não podem mais enviar mensagens.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

    return message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);

      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Ocorreu um erro ao tentar bloquear o canal.**\nPor favor, verifique minhas permissões e tente novamente.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

    return message.channel.send({ embeds: [embed] });
    }
  }
};
