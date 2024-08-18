/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * @INFORMAÇÕES_DO_BOT
 * Name | Hyouka
 * Description | Um bot de moderação e diversão para servidores do Discord.
 * @LINKS 
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/QxQUZbv7df)
 */

/**
 * @type {import("../../Config/BaseCommands")}
 */

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const EmbedColor = require('../../Config/colors.js');
const { getPrefix } = require('../../Config/Database/database');
const defaultPrefix = require('../../Config/botconfig').default_prefix;

module.exports = {
  name: "botinfo",
  description: "Mostra as informações do bot.",
  category: "Global",
  usage: "h!botinfo",
  args: false,
  cooldown: 10,
  aliases: ['infobot', 'binfo', 'info'],
  permission: [],

  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
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
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses são indexados de 0 a 11
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();
    const currentPrefix = getPrefix(message.guild.id) || defaultPrefix;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `INFORMAÇÕES DO BOT`, iconURL: client.user.displayAvatarURL() })
      .addFields(
        { name: '<:Lootbox:1273392541319827469> Nome:', value: `\`${client.user.tag}\``, inline: true },
        { name: '<:Automod:1273403347122126960> ID:', value: `\`${client.user.id}\``, inline: true },
        { name: '<:Utilitysettings:1273392432977023087> Servidores:', value: `\`${client.guilds.cache.size} Servidores\``, inline: true },
        { name: '<:Bot:1273393738290434068> Criado em:', value: `\`${formatCreationDate(client.user.createdAt)}\``, inline: true },
        { name: '<:Developer:1273392334956007477> Prefixo:', value: `\`${currentPrefix}\``, inline: true },
        { name: '<:Diamon:1273404820325273673> Uptime:', value: `\`${formatUptime(client.uptime)}\``, inline: true })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor(EmbedColor.defaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Adicionar o Bot')
          .setEmoji('<:link:1272933854260367483>')
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          .setStyle(ButtonStyle.Link)
      );

    return message.channel.send({ embeds: [embed], components: [row] });
  }
}
