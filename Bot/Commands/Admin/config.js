/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

/**
 * Placeholder for command data
 * @type {CommandData}
 */

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "config",
  description: "Exibe informações de configuração do bot e permite alterar o prefixo.",
  category: "Admin",
  usage: "h!config",
  cooldown: 10,
  permission: ["ADMINISTRATOR"],

  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
   * @param {Array<string>} args
   */

  run: async (client, message) => {
    const guildIconURL = message.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setTitle("<a:Settings:1273392456125386883> Hyouka - Configuração")
      .addFields({ 
          name: "<:Lootbox:1273392541319827469> Alterar Prefixo:", 
          value: "\`h!prefix <prefixo>\` **- Altera o prefixo do bot.**",
          inline: false
        })
      .setColor("#7289DA")
      .setFooter({ text: `${message.guild.name}`, iconURL: guildIconURL })
      .setTimestamp()

    await message.channel.send({ embeds: [embed]});
  }
};