/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/ConfigHub/TimeString.js
 */

const formatTime = (timeInMinutes) => {
  // Verifica se o tempo é um número válido
  if (isNaN(timeInMinutes) || timeInMinutes < 0) {
    return '0h 0m 0s';
  }

  const hours = Math.floor(timeInMinutes / 60);
  const minutes = Math.floor(timeInMinutes % 60);
  const seconds = Math.floor((timeInMinutes - Math.floor(timeInMinutes)) * 60);

  // Formata o tempo em horas, minutos e segundos
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');


  // Retorna o tempo formatado
  return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
};


const getFormattedDate = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};

function getUptime(uptime) {
  const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
  const hours = Math.floor((uptime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((uptime % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((uptime % (60 * 1000)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function getCreatedDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

module.exports = {
  formatTime,
  getCreatedDate,
  getUptime,
  getFormattedDate
};
