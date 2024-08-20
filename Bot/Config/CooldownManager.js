/**
 * @AUTHOR
 * Name | @ricardo-as1
 * Instagram | https://www.instagram.com/kingzin.021/
 * GitHub | https://github.com/ricardo-as1
 * Repository | (https://github.com/ricardo-as1/Hyouka.git)
 * Support Server | (https://discord.gg/HKkHaqPNac)
 */

const cooldowns = new Map();

module.exports = {
    setCooldown(commandName, userId, cooldownTime) {
      if (!cooldowns.has(commandName)) {
        cooldowns.set(commandName, new Map());
      }
      const now = Date.now();
      cooldowns.get(commandName).set(userId, now);
    },

    isInCooldown(commandName, userId, cooldownTime) {
      if (!cooldowns.has(commandName)) return false;

      const now = Date.now();
      const timestamps = cooldowns.get(commandName);
      const cooldown = timestamps.get(userId);

      if (!cooldown) return false;

      const expirationTime = cooldown + cooldownTime;

      if (now < expirationTime) {
        return Math.ceil((expirationTime - now) / 1000); // Retorna o tempo restante em segundos
      }

      return false;
    }
  }
