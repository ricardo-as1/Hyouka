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

const { ActivityType } = require("discord.js");
const chalk = require("chalk");

module.exports = { 
  name: "ready",
  once: true,
  async execute(client) {

    client.user.setPresence({
      activities: [{
        name: `In Development... | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} membros`,
        type: ActivityType.Watching // Tipos de atividade: Playing, Streaming, Listening, Watching, Competing 
      }],
      status: 'online' // Tipos de status: online, idle, dnd, invisible
    });

    // Função para imprimir separadores estilizados no terminal
    function printSeparator() {
      console.log(chalk.hex("#5865F2")("═".repeat(process.stdout.columns)));
    }

    printSeparator();

    const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const serverCount = client.guilds.cache.size;
    const uptime = process.uptime().toFixed(2);

    console.group(chalk.greenBright(`✔ BOT STATUS`));
    console.log(('🤖 ') + chalk.hex("#5865F2").underline("Logado como:"), chalk.white(client.user.tag));
    console.log(('🆔 ') + chalk.hex("#5865F2").underline("Id do bot:"), chalk.white(client.user.id));
    console.log(('🟢') + chalk.hex("#5865F2").underline("Atual status:"), chalk.white(client.user.presence.status));
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright('✔ INFORMAÇÕES SOBRE SERVIDORES'));
    console.log(('🌐 ') + chalk.hex("#5865F2").underline("Servidores:"), chalk.white(serverCount));
    console.log(('👥 ') + chalk.hex("#5865F2").underline("Usuários:"), chalk.white(userCount));
    
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright('✔ INFORMAÇÕES DO SISTEMA'));
    console.log(
      "📦",
      `${chalk.hex("#5865F2").underline("Discord.js")} ${chalk.yellow(require("discord.js").version)}`,
      "/",
      "🐧",
      `${chalk.hex("#68a063").underline("NodeJs")} ${chalk.yellow(process.versions.node)}`,
      "/",
      "🕑",
      `${chalk.hex("#FFBC48").underline("StartTime")} ${chalk.yellow(uptime + 's')}`,
    );
    console.groupEnd();

    printSeparator();
  }
};
