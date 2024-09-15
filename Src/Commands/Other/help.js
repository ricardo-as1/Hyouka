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

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { DefaultEmbedColor } = require('../../Config/Colors.js');
const { default_prefix } = require("../../Config/BotConfig.js");

const CMDS_PER_PAGE = 5;
const IDLE_TIMEOUT = 30;

module.exports = {
  name: "help",
  description: "Mostra uma lista de comandos.",
  category: "Global",
  usage: "help",
  cooldown: 10,
  aliases: ["ajuda"],

  async run(client, message) {

    const guildIconURL = message.guild?.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Lista de Comandos", iconURL: client.user.displayAvatarURL() })
      .setColor(DefaultEmbedColor)
      .setImage(`https://share.creavite.co/66cd2dcbce0e5d041d7b5f6e.gif`)
      .addFields([
        {
          name: "__**<a:Load:1273063236354179072> Features [1-5]**__",
          value: `>>> <:MarkNumber_1:1272932141100957706> Admin 
                <:MarkNumber_2:1272932155416383509> Automod 
                <:MarkNumber_3:1272932171018932255> Moderation 
                <:MarkNumber_4:1272932184382246973> Owner 
                <:MarkNumber_5:1272932196600123547> Ticket`,
          inline: true
        },
        {
          name: "__**<a:Load:1273063236354179072> Features [6-10]**__",
          value: `>>> <:MarkNumber_6:1272932211888357386> Utility
                <:MarkNumber_7:1272932223737397389> Fun 
                <:MarkNumber_8:1272932234411901042> Invite 
                <:MarkNumber_9:1272932245853704202> Social 
                <:MarkNumber10:1272932257652281487> Information`,
          inline: true
        }
      ])
      .setDescription(`<a:Load:1273063236354179072> Olá ${message.author}, estou aqui para te ajudar. 
                     > **Sou um bot de moderação, diversão e utilitários.** 
                     > **Posso ajudá-lo a construir um Super servidor e a torná-lo mais divertido.**

                    <a:Load:1273063236354179072> **BOT INFO**
                     > <:Developer:1273392334956007477> Prefix: \`${default_prefix}\`
                     > <:djs:1274733473109639290> Discord.js Version: \`v${(require("discord.js").version)}\`
                     > <:Nodejs:1277804898863546389> Running On: \`Node ${process.version}\`
                     > <:IconCrown:1272932786931765298> Criado por: [@ricardo-as1](https://github.com/ricardo-as1)`)

      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp();

    // Adiciona os botões de suporte, invite e voto
    const supportButton = new ButtonBuilder()
      .setLabel("Support Server")
      .setEmoji('1273392456125386883')
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.gg/HKkHaqPNac");

    const inviteButton = new ButtonBuilder()
      .setLabel("Invite Me")
      .setStyle(ButtonStyle.Link)
      .setEmoji('1273392541319827469')
      .setURL("https://discord.com/api/oauth2/authorize?client_id=123456789&permissions=8&scope=bot+applications.commands");

    /*     const voteButton = new ButtonBuilder()
          .setLabel("Vote Me")
          .setStyle(ButtonStyle.Link)
          .setEmoji('1273392541319827469')
          .setURL(""); */

    const buttonsRow = new ActionRowBuilder().addComponents([supportButton, inviteButton/* voteButton */]);

    const options = [
      {
        label: "Administração",
        value: "admin",
        description: "Comandos de administração.",
        emoji: '1273392541319827469',
      },
      {
        label: "Global",
        value: "global",
        description: "Comandos úteis para várias finalidades.",
        emoji: '1273392541319827469',
      },
      {
        label: "Owner",
        value: "owner",
        description: "Comandos do dono do bot.",
        emoji: '1273392541319827469',
      },
    ];

    const menuRow = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("help-menu")
        .setPlaceholder("Escolha a categoria")
        .addOptions(options)
    );

    const sentMsg = await message.channel.send({
      embeds: [embed],
      components: [menuRow, buttonsRow]
    });

    waiter(sentMsg, message.author.id, "h!");  // Ajuste o prefixo conforme necessário
  }
};

const waiter = (msg, userId, prefix) => {
  const collector = msg.channel.createMessageComponentCollector({
    filter: (reactor) => reactor.user.id === userId && msg.id === reactor.message.id,
    idle: IDLE_TIMEOUT * 1000,
    dispose: true,
    time: 10 * 60 * 1000,
  });

  let arrEmbeds = [];
  let currentPage = 0;
  let menuRow = msg.components[0];
  let buttonsRow = msg.components[1];

  collector.on("collect", async (response) => {
    if (!["help-menu", "previousBtn", "nextBtn"].includes(response.customId)) return;
    await response.deferUpdate();

    switch (response.customId) {
      case "help-menu": {
        const cat = response.values[0].toUpperCase();
        arrEmbeds = getCategoryEmbeds(cat, prefix);
        currentPage = 0;

        let components = [];
        buttonsRow.components.forEach((button) =>
          components.push(ButtonBuilder.from(button).setDisabled(arrEmbeds.length > 1 ? false : true))
        );

        buttonsRow = new ActionRowBuilder().addComponents(components);
        msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        break;
      }

      case "previousBtn":
        if (currentPage !== 0) {
          --currentPage;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        }
        break;

      case "nextBtn":
        if (currentPage < arrEmbeds.length - 1) {
          currentPage++;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        }
        break;
    }
  });

  collector.on("end", () => {
    if (!msg.guild || !msg.channel) return;
    return msg.editable && msg.edit({ components: [] });
  });
};

function getCategoryEmbeds(category, prefix) {
  let commands = [];
  switch (category) {
    case "ADMIN":
      commands = [
        { name: `${prefix}addrole`, description: "Adiciona um cargo à um membro.", usage: `${prefix}addrole [@membro] [@cargo]` },
        { name: `${prefix}clear`, description: "Limpa uma quantidade de mensagens do chat.", usage: `${prefix}clear [quantidade]` },
        { name: `${prefix}config`, description: "Configura o bot.", usage: `${prefix}config` },
        { name: `${prefix}setprefix`, description: "Define um novo prefixo para o bot.", usage: `${prefix}setprefix [prefixo]` },
        { name: `${prefix}resetprefix`, description: "Reseta o prefixo do bot.", usage: `${prefix}resetprefix` },
      ];
      break;
    case "GLOBAL":
      commands = [
        { name: `${prefix}botinfo`, description: "Mostra informações sobre o bot.", usage: `${prefix}botinfo` },
        { name: `${prefix}ping`, description: "Mostra o ping do bot e inclui um botão para atualizar.", usage: `${prefix}ping` },
        { name: `${prefix}avatar`, description: "Mostra o avatar de um membro.", usage: `${prefix}avatar [@membro]` },
      ];
      break;
    case "OWNER":
      commands = [
        { name: `${prefix}test`, description: "Testa algum comando do bot.", usage: `${prefix}test` },
      ]
    // Adicione mais categorias conforme necessário
  }

  const size = commands.length;
  const maxPages = Math.ceil(size / CMDS_PER_PAGE);

  const arrEmbeds = [];
  for (let i = 0; i < maxPages; i++) {
    const current = commands.slice(i * CMDS_PER_PAGE, (i + 1) * CMDS_PER_PAGE);
    const embed = new EmbedBuilder()
      .setTitle(`Comandos - ${category}`)
      .setColor(DefaultEmbedColor)
      .setDescription(
        current.map(cmd => `
        <a:Discord:1275618727467028500> __**Nome:**__ \`${cmd.name}\`
        <:Automod:1273403347122126960> __**Descricão:**__ ${cmd.description}
        <:Utilitysettings:1273392432977023087> __**Como usar:**__ \`${cmd.usage}\``).join("\n"))
      .setFooter({ text: `Página ${i + 1} de ${maxPages}` });

    arrEmbeds.push(embed);
  }

  return arrEmbeds;
}
