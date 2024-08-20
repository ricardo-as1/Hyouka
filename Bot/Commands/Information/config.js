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
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

/**
 * Placeholder for command data
 * @type {CommandData}
 */

const { EmbedBuilder } = require('discord.js');
const defaultPrefix = require("../../Config/botconfig.js").default_prefix;

module.exports = {
  name: "config",
  description: "Exibe informações de configuração do bot e permite alterar o prefixo.",
  category: "Information",
  usage: "h!config",
  cooldown: 10,
  args: false,
  aliases: [],
  permission: ["ADMINISTRATOR"],

  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
   */

  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setTitle("<a:Settings:1273392456125386883> Hyouka - Configuração")
      .addFields({ 
          name: "<:Automod:1273403347122126960> Lista de Comandos:", 
          value: "\`h!help\` **- Mostra a lista de comandos.**",
          inline: true
        },
        {
          name: "\n",
          value: "\n",
        },
        { 
          name: "<:Lootbox:1273392541319827469> Alterar Prefixo:", 
          value: "\`h!prefix <prefixo>\` **- Altera o prefixo do bot.**",
          inline: false
        })
      .setColor("#7289DA")
      .setFooter({ 
        text: `${message.guild.name}`,
        iconURL: message.guild.iconURL({ dynamic: true }) 
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed]});
  }
};