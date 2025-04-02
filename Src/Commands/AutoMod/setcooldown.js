/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/AutoMod/setcooldown.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require('discord.js');
const { enableGlobalCooldown, disableGlobalCooldown, isGlobalCooldownEnabled } = require('../../Events/StateManager.js');
const { Sync: { defaultPrefix }, Colors: { errorEmbedColor, successEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: 'setcooldown',
  description: 'Ativa ou desativa o cooldown global para todos os comandos.',
  aliases: ['cooldown'],
  permissions: 'ADMINISTRATOR',
  category: 'AutoMod',
  usage: `${defaultPrefix}setcooldown <on/off>`,

  async run(client, message, args) {
    // Verifica se a quantidade de argumentos é suficiente
    if (args.length < 1) {
      const embed = new EmbedBuilder()
        .setTitle('⚠️ **Hyouka - Uso incorreto**')
        .setColor(errorEmbedColor)
        .addFields(
          { name: '<a:Discord:1275618727467028500> Uso', value: `${defaultPrefix}cooldown \`On/Off\``, inline: true },
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
        .setTitle('<:8649cooldown:1282506869881045065> Cooldown Global Ativado')
        .setColor(successEmbedColor)
        .setDescription(`Cooldown global ativado para todos os comandos.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedEnable] });

      // Desativa o cooldown global
    } else if (action === 'off' || action === 'desativar') {
      disableGlobalCooldown();

      const embedDisable = new EmbedBuilder()
        .setTitle('<:8649cooldown:1282506869881045065> Cooldown Global Desativado')
        .setColor(successEmbedColor)
        .setDescription(`Cooldown global desativado para todos os comandos.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedDisable] });

    } else {
      // Mensagem de erro para ação inválida
      const embedWarn = new EmbedBuilder()
        .setTitle('⚠️ Ação Inválida')
        .setColor(errorEmbedColor)
        .addFields({
          name: '<a:Discord:1275618727467028500> Use',
          value: `${defaultPrefix}setcooldown \`<On/Ativar>/<Off/Desativar>\``,
          inline: true
        })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embedWarn] });
    }
  }
};
