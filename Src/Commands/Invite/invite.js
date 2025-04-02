/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Invite/invite.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { Sync: { botInvite, supportServer, defaultPrefix }, Colors: { defaultEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "invite",
  description: "Me convide para o seu servidor.",
  category: "Global",
  usage: `${defaultPrefix}invite`,
  aliases: ['inv'],

  async run(client, message, args) {
    const KingEmbed = new EmbedBuilder() // Cria o embed de convite informacional!
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setDescription(`***Clique no botão abaixo para me convidar para o seu servidor ou para obter suporte no meu servidor!***`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(defaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
      .setTimestamp();

    const InviteLink = new ButtonBuilder() // Cria o botão para convidar o bot para o servidor!
      .setLabel("Invite Link")
      .setEmoji("<a:Load:1273063236354179072>")
      .setURL(botInvite)
      .setStyle(ButtonStyle.Link);

    const SupportServer = new ButtonBuilder() // Cria o botão para o servidor de suporte!
      .setLabel("Support Server")
      .setEmoji("<a:Load:1273063236354179072>")
      .setURL(supportServer)
      .setStyle(ButtonStyle.Link);

    const components = [new ActionRowBuilder()
      .addComponents(InviteLink, SupportServer)];

    await message.reply({ embeds: [KingEmbed], components: components });
  }
}