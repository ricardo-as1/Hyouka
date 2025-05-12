/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Information/reportbug.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder } = require("discord.js");
const { Sync: { defaultPrefix }, Colors: { warningEmbedColor, defaultEmbedColor }, GuildSettings: { Logs: { reportbugChannel } } } = require("../../ConfigHub/System.js");

module.exports = {
  name: "reportbug",
  description: "Reporte um bug ao desenvolvedor.",
  category: "Information",
  usage: `${defaultPrefix}reportbug`,
  permission: [],

  async run(client, message) {
    const askCommandName = new EmbedBuilder()
      .setTitle("🚨 Reporte de Bug")
      .setDescription("Por favor, informe o **nome do comando** onde ocorreu o bug.")
      .setColor(warningEmbedColor)
      .setFooter({ text: message.guild ? message.guild.name : "DM", iconURL: message.guild?.iconURL({ dynamic: true }) || null })
      .setTimestamp();

    await message.reply({ embeds: [askCommandName] });

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 60000 });

    collector.on('collect', async userMessage => {
      const commandName = userMessage.content;

      if (!commandName) {
        return message.reply("⚠️ Você precisa fornecer o nome do comando.");
      }

      const askBugReport = new EmbedBuilder()
        .setTitle("🛠️ Reporte de Bug")
        .setDescription("Agora, por favor, informe o **erro que ocorreu** (detalhe o erro).")
        .setColor(warningEmbedColor)
        .setFooter({ text: message.guild ? message.guild.name : "DM", iconURL: message.guild?.iconURL({ dynamic: true }) || null })
        .setTimestamp();

      await message.reply({ embeds: [askBugReport] });

      const responseCollector = message.channel.createMessageCollector({
        filter: m => m.author.id === message.author.id,
        time: 60000
      });

      responseCollector.on('collect', async userErrorMessage => {
        const bugReport = userErrorMessage.content || "Nenhum erro especificado.";

        const embed = new EmbedBuilder()
          .setTitle("🛠️ Bug!")
          .setDescription("Obrigado por ajudar a melhorar o bot!")
          .setColor(defaultEmbedColor)
          .addFields(
            { name: "Nome do comando:", value: `\`\`\`${commandName}\`\`\`` },
            { name: "Bug Reportado:", value: `\`\`\`diff\n- ${bugReport}\`\`\`` },
          )
          .setThumbnail("https://media.stickerswiki.app/mrincrediblememe/1102632.512.webp")
          .setFooter({
            text: `${message.guild ? message.guild.name : "DM"} | Reportado por: ${message.author.tag}`,
            iconURL: message.guild?.iconURL({ dynamic: true }) || null
          })
          .setTimestamp();

        await message.reply({ embeds: [embed] });

        const reportChannel = client.channels.cache.get(reportbugChannel);
        if (reportChannel) {
          reportChannel.send({ embeds: [embed] }).catch(console.error);
        } else {
          message.reply("⚠️ O canal de report de bugs não foi encontrado.");
        }

        userErrorMessage.delete().catch(() => { });
        responseCollector.stop();
      });

      collector.stop();
    });
  }
};
