/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Invite/invite.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { Bot_Invite, Support_Server } = require('../../Config/BotConfig.js');
const { DefaultEmbedColor } = require('../../Config/Colors.js');

module.exports = {
  name: "invite",
  description: "Me convide para o seu servidor.",
  category: "Global",
  usage: "h!invite",
  aliases: ['inv'],

  async run(client, message, args) {
    const KingEmbed = new EmbedBuilder() // Cria o embed de convite informacional!
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setDescription(`***Clique no botão abaixo para me convidar para o seu servidor ou para obter suporte no meu servidor!***`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(DefaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
      .setTimestamp();

    const InviteLink = new ButtonBuilder() // Cria o botão para convidar o bot para o servidor!
      .setLabel("Invite Link")
      .setEmoji("<a:Load:1273063236354179072>")
      .setURL(Bot_Invite)
      .setStyle(ButtonStyle.Link);

    const SupportServer = new ButtonBuilder() // Cria o botão para o servidor de suporte!
      .setLabel("Support Server")
      .setEmoji("<a:Load:1273063236354179072>")
      .setURL(Support_Server)
      .setStyle(ButtonStyle.Link);

    const components = [new ActionRowBuilder()
      .addComponents(InviteLink, SupportServer)];

    return message.channel.send({ embeds: [KingEmbed], components: components });
  }
}