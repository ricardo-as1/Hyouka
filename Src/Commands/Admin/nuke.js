/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/nuke.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor, errorEmbedColor, warningEmbedColor } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "nuke",
  description: "(Perigo) Nuka um canal, criando uma cópia idêntica após a exclusão.",
  category: "Moderation",
  usage: `${defaultPrefix}nuke [motivo]`,
  aliases: ['renuke'],
  permission: ["ManageChannels"],

  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return message.channel.send({ embeds: [
        new EmbedBuilder()
          .setTitle("Erro de Permissão")
          .setColor(errorEmbedColor)
          .setDescription("Você precisa da permissão `Gerenciar Canais` para usar este comando.")
      ]});
    }

    if (!message.channel.deletable) {
      return message.channel.send({ embeds: [
        new EmbedBuilder()
          .setTitle("Erro ao Nuke")
          .setColor(warningEmbedColor)
          .setDescription("Este canal não pode ser excluído e recriado.")
      ]});
    }

    const reason = args.join(" ") || "Sem motivo especificado.";

    try {
      let newChannel = await message.channel.clone();
      await message.channel.delete();

      const embed = new EmbedBuilder()
        .setTitle("Canal Nukado")
        .setColor(defaultEmbedColor)
        .setDescription(`💥 O canal foi recriado com sucesso!
        **Motivo:** ${reason}`)
        .setImage('https://media0.giphy.com/media/oe33xf3B50fsc/200.gif')
        .setTimestamp();
      
      await newChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error(`Erro ao executar o comando nuke: ${error}`);
      message.channel.send({ embeds: [
        new EmbedBuilder()
          .setTitle("Erro ao Nukar")
          .setColor(errorEmbedColor)
          .setDescription("Ocorreu um erro ao tentar nukar o canal. Verifique minhas permissões e tente novamente.")
      ]});
    }
  }
};
