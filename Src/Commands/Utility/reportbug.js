/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Information/reportbug.js
 */

const { EmbedBuilder } = require("discord.js");
const { Sync: { defaultPrefix }, Logs: { reportbugChannel }, Colors: { warningEmbedColor, defaultEmbedColor } } = require("../../ConfigHub/System.js");

module.exports = {
  name: "reportbug",
  description: "Reporte um bug ao desenvolvedor.",
  category: "Information",
  usage: `${defaultPrefix}reportbug`,
  permission: [],

  run: async (client, message, args) => {
    // 1. Solicitar o nome do comando onde o bug ocorreu
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

      // Se o nome do comando for vazio, informe o erro
      if (!commandName) {
        return message.reply("⚠️ Você precisa fornecer o nome do comando.");
      }

      // 2. Após coletar o nome do comando, solicitar o erro específico
      const askBugReport = new EmbedBuilder()
        .setTitle("🛠️ Reporte de Bug")
        .setDescription("Agora, por favor, informe o **erro que ocorreu** (detalhe o erro).")
        .setColor(warningEmbedColor)
        .setFooter({ text: message.guild ? message.guild.name : "DM", iconURL: message.guild?.iconURL({ dynamic: true }) || null })
        .setTimestamp();

      await message.reply({ embeds: [askBugReport] });

      // Coletar a mensagem do erro
      const responseCollector = message.channel.createMessageCollector({
        filter: m => m.author.id === message.author.id,
        time: 60000
      });

      responseCollector.on('collect', async userErrorMessage => {
        const bugReport = userErrorMessage.content || "Nenhum erro especificado.";

        // 3. Criar o embed com as informações coletadas
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

        // Enviar a resposta ao usuário
        await message.reply({ embeds: [embed] });

        // Enviar o report para o canal configurado
        const reportChannel = client.channels.cache.get(reportbugChannel);
        if (reportChannel) {
          reportChannel.send({ embeds: [embed] }).catch(console.error);
        } else {
          message.reply("⚠️ O canal de report de bugs não foi encontrado.");
        }

        // Limpar a mensagem do erro
        userErrorMessage.delete().catch(() => { });
        responseCollector.stop();
      });

      // Para garantir que o comando de nome foi fornecido corretamente
      collector.stop();
    });
  }
};
