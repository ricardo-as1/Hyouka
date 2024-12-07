/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Events/MessageCreate.js
 */

const { EmbedBuilder } = require('discord.js');
const { getPrefix } = require('../Database/DataBase.js');
const { ErrorEmbedColor } = require('../Config/Colors.js');
const { default_prefix } = require('../Config/BotConfig.js');
const { setCooldown, isInCooldown, isGlobalCooldownEnabled, isCommandUsageExceeded } = require('./StateManager.js');

module.exports = {
  name: 'messageCreate',
  once: false,

  async execute(message, client) {
    if (message.author.bot || message.channel.type === 'DM') return;

    const savedPrefix = await getPrefix(message.guild.id);
    const prefix = savedPrefix || default_prefix;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
      client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command) {
      // Verifica se o cooldown global está ativado
      if (isGlobalCooldownEnabled()) {
        // Limite de uso de comando (intervalo de 2 minuto e limite de 5 vezes)
        const usageLimit = 5;
        const timeInterval = 120000;

        // Verifica se o limite de uso de comando foi excedido
        if (isCommandUsageExceeded(command.name, message.author.id, usageLimit, timeInterval)) {
          return this.sendUsageLimitError(message, commandName, usageLimit, timeInterval, client);
        }

        // Calcula o tempo de cooldown específico para o comando
        const cooldownTime = (command.cooldown || 1) * 5000; // Defina o tempo de cooldown
        const remainingTime = isInCooldown(command.name, message.author.id, cooldownTime);

        if (remainingTime) {
          return this.sendCooldownError(message, commandName, remainingTime, client);
        }

        // Se o cooldown não foi atingido, define o cooldown para o usuário
        setCooldown(command.name, message.author.id, cooldownTime);
      }

      // Agora, executa o comando normalmente
      return this.executeCommand(client, message, command, args);
    }
  },

  // Função para executar o comando
  async executeCommand(client, message, command, args) {
    try {
      await command.run(client, message, args);
    } catch (Error) {
      console.error('Erro ao executar comando:', Error);
      return this.sendErrorEmbed(message, Error, client);
    }
  },

  // Função para enviar o erro de cooldown
  sendCooldownError(message, commandName, remainingTime, client) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(ErrorEmbedColor)
      .setDescription(`Por favor, aguarde **${remainingTime} segundos** antes de usar o comando \`${commandName}\` novamente.`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp();
    return message.channel.send({ embeds: [embed] });
  },

  // Função para enviar o erro de limite de uso de comando
  sendUsageLimitError(message, commandName, usageLimit, timeInterval, client) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(ErrorEmbedColor)
      .setDescription(`Você já usou o comando \`${commandName}\` **${usageLimit} vezes** nos últimos **${timeInterval / 1000} segundos**.\nPor favor, aguarde antes de tentar novamente.`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp();

    return message.channel.send({ embeds: [embed] });
  },

  // Função para enviar o erro de execução
  sendErrorEmbed(message, Error, client) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setAuthor({ name: "Hyouka - Erro", iconURL: client.user.displayAvatarURL() })
      .setColor(ErrorEmbedColor)
      .setDescription(`*__Motivo:__* \`\`\`diff\n- ${Error.toString()}\`\`\`*Por Favor, **Tente Novamente.***\n__Se o problema persistir, denuncie-o com:__ \`\`\`Bash\n'${default_prefix}reportbug [Nome do Comando e Erro]'\`\`\`***Obrigado e desculpe pelo transtorno.***`)
      .setThumbnail("https://media.stickerswiki.app/mrincrediblememe/1102632.512.webp")
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setTimestamp();
    return message.channel.send({ embeds: [embed] });
  }
};
