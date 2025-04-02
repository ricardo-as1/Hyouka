/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/lock.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor, errorEmbedColor, warningEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "lock",
  description: "Bloqueia um canal de texto.",
  category: "Moderation",
  usage: `${defaultPrefix}lock [#canal]`,
  aliases: ['trancar'],
  permission: ["ManageChannels"],

  async run(client, message, args) {
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();
    const channel = message.mentions.channels.first() || message.channel;

    // Verifica se o usuário tem permissão para gerenciar canais
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Erro de Permissão")
            .setColor(errorEmbedColor)
            .setDescription("Você precisa da permissão `Gerenciar Canais` para executar este comando!")
            .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
            .setTimestamp()
        ]
      });
    }

    // Verifica se o bot tem permissão para gerenciar canais
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Erro de Permissão")
            .setColor(errorEmbedColor)
            .setDescription("Eu preciso da permissão `Gerenciar Canais` para executar este comando!")
            .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
            .setTimestamp()
        ]
      });
    }

    try {
      // Verifica se o canal já está bloqueado
      const currentPermissions = channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id);
      if (currentPermissions && currentPermissions.deny.has(PermissionFlagsBits.SendMessages)) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Canal já bloqueado!")
              .setColor(warningEmbedColor)
              .setDescription(`${channel} já está bloqueado para mensagens.`)
              .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
              .setTimestamp()
          ]
        });
      }

      // Bloqueia o canal para o @everyone
      await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        [PermissionFlagsBits.SendMessages]: false
      });

      const embed = new EmbedBuilder()
        .setTitle("Canal Bloqueado")
        .setColor(defaultEmbedColor)
        .setDescription(`🔒 ${channel} foi bloqueado com sucesso!`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(`Erro ao bloquear o canal: ${error}`);
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Erro ao bloquear o canal")
            .setColor(errorEmbedColor)
            .setDescription(`Ocorreu um erro ao tentar bloquear o canal. \n\`\`\`${error.message}\`\`\``)
            .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
            .setTimestamp()
        ]
      });
    }
  }
};
