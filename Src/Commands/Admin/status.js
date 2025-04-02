/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/status.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { isGlobalCooldownEnabled, isMaintenanceMode } = require('../../Events/StateManager.js');
const { Sync: { defaultPrefix }, Colors: { errorEmbedColor, defaultEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: 'status',
  description: 'Mostra o status atual do bot, como Cooldowns e Modo de Manutenção.',
  category: 'Admin',
  usage: `${defaultPrefix}status`,
  aliases: ['dashboard', 'painel'],
  permissions: ["Administrator"],

  async run(client, message) {
    // Verificar permissões do autor do comando
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
        const noPermissionEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> **${message.author.username}**`)
        .setColor(errorEmbedColor)
        .setDescription('**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Administrador para usar este comando!**')
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

        return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    // Obter informações de status
    const globalCooldownStatus = isGlobalCooldownEnabled() ? '<:Online:1272932938929012847> Ativado' : '<:Dnd:1272932927071584367> Desativado';
    const maintenanceModeStatus = isMaintenanceMode() ? '<:Online:1272932938929012847> Ativo' : '<:Dnd:1272932927071584367> Desativado';

    // Criar o Embed
    const embed = new EmbedBuilder()
      .setTitle('<:Developer:1273392334956007477> Dashboard Bot')
      .setColor(defaultEmbedColor)
      .setDescription('**Aqui está o status atual das funcionalidades do bot:**')
      .addFields(
        { name: '<:8649cooldown:1282506869881045065> Cooldowns Globais', value: globalCooldownStatus, inline: true },
        { name: '<:Utilitysettings:1273392432977023087> Modo de Manutenção', value: maintenanceModeStatus, inline: true }
      )
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp();

    // Enviar o Embed
    return message.channel.send({ embeds: [embed] });
  }
};
