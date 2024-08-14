/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * 
 * @INFORMAÇÕES_DO_BOT
 * Name | Hyouka
 * Description | Um bot de moderação e diversão para servidores do Discord.
 * 
 * @LINKS 
 * Repository | https://github.com/ricardo-as1/Hyouka.git
 * Support Server | https://discord.gg/QxQUZbv7df
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
  args: false,
  aliases: ['p'],
  permission: [],

  /**
   * @param {import('discord.js').Message} message
   * @param {string[]} args
   * @param {import('discord.js').Client} client
   * @param {string} prefix
   */
  
  run: async (client, message, args, prefix) => {
    // Função para calcular o API Ping
    const calculateApiPing = async () => {
      const start = Date.now();
      await message.channel.sendTyping(); // Simula uma ação de digitação
      return Date.now() - start;
    };

    // Função para calcular o Gateway Ping
    const calculateGatewayPing = async () => {
      const start = Date.now();
      const ping = client.ws.ping;
      const end = Date.now();
      return ping || end - start;
    };

    // Função para criar o embed com o Gateway Ping e API Ping
    const createPingEmbed = async () => {
      const apiPing = await calculateApiPing();
      const gatewayPing = await calculateGatewayPing();
      return new EmbedBuilder()
        .setTitle('<:ItemPong:1272932557113135114> **Meu ping é:**')
        .setDescription(`
          **Gateway Ping :** \`${gatewayPing}ms\`
          **API Ping :** \`${apiPing}ms\`
          `)
        .setColor(EmbedColor.defaultEmbedColor)
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();
    };

    // Função para criar a linha de ações com o botão
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

    // Envia a mensagem inicial com o embed e o botão
    const sentMessage = await message.channel.send({
      embeds: [await createPingEmbed()],
      components: [createActionRow()]
    });

    // Cria um coletor de interação para o botão
    const filter = i => i.customId === 'ping_refresh' && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 }); // 60 segundos

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
        components: [] // Remove os botões após o tempo limite
      });
    });
  }
};
