/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Fun/coinflip.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
    name: 'coinflip',
    description: 'Jogue uma moeda e veja o resultado!',
    category: 'Games',
    usage: `${defaultPrefix}coinflip`,
    aliases: ['flip', 'moeda'],

    async run(client, message) {
        const choices = ['Cara', 'Coroa'];
        const choice = choices[Math.floor(Math.random() * choices.length)];

        const embed = new EmbedBuilder()
            .setTitle('\uD83C\uDFB2 Coinflip!')
            .setColor(defaultEmbedColor)
            .setDescription(`Você jogou a moeda e caiu **${choice}**!`)
            .setTimestamp();

        return message.channel.send({ embeds: [embed] });
    }
};
