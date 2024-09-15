/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

const { ChalkOrange, ChalkWhite } = require('../Config/Colors.js');
const { getFormattedDate } = require('../Config/TimeString.js');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const loadEvents = (client) => {
  if (client.eventsLoaded) return;

  const eventsPath = path.join(__dirname, '../Events');
  console.log(chalk.greenBright('✔ EVENTOS CARREGADOS:'));

  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  const formattedEventFiles = eventFiles.map(file => `${getFormattedDate()} - ${chalk.hex(ChalkWhite)(file)}`).join('\n');
  console.log(chalk.hex(ChalkOrange)(formattedEventFiles));

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

  client.eventsLoaded = true;
};

module.exports = loadEvents;
