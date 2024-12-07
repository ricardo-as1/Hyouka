/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/addrole.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { ErrorEmbedColor, SuccessEmbedColor } = require('../../Config/Colors.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { default_prefix } = require('../../Config/BotConfig.js');

module.exports = {
  name: 'addrole',
  description: 'Adiciona um cargo a um membro do servidor.',
  category: 'Admin',
  usage: 'h!addrole <membro> <cargo>',
  aliases: ['adicionarcargo'],
  permission: [PermissionsBitField.Flags.ManageRoles],

  async run(client, message, args) {
    // Obtém o membro e o cargo mencionados
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    // Verifica se o autor da mensagem possui permissão para adicionar cargos
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      const permissionErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Permissão Negada", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()}, você precisa da permissão \`Gerenciar Cargos\` para executar esse comando.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [permissionErrorEmbed] });
    }

    // Verifica se o membro foi mencionado corretamente
    if (!member) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()}, mencione um **membro válido** para adicionar o cargo.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp()
        .addFields({ name: 'Exemplo de uso', value: `${default_prefix}addrole @Membro @Cargo` });

      return message.channel.send({ embeds: [embed] });
    }

    // Verifica se o cargo foi mencionado corretamente
    if (!role) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()}, mencione um **cargo válido** para adicionar ao membro.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp()
        .addFields({ name: 'Exemplo de uso', value: `${default_prefix}addrole @Membro @Cargo` });

      return message.channel.send({ embeds: [embed] });
    }

    // Verifica se o membro já possui o cargo
    if (member.roles.cache.has(role.id)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()}, o membro já possui o cargo \`${role.name}\`.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    try {
      // Tenta adicionar o cargo ao membro
      await member.roles.add(role);

      const successEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Cargo Adicionado!", iconURL: client.user.displayAvatarURL() })
        .setDescription(`
          <:Roles:1272975658028367975> **Cargo:** ${role.toString()}
          <:Iconmembers:1272933730121547786> **Membro:** ${member.toString()}
          <:Attention:1272975741557936209> **Para remover o cargo**, use: \`${default_prefix}removerole @Membro @Cargo\`.
        `)
        .setColor(SuccessEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [successEmbed] });
    } catch (error) {
      // Caso ocorra algum erro ao adicionar o cargo
      const errorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()}, ocorreu um erro ao tentar adicionar o cargo \`${role.name}\` ao membro \`${member.user.tag}\`.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp()
        .addFields({ name: 'Detalhes do Erro', value: error.message });

      return message.channel.send({ embeds: [errorEmbed] });
    }
  }
}
