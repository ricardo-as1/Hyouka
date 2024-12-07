/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/removerole.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { ErrorEmbedColor, SuccessEmbedColor } = require("../../Config/Colors.js");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../Config/BotConfig.js");

module.exports = {
  name: 'removerole',
  description: 'Remove um cargo de um membro do servidor.',
  category: 'Admin',
  usage: 'h!removerole <membro> <cargo>',
  aliases: ['removercargo'],
  permission: [PermissionsBitField.Flags.ManageRoles],

  async run(client, message) {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    // Verifica se o autor da mensagem possui permissão para adicionar cargos
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`**${message.author.toString()}, Vocês precisa da permissão \`Gerenciar Cargos\` para remover cargos.**`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    // Verifica se o membro foi mencionado corretamente
    if (!member) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Mencione um membro válido por favor.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    // Verifica se o cargo foi mencionado corretamente
    if (!role) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Mencione um cargo válido por favor.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    // Verifica se o membro não possui o cargo mencionado
    if (!member.roles.cache.has(role.id)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Este membro não possui o cargo mencionado.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    try {
      await member.roles.remove(role); // Remove o cargo do membro

      const successEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Removido com sucesso!", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:Roles:1272975658028367975> - **Cargo:** ${role.toString()}
                        <:Iconmembers:1272933730121547786> - **Membro:** ${member.toString()}
                        <:Attention:1272975741557936209> - __Para adicionar o cargo, use: **${default_prefix}addrole**.__`)
        .setColor(SuccessEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [successEmbed] });
    } catch (Error) {
      const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Desculpe, ocorreu um erro ao tentar remover o cargo: ${Error.message}`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [ErrorEmbed] });
    }
  }
}
