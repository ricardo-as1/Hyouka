/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Fun/meme.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require('discord.js');
const EmbedColor = require('../../Config/Colors.js');

module.exports = {
  name: "meme",
  description: "Envia um meme aleatório.",
  category: "Fun",
  usage: "h!meme",
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
          .setColor(EmbedColor.ErrorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp();

        return message.channel.send({ embeds: [noMeme] });
      }

      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Meme", iconURL: client.user.displayAvatarURL() })
        .setImage(memer)
        .setColor(EmbedColor.DefaultEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};
