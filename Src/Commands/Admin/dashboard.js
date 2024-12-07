/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/dashboard.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { isGlobalCooldownEnabled, isMaintenanceMode } = require('../../Events/StateManager.js');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { DefaultEmbedColor } = require('../../Config/Colors.js');

module.exports = {
  name: 'dashboard',
  description: 'Mostra o dashboard do bot, mostrando Cooldowns, Modo de Manutenção e etc.',
  category: 'Admin',
  usage: 'h!dashboard',
  aliases: ['painel'],
  permissions: [PermissionFlagsBits.ManageGuild],

  async run(client, message) {
    // Verificar permissões do autor do comando
    if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
        const noPermissionEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription('**<:CheckIncorrect:1272975727821590561> Vocês precisa da permissão \`Gerenciar Servidor\` para visualizar o painel!**')
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

        return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    // Obter informações de status
    const globalCooldownStatus = isGlobalCooldownEnabled() ? '<:Online:1272932938929012847> Ativadoㅤㅤㅤ' : '<:Dnd:1272932927071584367> Desativado';
    const maintenanceModeStatus = isMaintenanceMode() ? '<:Online:1272932938929012847> Ativo' : '<:Dnd:1272932927071584367> Desativado';

    // Criar o Embed
    const embed = new EmbedBuilder()
    .setAuthor({ name: "Hyouka - Dashboard", iconURL: client.user.displayAvatarURL() })
      .setColor(DefaultEmbedColor)
      .setDescription('**Aqui está o status atual das funcionalidades do bot:**')
      .addFields(
        { name: '<:8649cooldown:1282506869881045065> Cooldown Commandㅤㅤㅤ', value: globalCooldownStatus || 'Indisponível', inline: true },
        { name: '<:manitance:1314802129709301802> Modo de Manutenção', value: maintenanceModeStatus || 'Indisponível', inline: true },
        { name: ' ', value: ' ', inline: false },
        )      
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp();

    // Enviar o Embed
    return message.channel.send({ embeds: [embed] });
  }
};
