/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Events/Ready.js
 */

const { notifyDatabaseStatus } = require('../Database/DataBase.js');
const { default_prefix } = require("../Config/BotConfig.js");
const { ActivityType } = require("discord.js");
const { ChalkBlue } = require("../Config/Colors.js");
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    // Definindo as atividades do bot
    const activities = [
      {
        name: `${default_prefix}config - Para mudar meu prefixo!`,
        type: ActivityType.Watching
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

    // Função para atualizar a presença do bot
    function updatePresence() {
      client.user.setPresence({
        activities: [activities[currentActivity]],
        status: 'online'
      });
      currentActivity = (currentActivity + 1) % activities.length;
    }

    // Atualiza a presença do bot a cada 8 segundos
    setInterval(updatePresence, 8000);
    updatePresence();

    // Função para imprimir um separador no console
    function printSeparator() {
      console.log(chalk.hex(ChalkBlue)("═".repeat(process.stdout.columns)));
    }

    printSeparator();

    // Exibe informações sobre o bot no console
    const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const serverCount = client.guilds.cache.size;
    const uptime = process.uptime().toFixed(2);
    const Database = notifyDatabaseStatus(true); // Você pode passar true ou false com base no estado da conexão.

    // Grupo de informações sobre a database
    console.group(chalk.greenBright.bold.italic('✔ Database Status'));
    console.log(chalk.white.italic("🗃️"), chalk.hex(ChalkBlue).underline.italic(Database));
    console.groupEnd();

    console.log('');

    // Grupo de informações sobre o bot
    console.group(chalk.greenBright.bold.italic(`✔ BOT STATUS`));
    console.log(('🤖 ') + chalk.hex(ChalkBlue).underline.italic("Logado como:"), chalk.white.italic(client.user.tag));
    console.log(('🆔 ') + chalk.hex(ChalkBlue).underline.italic("Id do bot:"), chalk.white.italic(client.user.id));
    console.log(('🟢 ') + chalk.hex(ChalkBlue).underline.italic("Atual status:"), chalk.green.italic(client.user.presence.status));
    console.groupEnd();

    console.log('');

    // Grupo de informações sobre servidores
    console.group(chalk.greenBright.bold.italic('✔ INFORMAÇÕES SOBRE SERVIDORES'));
    console.log(('🌐 ') + chalk.hex(ChalkBlue).underline.italic("Servidores:"), chalk.white.italic(serverCount));
    console.log(('👥 ') + chalk.hex(ChalkBlue).underline.italic("Usuários:"), chalk.white.italic(userCount));
    console.groupEnd();

    console.log('');

    // Grupo de informações sobre o sistema
    console.group(chalk.greenBright.bold.italic('✔ INFORMAÇÕES DO SISTEMA'));
    console.log(
      "📦",
      `${chalk.hex(ChalkBlue).underline.italic("Discord.js")} ${chalk.white.italic(require("discord.js").version)}`,
      "/",
      "🌍",
      `${chalk.hex(ChalkBlue).underline.italic("NodeJs")} ${chalk.white.italic(process.versions.node)}`,
      "/",
      "⏱️ ",
      `${chalk.hex(ChalkBlue).underline.italic("Uptime")} ${chalk.white.italic(uptime + 's')}`
    );
    console.groupEnd();

    printSeparator();
  }
};
