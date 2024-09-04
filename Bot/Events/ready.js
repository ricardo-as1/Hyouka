/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

const { ActivityType } = require("discord.js");
const chalk = require("chalk");
const { default_prefix } = require("../Config/botconfig");
const { notifyDatabaseStarted } = require('../Config/Database/database');

module.exports = { 
  name: "ready",
  once: true,
  async execute(client) {

    const activities = [
      {
        name: `${default_prefix}config - Para mudar meu prefixo!`,
        type: ActivityType.Watching // Tipos de atividade: Watching, Listening, Playing, Streaming
      },
      {
        name: `musica com meus ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} filhos 🤪`,
        type: ActivityType.Listening
      },
      {
        name: `${default_prefix}help - Para ver minha lista de comandos!`,
        type: ActivityType.Playing
      }
    ];
    
    let currentActivity = 0;
    
    function updatePresence() {
      client.user.setPresence({
        activities: [activities[currentActivity]],
        status: 'online' // Tipos de status: online, idle, dnd, invisible
      });
    
      currentActivity = (currentActivity + 1) % activities.length;
    }
    
    setInterval(updatePresence, 8000);
    
    updatePresence();

    function printSeparator() {
      console.log(chalk.hex("#5865F2")("═".repeat(process.stdout.columns)));
    }

    printSeparator();

    const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const serverCount = client.guilds.cache.size;
    const uptime = process.uptime().toFixed(2);
    const Database = notifyDatabaseStarted();

    console.group(chalk.greenBright.bold.italic('✔ Database Status'));
    console.log(chalk.white.italic("🗃️"), chalk.hex("#5865F2").underline.italic(`${Database}`));
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright.bold.italic(`✔ BOT STATUS`));
    console.log(('🤖 ') + chalk.hex("#5865F2").underline.italic("Logado como:"), chalk.white.italic(client.user.tag));
    console.log(('🆔 ') + chalk.hex("#5865F2").underline.italic("Id do bot:"), chalk.white.italic(client.user.id));
    console.log(('🟢') + chalk.hex("#5865F2").underline.italic("Atual status:"), chalk.green.italic(client.user.presence.status));
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright.bold.italic('✔ INFORMAÇÕES SOBRE SERVIDORES'));
    console.log(('🌐 ') + chalk.hex("#5865F2").underline.italic("Servidores:"), chalk.white.italic(serverCount));
    console.log(('👥 ') + chalk.hex("#5865F2").underline.italic("Usuários:"), chalk.white.italic(userCount));
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright.bold.italic('✔ INFORMAÇÕES DO SISTEMA'));
    console.log(
      "📦",
      `${chalk.hex("#5865F2").underline.italic("Discord.js")} ${chalk.white.italic(require("discord.js").version)}`,
      "/",
      "🌍",
      `${chalk.hex("#5865F2").underline.italic("NodeJs")} ${chalk.white.italic(process.versions.node)}`,
      "/",
      "⏱️ ",
      `${chalk.hex("#5865F2").underline.italic("Uptime")} ${chalk.white.italic(uptime + 's')}`,
    );
    console.groupEnd();

    printSeparator();
  }
};
