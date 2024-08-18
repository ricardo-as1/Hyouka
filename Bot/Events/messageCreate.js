const { setCooldown, isInCooldown } = require('../Config/CooldownManager'); // Caminho para o novo arquivo
const { EmbedBuilder } = require('discord.js');
const { getPrefix } = require('../Config/Database/database');
const defaultPrefix = require('../Config/botconfig').default_prefix;
const chalk = require('chalk');

const orange = chalk.hex('#FFA500');

module.exports = {
  name: 'messageCreate',
  once: false,

  async execute(message, client) {
    if (message.author.bot || !message.guild) return;
  
    const savedPrefix = await getPrefix(message.guild.id);
    const prefix = savedPrefix || defaultPrefix;
  
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    console.log(orange(`Nome do comando - ` + chalk.white(`${commandName}`) + orange`\nID - `) + chalk.white(message.id) + orange(`\nEm - `) + chalk.white(new Date().toLocaleString()));

    if (command) {
      const cooldownTime = (command.cooldown || 5) * 1000;
      const remainingTime = isInCooldown(command.name, message.author.id, cooldownTime);

      if (remainingTime) {
        const embed = new EmbedBuilder()
          .setTitle('⚠️ Cooldown Ativo')
          .setColor('#FF4500')
          .setDescription(`Por favor, aguarde **${remainingTime} segundos** antes de usar o comando \`${commandName}\` novamente.`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setTimestamp();

        return message.channel.send({ embeds: [embed] });
      }

      setCooldown(command.name, message.author.id, cooldownTime);

      try {
        await command.run(client, message, args);
      } catch (error) {
        console.error('Erro ao executar comando:', error);
        const embed = new EmbedBuilder()
          .setTitle(`❌ **${message.author.username}**`)
          .setColor('#FF0000')
          .setDescription(`Ocorreu um erro ao tentar executar o comando.`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setTimestamp();

        return message.channel.send({ embeds: [embed] });
      }
    }
  }
};
