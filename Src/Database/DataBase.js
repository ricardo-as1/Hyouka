/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Database/DataBase.js
 */

/**
 * Placeholder command
 * @type {import("../../Base/BaseCommands.js")}
 */

const Database = require('better-sqlite3');
const db = new Database('./Hyouka.db');
const { Sync: { defaultPrefix } } = require('../ConfigHub/System.js');

/**
 * @param {boolean} isDatabaseConnected
 * @param {string} [errorMessage]
 * @returns {string}
 */

function notifyDatabaseStatus(isDatabaseConnected, errorMessage = '') {
    if (isDatabaseConnected) {
        return 'Database On!';
    } else if (errorMessage) {
        console.error(`⚠️ Erro ao iniciar a base de dados: ${errorMessage}`);
        return `⚠️ Erro ao iniciar a base de dados: ${errorMessage}`;
    } else {
        console.error('⚠️ A base de dados não foi conectada corretamente. Verifique a configuração.');
        return '⚠️ A base de dados não foi conectada corretamente. Verifique a configuração.';
    }
}

try {
    db.exec('CREATE TABLE IF NOT EXISTS prefixes (guildId TEXT PRIMARY KEY, prefix TEXT)');
} catch (error) {
    console.error('Erro ao criar as tabelas:', error.message);
    notifyDatabaseStatus(false, 'Falha ao criar as tabelas de dados.');
}

function setPrefix(guildId, newPrefix) {
    try {
        if (newPrefix === defaultPrefix) {
            removePrefix(guildId);
            return;
        }

        const stmt = db.prepare('INSERT INTO prefixes (guildId, prefix) VALUES (?, ?) ON CONFLICT(guildId) DO UPDATE SET prefix = excluded.prefix');
        stmt.run(guildId, newPrefix);
    } catch (error) {
        console.error('Falha ao definir o prefixo:', error.message);
    }
}

function getPrefix(guildId) {
    try {
        if (typeof guildId !== 'string' && typeof guildId !== 'number') {
            guildId = String(guildId);
        }
        if (!guildId) {
            return defaultPrefix;
        }
        const stmt = db.prepare('SELECT prefix FROM prefixes WHERE guildId = ?');
        const row = stmt.get(guildId);
        return row && row.prefix ? row.prefix : defaultPrefix;
    } catch (error) {
        console.error('Falha ao obter prefixo:', error.message);
        return defaultPrefix;
    }
}

function removePrefix(guildId) {
    try {
        const stmt = db.prepare('DELETE FROM prefixes WHERE guildId = ?');
        stmt.run(guildId);
    } catch (error) {
        console.error('Falha ao remover o prefixo:', error.message);
    }
}

module.exports = {
    db,
    setPrefix,
    getPrefix,
    removePrefix,
    notifyDatabaseStatus
};
