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

const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const { DefaultEmbedColor } = require('../../Config/Colors.js');

module.exports = {
  name: "ping",
  description: "Mostra o ping do bot e inclui um botão para atualizar.",
  category: "Global",
  usage: "h!ping",
  cooldown: 10,
  aliases: ['pong', 'latency'],
  
  async run(client, message) {
    // Função para calcular o API Ping real
    const calculateApiPing = async () => {
      const startTime = Date.now();
      await message.channel.sendTyping();
      return Date.now() - startTime;
    };
    
    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();
    const calculateGatewayPing = () => client.ws.ping;

    const createPingEmbed = async () => {
      const ping = calculateGatewayPing();
      const apiPing = await calculateApiPing();
      return new EmbedBuilder()
        .setAuthor({ name: `MEU PING É:`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`
          **Gateway Ping :** \`${ping} ms\`
          **API Ping :** \`${apiPing} ms\`
        `)
        .setColor(DefaultEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();
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

    collector.on('end', () => {
      sentMessage.edit({
        components: []
      });
    });
  }
};
