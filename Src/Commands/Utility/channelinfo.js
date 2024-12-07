/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Utility/channelinfo.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, ChannelType } = require('discord.js');
const { DefaultEmbedColor, ErrorEmbedColor } = require('../../Config/Colors.js');

module.exports = {
  name: "channelinfo",
  description: "Exibe informações detalhadas sobre um canal.",
  category: "Utility",
  usage: "h!channelinfo [#canal]",
  aliases: ["cinfo", "channel"],
  permission: [],

  async run(client, message, args) {
    // Obter o canal mencionado, pelo ID ou usar o canal atual
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.channel;

    if (!channel) {
      const NoChannelEmbed = new EmbedBuilder()
        .setTitle("⚠️ Erro - Canal Não Encontrado")
        .setDescription("Não foi possível encontrar o canal especificado.")
        .setColor(ErrorEmbedColor)
        .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
        .setTimestamp();

      return message.reply({ embeds: [NoChannelEmbed] });
    }

    // Coletar informações do canal
    const channelType = {
      [ChannelType.GuildText]: "📝 Texto",
      [ChannelType.GuildVoice]: "🎤 Voz",
      [ChannelType.GuildCategory]: "📂 Categoria",
      [ChannelType.GuildAnnouncement]: "📢 Anúncio",
      [ChannelType.PrivateThread]: "🔒 Thread Privada",
      [ChannelType.PublicThread]: "🔓 Thread Pública",
      [ChannelType.GuildStageVoice]: "🎙️ Palco",
      [ChannelType.GuildForum]: "📋 Fórum",
    }[channel.type] || "❓ Outro";

    // Criar embed de informações do canal com estilo
    const channelInfoEmbed = new EmbedBuilder()
      .setAuthor({ name: `INFORMAÇÕES DO CANAL`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTitle(`Detalhes do Canal: <#${channel.id}>`)
      .setColor(DefaultEmbedColor)
      .addFields(
        { name: '<:ChannelID:1273393744930608128> ID', value: `\`${channel.id}\``, inline: true },
        { name: '<:ChannelType:1311037744356659221> Tipo', value: `\`${channelType}\``, inline: true },
        { name: '<:CreatedAt:1311037593378361434> Criado em', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:F>`, inline: true },
        { name: '<:NSFW:1273392432977023087> NSFW', value: channel.nsfw ? "Sim" : "Não", inline: true },
        { name: '<:ChannelTopic:1311037317657526312> Tópico', value: channel.topic || "Nenhum", inline: false },
        { name: '<:Members:1311037317657526312> Membros', value: `${channel.members?.size || 0}`, inline: true },
        { name: '<:Category:1311037593378361434> Categoria', value: channel.parent ? `\`${channel.parent.name}\`` : "Nenhuma", inline: true }
      )
      .setThumbnail(channel.guild.iconURL({ dynamic: true }))
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp();

    return message.reply({ embeds: [channelInfoEmbed] });
  },
};
