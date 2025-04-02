/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Information/ping.js
 */

const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "ping",
  description: "Mostra o ping do bot e inclui um botão para atualizar.",
  category: "Global",
  usage: `${defaultPrefix}ping`,
  aliases: ['pong', 'latency'],
  permission: [],

  async run(client, message) {
    // Função para calcular o API Ping real
    const calculateApiPing = async () => {
      const startTime = Date.now();
      await message.channel.sendTyping();  // Simula o envio de uma mensagem para calcular o tempo de resposta
      return Date.now() - startTime;
    };

    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();  // Fallback para avatar do bot
    const calculateGatewayPing = () => client.ws.ping;  // Ping da gateway do Discord

    // Função para criar o embed com os resultados do ping
    const createPingEmbed = async () => {
      const ping = calculateGatewayPing();
      const apiPing = await calculateApiPing();
      return new EmbedBuilder()
        .setAuthor({ name: `MEU PING É:`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`
          **Gateway Ping :** \`${ping} ms\`
          **API Ping :** \`${apiPing} ms\`
        `)
        .setColor(defaultEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp();
    };

    // Função para criar o botão de atualização
    const createActionRow = () => {
      return new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('ping_refresh')
            .setLabel('Atualizar')
            .setEmoji('<a:Load:1273063236354179072>') // Emoji de loading
            .setStyle('Secondary')
        );
    };

    // Envia a mensagem inicial com o ping e o botão
    const sentMessage = await message.channel.send({
      embeds: [await createPingEmbed()],
      components: [createActionRow()]
    });

    // Filtro para garantir que apenas o autor da mensagem pode clicar no botão
    const filter = i => i.customId === 'ping_refresh' && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
      await interaction.deferUpdate(); // Deferir a atualização enquanto carrega o novo ping
      const updatedEmbed = await createPingEmbed();

      await sentMessage.edit({
        embeds: [updatedEmbed],
        components: [createActionRow()]
      });
    });

    // Quando o collector terminar, remove os botões
    collector.on('end', () => {
      sentMessage.edit({
        components: []
      });
    });
  }
};