/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/AutoMod/setcooldown.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { enableGlobalCooldown, disableGlobalCooldown, isGlobalCooldownEnabled } = require('../../Events/StateManager.js');
const { ErrorEmbedColor, SuccessEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { default_prefix } = require('../../Config/BotConfig.js');

module.exports = {
  name: 'setcooldown',
  description: 'Ativa ou desativa o cooldown global para todos os comandos.',
  category: 'AutoMod',
  aliases: ['cooldown'],
  usage: 'h!setcooldown <on/off>',
  permissions: [PermissionsBitField.Flags.ManageGuild],

  async run(client, message, args) {

    // Verifica se o autor da mensagem possui permissão necessária.
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      const noPermissionEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()}, Vocês precisa da permissão \`Gerenciar Servidor\` para setar o cooldown global.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    // Verifica se a quantidade de argumentos é suficiente
    if (args.length < 1) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .addFields(
          { name: '<a:Discord:1275618727467028500> Uso', value: `${default_prefix}cooldown \`On/Off\``, inline: true },
          { name: '<:8649cooldown:1282506869881045065> Cooldown Status', value: `${isGlobalCooldownEnabled() ? ' <:Online:1272932938929012847> Ativado' : '<:Dnd:1272932927071584367> Desativado'}`, inline: true }
        )
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    const action = args[0].toLowerCase();

    // Ativa o cooldown global
    if (action === 'on' || action === 'ativar') {
      enableGlobalCooldown();

      const embedEnable = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Ativado!", iconURL: client.user.displayAvatarURL() })
        .setColor(SuccessEmbedColor)
        .setDescription(`<:Online:1272932938929012847> Cooldown global ativado para todos os comandos.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedEnable] });

      // Desativa o cooldown global
    } else if (action === 'off' || action === 'desativar') {
      disableGlobalCooldown();

      const embedDisable = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Desativado!", iconURL: client.user.displayAvatarURL() })
        .setColor(SuccessEmbedColor)
        .setDescription(` <:Dnd:1272932927071584367> Cooldown global desativado para todos os comandos.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedDisable] });

    } else {
      // Mensagem de erro para ação inválida
      const embedWarn = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .addFields({
          name: '<a:Discord:1275618727467028500> Use', value: `${default_prefix}setcooldown \`<On/Ativar>/<Off/Desativar>\``, inline: true })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedWarn] });
    }
  }
};
