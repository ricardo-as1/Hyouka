/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { ErrorEmbedColor, SuccessEmbedColor } = require("../../Config/Colors.js");
const { default_prefix } = require("../../Config/BotConfig.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "removerole",
  description: "Remove um cargo de um membro",
  category: "Admin",
  usage: "h!removerole <membro> <cargo>",
  cooldown: 10,
  aliases: ['removercargo'],
  permission: ["ADMINISTRATOR"],

  async run(client, message) {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!member) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Mencione um membro válido por favor.`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    if (!role) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Mencione um cargo válido por favor.`)
        .setColor(ErrorEmbedColor)
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
                        <:Attention:1272975741557936209> - __Para adicionar o cargo, use: **${default_prefix}addrole**.__`)
        .setColor(SuccessEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      message.channel.send({ embeds: [successEmbed] });
    } catch (Error) {
      const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${message.author.toString()} Desculpe, ocorreu um erro ao tentar remover o cargo: ${Error.message}`)
        .setColor(ErrorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();

      message.channel.send({ embeds: [ErrorEmbed] });
    }
  }
}
