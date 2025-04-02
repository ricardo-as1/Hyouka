/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Commands/Moderation/ban.js
 */

/**
 * Comando para banir um usuário do servidor.
 * @type {import("../../Base/BaseCommands.js")}
 */

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Sync: { defaultPrefix }, Colors: { defaultEmbedColor, errorEmbedColor, warningEmbedColor }, Logs: { banChannel } } = require('../../ConfigHub/System.js');

module.exports = {
  name: "ban",
  description: "Bane um usuário do servidor.",
  category: "Moderation",
  usage: `${defaultPrefix}ban <user> [reason]`,
  aliases: ['banir'],
  permission: ["BanMembers"],

  async run(client, message, args) {
    // Verificar se o membro tem permissão de BAN_MEMBERS
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      const embed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
        .setDescription(`**<:CheckIncorrect:1272975727821590561> Vocês precisa ser Moderador para usar este comando!**`)
        .setColor(errorEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
        .setTimestamp()

      return message.channel.send({ embeds: [embed] });
    }

    // Buscar o usuário mencionado ou pelo ID
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "Sem motivo fornecido";

    // Verificar se o usuário foi encontrado
    if (!user) {
      return sendErrorEmbed(message, "Por favor, mencione um membro ou forneça o ID!");
    }

    // Impedir o banimento do próprio autor ou do bot
    if (user.id === message.author.id || user.id === client.user.id) {
      return sendErrorEmbed(message, "Você não pode banir a si mesmo!");
    }

    // Impedir o banimento do dono do servidor
    if (user.id === message.guild.ownerId) {
      return sendErrorEmbed(message, "Não posso banir o dono do servidor!");
    }

    // Verificar se o usuário pode ser banido
    if (!user.bannable) {
      return sendErrorEmbed(message, "Não posso banir este membro!");
    }

    // Preparar o embed de banimento
    const banEmbed = new EmbedBuilder()
      .setAuthor({ name: "Hyouka - Ban", iconURL: client.user.displayAvatarURL() })
      .setDescription(`
        <:76342banhammer:1282511191801073674> ${user} foi banido.
        **ID:** ${user.id}
        **Moderador:** ${message.author}
        **Motivo:** ${reason}`)
      .setColor(defaultEmbedColor)
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
      .setTimestamp();

    // Tentar banir o usuário
    try {
      await user.send({ embeds: [banEmbed] }).catch(() => message.channel.send({ embeds: [banEmbed] }));
      await user.ban({ reason });

      // Enviar mensagem para o canal de logs de banimento
      const banLogChannel = client.channels.cache.get(banChannel);
      if (banLogChannel && banLogChannel.isTextBased()) {
        await banLogChannel.send({ embeds: [banEmbed] });
      }

      // Confirmar banimento
      return message.channel.reply({ embeds: [banEmbed] });

    } catch (error) {
      // Enviar mensagem de erro se falhar ao banir
      const errorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hyouka - Warning", iconURL: client.user.displayAvatarURL() })
        .setDescription(`<:Attention:1272975741557936209> Houve um erro ao tentar banir o usuário.\n**Motivo:** ${error.message}`)
        .setColor(warningEmbedColor)
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setTimestamp();

      console.error(error);
      return message.channel.reply({ embeds: [errorEmbed] });
    }
  }
};

// Função para enviar mensagens de erro
function sendErrorEmbed(message, errorMessage) {
  const errorEmbed = new EmbedBuilder()
    .setAuthor({ name: "Hyouka - Erro", iconURL: message.client.user.displayAvatarURL() })
    .setDescription(`<:CheckIncorrect:1272975727821590561> ${errorMessage}`)
    .setColor(errorEmbedColor)
    .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() })
    .setTimestamp();
  return message.channel.reply({ embeds: [errorEmbed] });
}
