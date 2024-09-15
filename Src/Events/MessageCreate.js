/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

const { setCooldown, isInCooldown } = require('../Config/CooldownManager.js');
const { ErrorEmbedColor } = require('../Config/Colors.js');
const { default_prefix } = require('../Config/BotConfig.js');
const { EmbedBuilder } = require('discord.js');
const { getPrefix } = require('../Database/DataBase.js');

module.exports = {
  name: 'messageCreate',
  once: false,

  async execute(message, client) {
    // Ignora mensagens de bots ou mensagens fora de guildas
    if (message.author.bot || message.channel.type === 'DM') return;

    // Obtém o prefixo do banco de dados ou usa o padrão
    const savedPrefix = await getPrefix(message.guild.id);
    const prefix = savedPrefix || default_prefix;

    // Verifica se a mensagem começa com o prefixo
    if (!message.content.startsWith(prefix)) return;

    // Separa o comando e os argumentos
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Procura o comando no cliente
    const command = client.commands.get(commandName) ||
      client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Loga o comando executado no terminal / Não recomando se for usar para projetos reais
    /*     console.table({
          Command: commandName,
          Date: new Date().toLocaleString(),
          Author: message.author.tag,
          AuthorID: message.author.id,
          Guild: message.guild.name
        }) */

    if (command) {
      // Calcula o tempo de cooldown do comando
      const cooldownTime = (command.cooldown || 5) * 1000;
      const remainingTime = isInCooldown(command.name, message.author.id, cooldownTime);

      // Verifica se o usuário ainda está em cooldown
      if (remainingTime) {
        const embed = new EmbedBuilder()
          .setTitle('⚠️ Cooldown Ativo')
          .setColor(ErrorEmbedColor)
          .setDescription(`Por favor, aguarde **${remainingTime} segundos** antes de usar o comando \`${commandName}\` novamente.`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setTimestamp();

        return message.channel.send({ embeds: [embed] });
      }

      // Define o cooldown para o usuário
      setCooldown(command.name, message.author.id, cooldownTime);

      // Executa o comando
      try {
        await command.run(client, message, args);
      } catch (ErrorEmbedColor) {
        console.ErrorEmbedColor('Erro ao executar comando:', ErrorEmbedColor);

        const embed = new EmbedBuilder()
          .setTitle(`❌ **${message.author.username}**`)
          .setColor(ErrorEmbedColor)
          .setDescription(`Ocorreu um erro ao tentar executar o comando.`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setTimestamp();

        return message.channel.send({ embeds: [embed] });

      }
    }
  }
}