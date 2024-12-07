/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/setprefix.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { ErrorEmbedColor, SuccessEmbedColor } = require("../../Config/Colors.js");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { setPrefix } = require('../../Database/DataBase.js');

module.exports = {
  name: 'setprefix',
  description: 'Define um novo prefixo para o servidor.',
  aliases: ['prefix', 'changeprefix'],
  usage: 'h!setprefix <prefix>',
  category: 'Admin',
  permission: [PermissionsBitField.Flags.ManageGuild],

  async run(client, message, args) {
    // Verifica se o servidor foi mencionado
    if (!message.guild) {
     return message.channel.send("Servidor não encontrado.");
    } 

    // Verifica se o autor da mensagem possui permissão necessária.
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      const PermissionDenied = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()}, Vocês precisa da permissão \`Gerenciar Servidor\` para resetar o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [PermissionDenied] });
    }

    // Verifica se o prefixo foi fornecido 
    const newPrefix = args[0];
    if (!newPrefix) {
      const PrefixEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()} Por favor, forneça um novo prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [PrefixEmbed] });
    }

    try {
      setPrefix(message.guild.id, newPrefix);

      const SuccessEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Sucesso", iconURL: client.user.displayAvatarURL() })
        .setColor(SuccessEmbedColor)
        .setDescription(`<:Developer:1273392334956007477> **Prefixo alterado para:** \`${newPrefix}\``)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [SuccessEmbed] });
    } catch (error) {
      console.error("Erro ao definir o prefixo:", error);
      const errorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setColor(ErrorEmbedColor)
        .setDescription(`**${message.author.toString()} Ocorreu um erro ao tentar definir o prefixo.**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [errorEmbed] });
    }
  }
};
