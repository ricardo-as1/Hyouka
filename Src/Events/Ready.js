/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

const { notifyDatabaseStarted } = require('../Database/DataBase.js');
const { default_prefix } = require("../Config/BotConfig.js");
const { ActivityType } = require("discord.js");
const { ChalkBlue } = require("../Config/Colors.js");
const chalk = require("chalk");

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
      console.log(chalk.hex(ChalkBlue)("═".repeat(process.stdout.columns)));
    }

    printSeparator();

    // Informações sobre o bot
    const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const serverCount = client.guilds.cache.size;
    const uptime = process.uptime().toFixed(2);
    const Database = notifyDatabaseStarted();

    console.group(chalk.greenBright.bold.italic('✔ Database Status'));
    console.log(chalk.white.italic("🗃️"), chalk.hex(ChalkBlue).underline.italic(`${Database}`));
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright.bold.italic(`✔ BOT STATUS`));
    console.log(('🤖 ') + chalk.hex(ChalkBlue).underline.italic("Logado como:"), chalk.white.italic(client.user.tag));
    console.log(('🆔 ') + chalk.hex(ChalkBlue).underline.italic("Id do bot:"), chalk.white.italic(client.user.id));
    console.log(('🟢 ') + chalk.hex(ChalkBlue).underline.italic("Atual status:"), chalk.green.italic(client.user.presence.status));
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright.bold.italic('✔ INFORMAÇÕES SOBRE SERVIDORES'));
    console.log(('🌐 ') + chalk.hex(ChalkBlue).underline.italic("Servidores:"), chalk.white.italic(serverCount));
    console.log(('👥 ') + chalk.hex(ChalkBlue).underline.italic("Usuários:"), chalk.white.italic(userCount));
    console.groupEnd();

    console.log('');

    console.group(chalk.greenBright.bold.italic('✔ INFORMAÇÕES DO SISTEMA'));
    console.log(
      "📦",
      `${chalk.hex(ChalkBlue).underline.italic("Discord.js")} ${chalk.white.italic(require("discord.js").version)}`,
      "/",
      "🌍",
      `${chalk.hex(ChalkBlue).underline.italic("NodeJs")} ${chalk.white.italic(process.versions.node)}`,
      "/",
      "⏱️ ",
      `${chalk.hex(ChalkBlue).underline.italic("Uptime")} ${chalk.white.italic(uptime + 's')}`,
    );
    console.groupEnd();

    printSeparator();
  }
};
