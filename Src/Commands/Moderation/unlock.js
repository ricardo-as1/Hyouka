/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/unlock.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor, errorEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "unlock",
  description: "Desbloqueia um canal de texto.",
  category: "Moderation",
  usage: `${defaultPrefix}unlock`,
  aliases: ['destrancar'],
  permission: ["ManageChannels"],

  async run(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Erro de Permissão")
            .setColor(errorEmbedColor)
            .setDescription("Você precisa da permissão `Gerenciar Canais` para usar este comando.")
            .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
            .setTimestamp()
        ]
      });
    }

    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: true
      });

      const embed = new EmbedBuilder()
        .setTitle("Canal Desbloqueado")
        .setColor(defaultEmbedColor)
        .setDescription(`🔓 ${message.channel} foi desbloqueado com sucesso!`)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(`Erro ao desbloquear o canal: ${error}`);
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Erro ao desbloquear o canal")
            .setColor(errorEmbedColor)
            .setDescription("Ocorreu um erro ao tentar desbloquear o canal. Verifique minhas permissões e tente novamente.")
            .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
            .setTimestamp()
        ]
      });
    }
  }
};
