/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

/**
 * Placeholder command
 * @type {import("../../Config/basecommands.js")}
 */

const { EmbedBuilder } = require('discord.js');
const { DefaultEmbedColor } = require('../../Config/Colors.js');

module.exports = {
  name: "config",
  description: "Exibe informações de configuração do bot e permite alterar o prefixo.",
  category: "Admin",
  usage: "config",
  cooldown: 10,
  permission: ["ADMINISTRATOR"],

  async run(client, message) {
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Configuração", iconURL: client.user.displayAvatarURL() })
      .addFields({
        name: "<:Lootbox:1273392541319827469> Alterar Prefixo:",
        value: "\`h!prefix <prefixo>\` **- Altera o prefixo do bot.**",
        inline: false
      })
      .setColor(DefaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    message.channel.send({ embeds: [embed] });
  }
};