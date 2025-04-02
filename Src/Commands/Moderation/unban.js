/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/unban.js
 */

/**
 * Comando para remover o banimento de um usuário.
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor, errorEmbedColor }, Logs: { unbanChannel } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "unban",
  description: "Remove o banimento de um usuário do servidor.",
  category: "Moderation",
  usage: `${defaultPrefix}unban <userID> [reason]`,
  aliases: ['desbanir'],
  permission: ["BanMembers"],

  async run(client, message, args) {

    // Verifica se o membro tem permissão de BAN_MEMBERS
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Moderador para usar este comando!**`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    // Verifica se o userID foi fornecido e é válido
    const userID = args[0];
    const reason = args.slice(1).join(" ") || "Sem motivo fornecido";

    if (!userID || isNaN(userID)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Por favor, forneca um ID de usuário válido.**`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    try {
      // Verifica se o usuário está banido
      const bans = await message.guild.bans.fetch();
      const bannedUser = bans.get(userID);

      if (!bannedUser) {
        const embed = new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
          .setDescription(`**<:CheckIncorrect:1272975727821590561> O usuário com o ID \`${userID}\` não está banido!**`)
          .setColor(errorEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
          .setTimestamp()

        return message.channel.send({ embeds: [embed] });
      }

      // Remove o banimento
      await message.guild.members.unban(userID, reason);

      // Envia a notificação ao usuário desbanido
      await notifyUser(bannedUser.user, message, reason);

      // Envia a mensagem de confirmação no canal
      return sendUnbanConfirmationEmbed(message, userID, reason);

    } catch (error) {
      console.error(error);
      return sendErrorEmbed(message, `Houve um erro ao tentar desbanir o usuário.\n**Motivo:** ${error.message}`);
    }
  }
};

// Função para enviar a embed de erro
function sendErrorEmbed(message, errorMessage) {
  const errorEmbed = new EmbedBuilder()
    .setAuthor({ name: "Hyouka - Erro", iconURL: message.client.user.displayAvatarURL() })
    .setDescription(`<:CheckIncorrect:1272975727821590561> ${errorMessage}`)
    .setColor(errorEmbedColor)
    .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
    .setTimestamp();

  return message.send({ embeds: [errorEmbed] });
}

// Função para notificar o usuário desbanido
async function notifyUser(user, message, reason) {
  try {
    await user.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: "Hyouka - Notificação de Unban", iconURL: message.client.user.displayAvatarURL() })
          .setDescription(`
            <:76342banhammer:1282511191801073674> Seu banimento no servidor **${message.guild.name}** foi removido!
            **Moderador:** ${message.author}
            **Motivo:** ${reason}`)
          .setColor(defaultEmbedColor)
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
          .setTimestamp()
      ]
    });
  } catch (err) {
    console.warn(`Não foi possível enviar mensagem privada para o usuário com ID ${user.id}.`);
  }
}

// Função para enviar o embed de confirmação de desbanimento
async function sendUnbanConfirmationEmbed(message, userID, reason) {
  const unbanEmbed = new EmbedBuilder()
    .setAuthor({ name: "Hyouka - Unban", iconURL: message.client.user.displayAvatarURL() })
    .setDescription(`
      <:76342banhammer:1282511191801073674> O usuário com o ID \`${userID}\` foi desbanido.
      **Moderador:** ${message.author}
      **Motivo:** ${reason}`)
    .setColor(defaultEmbedColor)
    .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
    .setTimestamp();

  try {
    await message.reply({ embeds: [unbanEmbed] });

    // Envia para o canal de logs de desbanimento
    const unbanLogChannel = message.client.channels.cache.get(unbanChannel);
    if (unbanLogChannel && unbanLogChannel.isTextBased()) {
      await unbanLogChannel.send({ embeds: [unbanEmbed] });
    }
  } catch (error) {
    console.error(error);
    message.reply({ embeds: [unbanEmbed] });
  }
}
