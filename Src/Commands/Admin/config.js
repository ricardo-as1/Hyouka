/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/config.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { DefaultEmbedColor, ErrorEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { default_prefix } = require('../../Config/BotConfig.js');

module.exports = {
  name: 'config',
  description: 'Exibe informações de configuração do bot e permite alterá-las.',
  category: 'Admin',
  usage: 'h!config',
  aliases: ['config'],
  permission: [PermissionsBitField.Flags.ManageGuild],

  async run(client, message, args) {

    // Verifica se o autor da mensagem possui permissão necessária.
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      const noPermissionEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()}, Vocês precisa da permissão \`Gerenciar Servidor\` para configurar o bot.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    const Config = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Configuração", iconURL: client.user.displayAvatarURL() })
      .addFields({
        name: "<:Developer:1273392334956007477> Alterar Prefixo:",
        value: `<:IconJoin:1282468006194315346> ${default_prefix}prefix <prefixo> **- Altera o prefixo do bot.**`,
        inline: false,
      }, {
        name: "<:Developer:1273392334956007477> Resetar Prefixo:",
        value: `<:IconJoin:1282468006194315346> ${default_prefix}resetprefix **- Reseta o prefixo para o padrão.**`,
        inline: false,
      })
      .setColor(DefaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp()

    return message.channel.send({ embeds: [Config] });
  }
};