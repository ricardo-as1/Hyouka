/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

/**
 * @type {import("../../Config/BaseCommands")}
 */

const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const EmbedColor = require('../../Config/colors.js');

module.exports = {
  name: "ping",
  description: "Mostra o ping do bot e inclui um botão para atualizar.",
  category: "Global",
  usage: "h!ping",
  cooldown: 10,
  aliases: ['pong', 'latency'],

  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
   * @param {Array<string>} args
   */
  
  run: async (client, message) => {
    const calculateApiPing = async () => {
      const start = Date.now();
      // await message.channel.sendTyping(); // Simula uma ação de digitação
      return Date.now() - start;
    };

    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();
    const calculateGatewayPing = async () => {
      const start = Date.now();
      const ping = client.ws.ping;
      const end = Date.now();
      return ping || end - start;
    };

    const createPingEmbed = async () => {
      const apiPing = await calculateApiPing();
      const gatewayPing = await calculateGatewayPing();
      return new EmbedBuilder()
        .setAuthor({ name: `MEU PING É:`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`
          **Gateway Ping :** \`${gatewayPing}ms\`
          **API Ping :** \`${apiPing}ms\`
          `)
        .setColor(EmbedColor.defaultEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()
    };

    const createActionRow = () => {
      return new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('ping_refresh')
            .setLabel('Atualizar')
            .setEmoji('<a:Load:1273063236354179072>')
            .setStyle('Primary')
        );
    };

    const sentMessage = await message.channel.send({
      embeds: [await createPingEmbed()],
      components: [createActionRow()]
    });

    const filter = i => i.customId === 'ping_refresh' && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
      await interaction.deferUpdate();
      const updatedEmbed = await createPingEmbed();
      
      await sentMessage.edit({
        embeds: [updatedEmbed],
        components: [createActionRow()]
      });
    });

    collector.on('end', collected => {
      sentMessage.edit({
        components: []
      });
    });
  }
};
