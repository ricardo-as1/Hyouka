/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/rcargo.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { Sync: { defaultPrefix }, Colors: { successEmbedColor, errorEmbedColor } } = require("../../ConfigHub/System.js");

module.exports = {
  name: "rcargo",
  description: "Remove um cargo de um membro",
  category: "Admin",
  usage: `${defaultPrefix}removerole <membro> <cargo>`,
  aliases: ['removercargo', 'rcargo'],
  permission: ["ManageRoles"],

  async run(client, message) {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      const embed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Administrador para usar este comando!**`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    if (!member) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Mencione um membro válido por favor.`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    if (!role) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Mencione um cargo válido por favor.`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    try {
      await member.roles.remove(role);

      const successEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Cargo removido com sucesso!", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:Roles:1272975658028367975> - **Cargo:** ${role.toString()}
                        <:Iconmembers:1272933730121547786> - **Membro:** ${member.toString()}
                        <:Attention:1272975741557936209> - __Para adicionar o cargo, use: **${defaultPrefix}addcargo**.__`)
        .setColor(successEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      message.channel.send({ embeds: [successEmbed] });
    } catch (Error) {
      const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Desculpe, ocorreu um erro ao tentar remover o cargo: ${Error.message}`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      message.channel.send({ embeds: [ErrorEmbed] });
    }
  }
}
