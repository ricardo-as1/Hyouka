/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Information/botinfo.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require('discord.js');
const { getUptime } = require('../../ConfigHub/TimeString.js');
const { getPrefix } = require('../../Database/DataBase.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "botinfo",
  description: "Mostra as informações do bot.",
  category: "Global",
  usage: `${defaultPrefix}botinfo`,
  aliases: ['botinf', 'binfo', 'info', 'stats'],

  async run(client, message) {
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    const Botinfo = new EmbedBuilder()
      .setAuthor({ name: `INFORMAÇÕES DO BOT`, iconURL: client.user.displayAvatarURL() })
      .addFields(
        { name: '<:Bot:1273393738290434068> Nome:', value: `┕\`${client.user.username}\``, inline: true },
        { name: '<:siri_users:1311037744356659221> Users:', value: `┕\`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\``, inline: true },
        { name: '<:Utilitysettings:1273392432977023087> Servidores:', value: `┕\`${client.guilds.cache.size}\``, inline: true },
        { name: '<:bot_green:1311037561044598895> Criado em:', value: `┕\`${client.user.createdAt.toLocaleDateString('pt-BR')}\``, inline: true },
        { name: '<:Developer:1273392334956007477> Prefixo:', value: `┕\`${await getPrefix(client) || defaultPrefix}\``, inline: true },
        { name: '<a:uptime:1311037317657526312> Uptime:', value: `┕\`${getUptime(client.uptime)}\``, inline: true },
        { name: '<:djs:1274733473109639290> Discord.js', value: `┕\`${require('discord.js').version}\``, inline: true },
        { name: '<:Nodejs:1277804898863546389> Node.js', value: `┕\`${process.version}\``, inline: true },
        { name: '<:RAM2:1311037593378361434> RAM', value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Add to Server](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Support Server](https://discord.gg/HKkHaqPNac)`, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Product Page](https://discord.com/application-directory/945037342605975643)`, inline: true })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor(defaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    return message.channel.send({ embeds: [Botinfo] });
  }
}
