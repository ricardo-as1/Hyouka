const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { errorEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
    name: 'drake',
    description: 'Gera um meme do Drake usando dois textos.',
    category: 'Fun',
    usage: `${defaultPrefix}drake <texto1> / <texto2>`,
    aliases: ['drakepost'],

    async run(client, message, args) {
      const input = args.join(' ').split('/');
      const text1 = input[0]?.trim();
      const text2 = input[1]?.trim();
      
      if (!text1 || !text2) {
          const errorEmbed = new EmbedBuilder()
              .setTitle('Erro ao gerar meme')
              .setColor(errorEmbedColor)
              .setDescription('Você precisa fornecer dois textos separados por `/`.')
              .setTimestamp();
          
          return message.channel.send({ embeds: [errorEmbed] });
      }

      const imageUrl = `https://api.memegen.link/images/drake/${encodeURIComponent(text1)}/${encodeURIComponent(text2)}.png`;
      const attachment = new AttachmentBuilder(imageUrl, { name: 'drake.png' });

      return message.channel.send({ files: [attachment] });
  }
};
