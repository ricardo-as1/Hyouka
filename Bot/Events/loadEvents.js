/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { getFormattedDate } = require('../Config/TimeString.js');

// Definindo cores
const orange = chalk.hex('#FFA500');
const white = chalk.white;

// Função para carregar eventos
const loadEvents = (client) => {
  if (client.eventsLoaded) return; // Evita carregar eventos mais de uma vez

  const eventsPath = path.join(__dirname, '../Events');
  console.log(chalk.greenBright('✔ EVENTOS CARREGADOS:'));

  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  const formattedEventFiles = eventFiles.map(file => `${getFormattedDate()} - ${white(file)}`).join('\n');
  console.log(orange(formattedEventFiles));

  eventFiles.forEach(file => {
    const event = require(path.join(eventsPath, file));
    if (event.name && typeof event.execute === 'function') {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  });

  client.eventsLoaded = true; // Marca que os eventos foram carregados
};

module.exports = loadEvents;
