/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/resetprefix.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { SuccessEmbedColor, ErrorEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { default_prefix } = require('../../Config/BotConfig.js');
const { removePrefix } = require('../../Database/DataBase.js');

module.exports = {
  name: 'resetprefix',
  description: 'Reseta o prefixo para o padrão.',
  aliases: ['prefixreset'],
  usage: 'h!resetprefix',
  category: 'Admin',
  permission: [PermissionsBitField.Flags.ManageGuild],

  async run(client, message) {

    // Verifica se o autor da mensagem possui permissão necessária.
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      const noPermissionEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()}, Vocês precisa da permissão \`Gerenciar Servidor\` para resetar o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    // Verifica se o prefixo ja esta no padrão
    if (message.guild.prefix === default_prefix) {
      const samePrefixEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`${message.author.toString()}, O prefixo já está no padrão.`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [samePrefixEmbed] });
    }

    // Resetando o prefixo para o padrão
    if (message.guild.prefix !== default_prefix) {
    removePrefix(message.guild.id);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Sucesso", iconURL: client.user.displayAvatarURL() })
      .setColor(SuccessEmbedColor)
      .setDescription(`<:Developer:1273392334956007477> **O prefixo foi resetado para: \`${default_prefix}\`**`)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp()

    return message.channel.send({ embeds: [successEmbed] });
  }
  }
}
