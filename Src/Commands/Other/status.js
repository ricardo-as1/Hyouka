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

const { getCreatedDate, getUptime } = require('../../Config/TimeString.js');
const { DefaultEmbedColor } = require('../../Config/Colors.js');
const { default_prefix } = require('../../Config/BotConfig.js');
const { EmbedBuilder } = require('discord.js');
const { getPrefix } = require('../../Database/DataBase.js');

module.exports = {
  name: "status",
  description: "Mostra as informações do bot.",
  category: "Global",
  usage: "status",
  cooldown: 10,
  aliases: ['botinfo', 'binfo', 'info', 'stats'],

  async run(client, message) {
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    const Botinfo = new EmbedBuilder()
      .setAuthor({ name: `INFORMAÇÕES DO BOT`, iconURL: client.user.displayAvatarURL() })
      .addFields(
        { name: '<:Lootbox:1273392541319827469> Nome:', value: `┕\`${client.user.username}\``, inline: true },
        { name: '<:Automod:1273403347122126960> Users:', value: `┕\`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\``, inline: true },
        { name: '<:Utilitysettings:1273392432977023087> Servidores:', value: `┕\`${client.guilds.cache.size}\``, inline: true },
        { name: '<:Bot:1273393738290434068> Criado em:', value: `┕\`${getCreatedDate(client.user.createdAt)}\``, inline: true },
        { name: '<:Developer:1273392334956007477> Prefixo:', value: `┕\`${await getPrefix(client) || default_prefix}\``, inline: true },
        { name: '<:Diamon:1273404820325273673> Uptime:', value: `┕\`${getUptime(client.uptime)}\``, inline: true },
        { name: '<:djs:1274733473109639290> Discord.js', value: `┕\`${require('discord.js').version}\``, inline: true },
        { name: '<:Nodejs:1277804898863546389> Node.js', value: `┕\`${process.version}\``, inline: true },
        { name: '<:Cardboard:1274739734333362236> RAM', value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Add to Server](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Support Server](https://discord.gg/HKkHaqPNac)`, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Product Page](https://discord.com/application-directory/945037342605975643)`, inline: true })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor(DefaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    return message.channel.send({ embeds: [Botinfo] });
  }
}
