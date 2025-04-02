/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Fun/meme.js
 */

const { EmbedBuilder } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "meme",
  description: "Envia um meme aleatório.",
  category: "Fun",
  usage: `${defaultPrefix}meme`,
  aliases: ['memes', 'mem'],

  async run(client, message, args) {
    try {
      // Lista fixa de memes
      const memeList = [
        'https://i.imgur.com/IhO6XvM.jpg',
        'https://i.imgur.com/I1Cq83r.jpg',
        'https://i.imgur.com/xAkQ4Uo.jpg',
        'https://i.imgur.com/349k2p2.jpg',
        'https://i.imgur.com/V8P98rb.jpg',
      ];

      // Selecionar um meme aleatório
      const memer = memeList[Math.floor(Math.random() * memeList.length)];

      if (!memer) {
        const noMeme = new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription(`${message.author.toString()} Nenhum meme foi encontrado.`)
          .setColor(defaultEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp();

        return message.reply({ embeds: [noMeme] });
      }

      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Meme", iconURL: client.user.displayAvatarURL() })
        .setImage(memer)
        .setColor(defaultEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};
