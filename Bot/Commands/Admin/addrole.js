/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * @INFORMAÇÕES_DO_BOT
 * Name | Hyouka
 * Description | Um bot de moderação e diversão para servidores do Discord.
 * @LINKS 
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/QxQUZbv7df)
 */

/**
 * @type {import("../../Config/BaseCommands")}
 */

const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../Config/botconfig.js");
const EmbedColor = require("../../Config/colors");

module.exports = {
  name: "addrole",
  description: "Adiciona um cargo a um membro",
  category: "Admin",
  usage: "h!addrole <membro> <cargo>",
  args: true,
  aliases: ['adicionarcargo'],
  permission: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member) {
      const embed = new EmbedBuilder()
        .setTitle("<:CheckIncorrect:1272975727821590561> - Erro")
        .setDescription(`${message.author.toString()} Mencione um membro válido por favor.`)
        .setColor(EmbedColor.defaultErrorColor)
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    if (!role) {
      const embed = new EmbedBuilder()
        .setTitle("<:CheckIncorrect:1272975727821590561> - Erro")
        .setDescription(`${message.author.toString()} Mencione um cargo válido por favor.`)
        .setColor(EmbedColor.defaultErrorColor)
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    try {
      await member.roles.add(role);

      const successEmbed = new EmbedBuilder()
        .setTitle("<:CheckCorrect:1272975713330401450> - Adicionado Com Sucesso!")
        .setDescription(`<:Roles:1272975658028367975> - **Cargo:** ${role.toString()}
                        <:Iconmembers:1272933730121547786> - **Membro:** ${member.toString()}
                        <:Attention:1272975741557936209> - __Para remover o cargo, use: **${default_prefix}removerole**.__`)
        .setColor(EmbedColor.defaultSuccessColor)
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      message.channel.send({ embeds: [successEmbed] });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setTitle("<:CheckIncorrect:1272975727821590561> - Erro")
        .setDescription(`${message.author.toString()} Desculpe, ocorreu um erro ao tentar adicionar o cargo: ${error.message}`)
        .setColor(EmbedColor.defaultErrorColor)
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      message.channel.send({ embeds: [errorEmbed] });
    }
  }
}
