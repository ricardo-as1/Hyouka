/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Information/help.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor } } = require('../../ConfigHub/System.js');
const path = require('path');
const fs = require('fs');

const CMDS_PER_PAGE = 5;
const IDLE_TIMEOUT = 60;

module.exports = {
  name: "help",
  description: "Mostra uma lista de comandos.",
  category: "Global",
  usage: `${defaultPrefix}help`,
  aliases: ["ajuda"],

  async run(client, message) {
    const commands = loadCommands();
    const categories = Object.keys(commands);

    if (categories.length === 0) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Nenhuma categoria encontrada")
            .setDescription("Não há comandos carregados no momento.")
            .setColor(defaultEmbedColor),
        ],
      });
    }

    const embed = createBotInfoEmbed(client, message.author, defaultPrefix);

    const options = categories.map(category => ({
      label: category,
      value: category.toLowerCase(),
      description: `➡️ Veja os comandos da categoria ${category}.`,
    }));

    const menuRow = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("help-menu")
        .setPlaceholder("📂 Veja aqui meu repertorio de comandos!")
        .addOptions(options)
    );

    const buttonsRow = createButtonsRow();

    const sentMsg = await message.channel.send({
      embeds: [embed],
      components: [menuRow, buttonsRow],
    });

    waiter(sentMsg, message.author.id, commands, defaultPrefix);
  },
};

const createBotInfoEmbed = (client, user, prefix) => {
  const guildIconURL = user.guild ? user.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL();

  return new EmbedBuilder()
    .setAuthor({ name: "Hyouka - Lista de Comandos", iconURL: client.user.displayAvatarURL() })
    .setColor(defaultEmbedColor)
    .setDescription(
      `<a:Load:1273063236354179072> Olá ${user}, estou aqui para te ajudar.\n\n` +
      `> **Sou um bot de moderação, diversão e utilitários.**\n` +
      `> **Posso ajudá-lo a construir um Super servidor e a torná-lo mais divertido.**\n\n` +
      `<a:Load:1273063236354179072> **BOT INFO**\n` +
      `> <:Developer:1273392334956007477> Prefix: \`${prefix}\`\n` +
      `> <:djs:1274733473109639290> Discord.js Version: \`${require("discord.js").version}\`\n` +
      `> <:Nodejs:1277804898863546389> Running On: \`${process.version}\`\n` +
      `> <:IconCrown:1272932786931765298> Criado por: [@ricardo-as1](https://github.com/ricardo-as1)`
    )
    .setImage("https://share.creavite.co/66cd2dcbce0e5d041d7b5f6e.gif")
    .addFields([
      {
        name: "__**<a:Load:1273063236354179072> Features [1-5]**__",
        value:
          "> <:MarkNumber_1:1272932141100957706> Admin\n" +
          "> <:MarkNumber_2:1272932155416383509> Automod\n" +
          "> <:MarkNumber_3:1272932171018932255> Moderation\n" +
          "> <:MarkNumber_4:1272932184382246973> Owner\n" +
          "> <:MarkNumber_5:1272932196600123547> Ticket",
        inline: true,
      },
      {
        name: "__**<a:Load:1273063236354179072> Features [6-10]**__",
        value:
          "> <:MarkNumber_6:1272932211888357386> Utility\n" +
          "> <:MarkNumber_7:1272932223737397389> Fun\n" +
          "> <:MarkNumber_8:1272932234411901042> Invite\n" +
          "> <:MarkNumber_9:1272932245853704202> Social\n" +
          "> <:MarkNumber10:1272932257652281487> Information",
        inline: true,
      },
    ])
    .setFooter({ text: user.guild ? user.guild.name : "Mensagem Direta", iconURL: guildIconURL })
    .setTimestamp();
};

const createButtonsRow = () => {
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

  return new ActionRowBuilder().addComponents([supportButton, inviteButton]);
};

const waiter = (msg, userId, commands, prefix) => {
  let currentPage = 0; // Página inicial
  let selectedCategory = null; // Categoria selecionada inicialmente

  const collector = msg.createMessageComponentCollector({
    filter: (interaction) => interaction.user.id === userId && msg.id === interaction.message.id,
    idle: IDLE_TIMEOUT * 6000,
  });

  collector.on("collect", async (interaction) => {
    if (interaction.customId === "help-menu") {
      const selectedValue = interaction.values[0];
      selectedCategory = selectedValue;

      const categoryCommands = commands[selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)];

      if (!categoryCommands) {
        return interaction.reply({
          content: "Categoria inválida ou sem comandos disponíveis.",
          ephemeral: true,
        });
      }

      const embeds = createCategoryEmbeds(categoryCommands, currentPage, prefix);

      const navigationButtonsRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("⬅️ Página Anterior")
          .setStyle(ButtonStyle.Success)
          .setCustomId("previous-page")
          .setDisabled(currentPage === 0),
        new ButtonBuilder()
          .setLabel("➡️ Próxima Página")
          .setStyle(ButtonStyle.Success)
          .setCustomId("next-page")
          .setDisabled(currentPage === Math.ceil(categoryCommands.length / CMDS_PER_PAGE) - 1)
      );

      const menuRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help-menu")
          .setEmoji("<:8319folder:1282495585253068800>")
          .setPlaceholder("Veja aqui meu repertorio de comandos!")
          .addOptions(
            Object.keys(commands).map(category => ({
              label: category,
              value: category.toLowerCase(),
              description: `Veja os comandos da categoria ${category}.`,
            }))
          )
      );

      await interaction.update({
        embeds,
        components: [menuRow, navigationButtonsRow],
      });
    } else if (interaction.customId === "previous-page" || interaction.customId === "next-page") {
      if (interaction.customId === "previous-page") currentPage--;
      if (interaction.customId === "next-page") currentPage++;

      const categoryCommands = commands[selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)];

      if (!categoryCommands) return;

      const embeds = createCategoryEmbeds(categoryCommands, currentPage, prefix);

      const navigationButtonsRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("⬅️ Página Anterior")
          .setStyle(ButtonStyle.Success)
          .setCustomId("previous-page")
          .setDisabled(currentPage === 0),
        new ButtonBuilder()
          .setLabel("➡️ Próxima Página")
          .setStyle(ButtonStyle.Success)
          .setCustomId("next-page")
          .setDisabled(currentPage === Math.ceil(categoryCommands.length / CMDS_PER_PAGE) - 1)
      );

      const menuRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help-menu")
          .setEmoji("<:8319folder:1282495585253068800>")
          .setPlaceholder("Veja aqui meu repertorio de comandos!")
          .addOptions(
            Object.keys(commands).map(category => ({
              label: category,
              value: category.toLowerCase(),
              description: `Veja os comandos da categoria ${category}.`,
            }))
          )
      );

      await interaction.update({
        embeds,
        components: [menuRow, navigationButtonsRow],
      });
    }
  });

  collector.on("end", () => {
    if (msg.editable) {
      msg.edit({
        components: [],
      });
    }
  });
};

function loadCommands() {
  const commandsPath = path.join(__dirname, '../../Commands');
  const categories = fs.readdirSync(commandsPath);
  const commands = {};

  categories.forEach((category) => {
    const categoryPath = path.join(commandsPath, category);
    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));
    commands[category] = files.map(file => {
      try {
        const command = require(path.join(categoryPath, file));
        return {
          name: command.name || "Sem nome",
          description: command.description || "Sem descrição",
          usage: command.usage || "Sem uso definido",
          aliases: command.aliases || [],
        };
      } catch (err) {
        console.error(`Erro ao carregar o comando '${file}' na categoria '${category}':`, err);
        return null;
      }
    }).filter(cmd => cmd); // Remove comandos inválidos
  });

  return commands;
}

const createCategoryEmbeds = (commands = [], page, prefix) => {
  if (!Array.isArray(commands) || commands.length === 0) {
    return [
      new EmbedBuilder()
        .setTitle("Nenhum comando encontrado")
        .setDescription("Não foi possível encontrar comandos para essa categoria.")
        .setColor(defaultEmbedColor),
    ];
  }

  const currentCommands = commands.slice(page * CMDS_PER_PAGE, (page + 1) * CMDS_PER_PAGE);
  const embed = new EmbedBuilder()
    .setTitle(`Comandos - Página ${page + 1}/${Math.ceil(commands.length / CMDS_PER_PAGE)}`)
    .setColor(defaultEmbedColor)
    .setDescription(
      currentCommands
        .map(cmd =>
          `**Nome:** \`${cmd.name}\`
        **Descrição:** \`${cmd.description || "Sem descrição"}\`
        **Uso:** \`${cmd.usage || "N/A"}\`
        **Aliases:** \`${cmd.aliases.length > 0 ? cmd.aliases.join(", ") : "Nenhum"}\`
      `)
        .join("\n"))
    .setFooter({ text: `Página ${page + 1}/${Math.ceil(commands.length / CMDS_PER_PAGE)}` });
  return [embed];
};