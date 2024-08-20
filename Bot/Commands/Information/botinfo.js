/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

/**
 * @type {import("../../Config/BaseCommands.js")}
 */

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getPrefix } = require('../../Config/Database/database.js');
const EmbedColor = require('../../Config/colors.js');
const defaultPrefix = require('../../Config/botconfig.js').default_prefix;

module.exports = {
  name: "botinfo",
  description: "Mostra as informações do bot.",
  category: "Information",
  usage: "h!botinfo",
  cooldown: 10,
  aliases: ['infobot', 'binfo', 'info'],

  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
   * @param {Array<string>} args
   */

  run: async (client, message) => {

    function formatUptime(uptime) {
      const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
      const hours = Math.floor((uptime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((uptime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((uptime % (60 * 1000)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function formatCreationDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();
    const currentPrefix = getPrefix(message.guild.id) || defaultPrefix;

    const Botinfo = new EmbedBuilder()
      .setAuthor({ name: `INFORMAÇÕES DO BOT`, iconURL: client.user.displayAvatarURL() })
      .addFields(
        { name: '<:Lootbox:1273392541319827469> Nome:', value: `┕\`${client.user.username}\``, inline: true },
        { name: '<:Automod:1273403347122126960> Users:', value: `┕\`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\``, inline: true },
        { name: '<:Utilitysettings:1273392432977023087> Servidores:', value: `┕\`${client.guilds.cache.size}\``, inline: true },
        { name: '<:Bot:1273393738290434068> Criado em:', value: `┕\`${formatCreationDate(client.user.createdAt)}\``, inline: true },
        { name: '<:Developer:1273392334956007477> Prefixo:', value: `┕\`${currentPrefix}\``, inline: true },
        { name: '<:Diamon:1273404820325273673> Uptime:', value: `┕\`${formatUptime(client.uptime)}\``, inline: true },
        { name: '<:djs:1274733473109639290> Discord.js', value: `┕\`${require('discord.js').version}\``, inline: true },
        { name: '<:nodejs:1274733514335719475> Node.js', value: `┕\`${process.version}\``, inline: true },
        { name: '<:Cardboard:1274739734333362236> RAM', value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Add to Server](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Support Server](https://discord.gg/HKkHaqPNac)`, inline: true },
        { name: ' ', value: `<:Online:1272932938929012847>  [Product Page](https://discord.com/application-directory/945037342605975643)`, inline: true })

      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor(EmbedColor.defaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    return message.channel.send({ embeds: [Botinfo] });
  }
}
