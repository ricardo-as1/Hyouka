/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Admin/config.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "config",
  description: "Exibe informações de configuração do bot e permite alterar o prefixo.",
  category: "Admin",
  usage: `${defaultPrefix}config`,
  permission: ["Administrator"],

  async run(client, message) {
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      const noPermissionEmbed = new EmbedBuilder()
        .setTitle(`<:CheckIncorrect:1272975727821590561> **${message.author.username}**`)
        .setColor(errorEmbedColor)
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Administrador para usar este comando!**`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.reply({ embeds: [noPermissionEmbed] });
    } else {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Configuração", iconURL: client.user.displayAvatarURL() })
        .addFields({
          name: "<:Lootbox:1273392541319827469> Alterar Prefixo:",
          value: "\`h!prefix <prefixo>\` **- Altera o prefixo do bot.**",
          inline: false
        })
        .setColor(defaultEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      message.channel.send({ embeds: [embed] });
    }
  }
};