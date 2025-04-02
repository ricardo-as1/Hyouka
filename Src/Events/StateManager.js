/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Events/StateManager.js
 */

// Variáveis em memória para armazenar os dados
let cooldowns = new Map(); // Para armazenar os cooldowns por comando e usuário
let commandUsage = new Map(); // Para armazenar o uso de comandos por usuário
let cooldownsGlobalEnabled = true; // Controle global de cooldown (true ou false)
let maintenanceMode = false; // Controle do modo de manutenção

// Função para definir o cooldown para um usuário
const setCooldown = (commandName, userId, time) => {
  const cooldownKey = `${commandName}-${userId}`;
  const expireTime = Date.now() + time;
  cooldowns.set(cooldownKey, expireTime);
};

// Função para verificar se um usuário está em cooldown
const isInCooldown = (commandName, userId) => {
  const cooldownKey = `${commandName}-${userId}`;
  const expireTime = cooldowns.get(cooldownKey);

  if (!expireTime) return false; // Não está em cooldown

  const remainingTime = expireTime - Date.now(); // Calcula o tempo restante do cooldown
  if (remainingTime <= 0) {
    cooldowns.delete(cooldownKey); // Remove o cooldown expirado
    return false;
  }

  return Math.ceil(remainingTime / 1000); // Retorna o tempo restante em segundos
};

// Função para ativar o cooldown global
const enableGlobalCooldown = () => {
  cooldownsGlobalEnabled = true; // Ativa o cooldown global
};

// Função para desativar o cooldown global
const disableGlobalCooldown = () => {
  cooldownsGlobalEnabled = false; // Desativa o cooldown global
};

// Função para verificar se o cooldown global está ativado
const isGlobalCooldownEnabled = () => {
  return cooldownsGlobalEnabled;
};

// Função para ativar o modo de manutenção
const enableMaintenanceMode = () => {
  maintenanceMode = true; // Ativa o modo de manutenção
};

// Função para desativar o modo de manutenção
const disableMaintenanceMode = () => {
  maintenanceMode = false; // Desativa o modo de manutenção
};

// Função para verificar se o modo de manutenção está ativo
const isMaintenanceMode = () => {
  return maintenanceMode;
};

// Função para verificar se o limite de uso de um comando foi excedido
const isCommandUsageExceeded = (commandName, userId, usageLimit, timeInterval) => {
  const currentTime = Date.now();

  // Cria uma chave única para o comando e o usuário
  const usageKey = `${commandName}-${userId}`;

  // Inicializa o registro de uso do comando, se necessário
  if (!commandUsage.has(usageKey)) {
    commandUsage.set(usageKey, []);
  }

  const usageTimestamps = commandUsage.get(usageKey);

  // Filtra os usos anteriores que já passaram do intervalo de tempo
  const recentUsages = usageTimestamps.filter(timestamp => currentTime - timestamp <= timeInterval);

  // Verifica se o número de usos recentes excede o limite
  if (recentUsages.length >= usageLimit) {
    return true; // Limite de uso excedido
  }

  // Adiciona o timestamp do uso atual
  usageTimestamps.push(currentTime);

  // Atualiza o registro de usos
  commandUsage.set(usageKey, recentUsages);

  return false; // Limite de uso não foi excedido
};

module.exports = { 
  setCooldown, 
  isInCooldown, 
  enableGlobalCooldown, 
  disableGlobalCooldown, 
  isGlobalCooldownEnabled,
  enableMaintenanceMode, 
  disableMaintenanceMode, 
  isMaintenanceMode,
  isCommandUsageExceeded 
};
