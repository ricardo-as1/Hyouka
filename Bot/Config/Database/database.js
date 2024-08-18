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
 * Support Server | (https://discord.gg/QxQUZbv7df)
 */

const Database = require('better-sqlite3');
const db = new Database('bot_prefixes.db');

const defaultPrefix = require('../botconfig').default_prefix; // Defina aqui o prefixo padrão do bot

// Criar uma tabela para prefixos, se não existir
db.exec('CREATE TABLE IF NOT EXISTS prefixes (guildId TEXT PRIMARY KEY, prefix TEXT)');

// Função para definir um novo prefixo para um servidor específico
function setPrefix(guildId, newPrefix) {
    // Não salvar o prefixo se ele for igual ao prefixo padrão
    if (newPrefix === defaultPrefix) {
        removePrefix(guildId); // Remove o prefixo salvo se ele for redefinido para o padrão
        return;
    }
    const stmt = db.prepare('INSERT INTO prefixes (guildId, prefix) VALUES (?, ?) ON CONFLICT(guildId) DO UPDATE SET prefix = excluded.prefix');
    stmt.run(guildId, newPrefix);
}

// Função para obter o prefixo de um servidor específico
function getPrefix(guildId) {
    const stmt = db.prepare('SELECT prefix FROM prefixes WHERE guildId = ?');
    const row = stmt.get(guildId);
    return row ? row.prefix : defaultPrefix;  // Retorna o prefixo padrão se não houver prefixo definido
}

// Função para remover o prefixo do banco de dados
function removePrefix(guildId) {
    const stmt = db.prepare('DELETE FROM prefixes WHERE guildId = ?');
    stmt.run(guildId);
}

// Exportando as funções
module.exports = {
    setPrefix,
    getPrefix,
    removePrefix
};