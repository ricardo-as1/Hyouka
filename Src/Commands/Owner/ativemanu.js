/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Owner/ativemanu.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require('discord.js');
const { ErrorEmbedColor, SuccessEmbedColor } = require('../../Config/Colors.js');
const { enableMaintenanceMode, disableMaintenanceMode, isMaintenanceMode } = require('../../Events/StateManager.js');
const { default_prefix, IdOwner } = require('../../Config/BotConfig.js');

module.exports = {
  name: 'ativemanu',
  description: 'Ativa ou desativa o modo de manutenção.',
  aliases: ['maintenance', 'manu'],
  usage: 'h!ativemanu <on/off>',
  category: 'Owner',
  permission: [IdOwner],

  async run(client, message, args) {
    // Verifica se o usuário é o dono do bot
    if (message.author.id !== IdOwner) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: '⚠️ **Hyouka - Permissão Negada**', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(ErrorEmbedColor)
        .setDescription('Você não tem permissão para executar esse comando.')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }

    // Verifica se foi fornecida a ação (on ou off)
    if (args.length < 1) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: '⚠️ **Hyouka - Uso Incorreto**', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(ErrorEmbedColor)
        .addFields(
          { name: '<a:Discord:1275618727467028500> Uso', value: `${default_prefix}ativemanu \`On/Off\``, inline: true },
          { name: '<:8649cooldown:1282506869881045065> Modo de Manutenção', value: `${isMaintenanceMode() ? ' <:Online:1272932938929012847> Ativado' : '<:Dnd:1272932927071584367> Desativado'}`, inline: true }
          )
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }

    // Ativa ou desativa o modo de manutenção com base no argumento
    const action = args[0].toLowerCase();
    if (action === 'on' || action === 'ativar') {
      enableMaintenanceMode();
      const embedEnable = new EmbedBuilder()
        .setAuthor({ name: '⚠️ Modo de Manutenção Ativado', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(SuccessEmbedColor)
        .setDescription('O modo de manutenção foi ativado. Apenas o dono do bot pode executar comandos.')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedEnable] });
    } else if (action === 'off' || action === 'desativar') {
      disableMaintenanceMode();
      const embedDisable = new EmbedBuilder()
        .setTitle('⚠️ Modo de Manutenção Desativado')
        .setColor(SuccessEmbedColor)
        .setDescription('O modo de manutenção foi desativado. Todos podem executar comandos novamente.')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedDisable] });
    } else {
      const embedWarn = new EmbedBuilder()
        .setAuthor({ name: '⚠️ **Hyouka - Uso Incorreto**', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(ErrorEmbedColor)
        .addFields({ 
          name: '<a:Discord:1275618727467028500> Use',
          value: `${default_prefix}ativemanu \`<On/Ativar>/<Off/Desativar>\``,
          inline: true
        })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedWarn] });
    }
  }
};
