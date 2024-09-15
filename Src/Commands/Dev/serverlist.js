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

const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { IdOwner } = require('../../Config/BotConfig.js');
const { DefaultEmbedColor } = require('../../Config/Colors.js');

module.exports = {
  name: "serverlist",
  aliases: ["serverlist"],
  description: "Mostra uma lista de todos os meus servidores.",
  category: "Owner",
  usage: "serverlist",
  cooldown: 10,
  
  async run(client, message, args) {
    if (!IdOwner.includes(message.author.id)) {
      const usagerr = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setColor(DefaultEmbedColor)
        .setDescription(`<:fechar:918747498984665108> | Ops, apenas meus desenvolvedores podem utilizar este comando!`)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      return message.reply({ embeds: [usagerr] });
    }

    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let sortedGuilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(r => r);
    let currentPageGuilds = sortedGuilds.slice(i0, i1);

    const updateButtons = () => {
      const buttons = [
        new ButtonBuilder()
          .setEmoji('<:Next:1284003013626822687>')
          .setStyle('Primary')
          .setCustomId('nextPage')
      ];

      if (page > 1) {
        buttons.unshift(
          new ButtonBuilder()
            .setEmoji('<:Left:1284003030827798630>')
            .setStyle('Primary')
            .setCustomId('prevPage')
        );
      }

      return new ActionRowBuilder().addComponents(buttons);
    };

    const formatGuildList = async (guilds, page, totalGuilds) => {
      let description = `**Página:** \`${page}/${Math.ceil(totalGuilds / 10)}\`\n\n`;
      for (const [index, guild] of guilds.entries()) {
        const owner = await guild.fetchOwner();
        description += `**<:Info:1278859604587184246> ${index + 1}º | ${guild.name}**\n`
          + `**ID:** \`${guild.id}\`\n`
          + `**Total de Membros:** \`${guild.memberCount}\` **Membros**\n`
          + `**Nome do Dono:** ${owner.user.tag}\n`
          + `**ID do Dono:** \`${owner.id}\`\n\n`;
      }
      return description;
    };

    const embed = new EmbedBuilder()
      .setTitle(`Lista de Servidores`)
      .setColor(DefaultEmbedColor)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(await formatGuildList(currentPageGuilds, page, sortedGuilds.length))
      .setFooter({ text: `Página ${page}/${Math.ceil(sortedGuilds.length / 10)}`, iconURL: client.user.displayAvatarURL() })
      .setTimestamp();

    const msg = await message.reply({ embeds: [embed], components: [updateButtons()] });

    const filter = interaction => interaction.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter });

    collector.on('collect', async interaction => {
      if (interaction.customId === 'nextPage') {
        i0 += 10;
        i1 += 10;
        page += 1;

        const nextPageGuilds = sortedGuilds.slice(i0, i1);
        const updatedEmbed = new EmbedBuilder()
          .setTitle(`Lista de Servidores`)
          .setColor(DefaultEmbedColor)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setDescription(await formatGuildList(nextPageGuilds, page, sortedGuilds.length))
          .setFooter({ text: `Página ${page}/${Math.ceil(sortedGuilds.length / 10)}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp();

        await interaction.update({
          embeds: [updatedEmbed],
          components: [updateButtons()]
        });
      } else if (interaction.customId === 'prevPage') {
        i0 -= 10;
        i1 -= 10;
        page -= 1;

        const prevPageGuilds = sortedGuilds.slice(i0, i1);
        const updatedEmbed = new EmbedBuilder()
          .setTitle(`Lista de Servidores`)
          .setColor(DefaultEmbedColor)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setDescription(await formatGuildList(prevPageGuilds, page, sortedGuilds.length))
          .setFooter({ text: `Página ${page}/${Math.ceil(sortedGuilds.length / 10)}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp();

        await interaction.update({
          embeds: [updatedEmbed],
          components: [updateButtons()]
        });
      }
    });
  }
};
