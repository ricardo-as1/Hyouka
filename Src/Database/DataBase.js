/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @server_support https://discord.gg/HKkHaqPNac
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Database/DataBase.js
 */

const Database = require('better-sqlite3');
const db = new Database('./HyoukaDatabase.db');

/**
 * Função para avisar sobre o status da inicialização da base de dados.
 * @param {boolean} isDatabaseConnected - Estado da conexão com a base de dados (true se conectado, false caso contrário).
 * @param {string} [errorMessage] - Mensagem de erro, caso haja algum erro na inicialização.
 * @returns {string} - Mensagem de status sobre a base de dados.
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

// Função para avisar sobre prefixos adicionados
function notifyPrefixAdded(guildId, newPrefix) {
    console.log(`Prefixo "${newPrefix}" adicionado para o servidor com ID ${guildId}.`);
}

const defaultPrefix = require('../Config/BotConfig.js').default_prefix; // Defina aqui o prefixo padrão do bot

// Criar uma tabela para prefixos, se não existir
try {
    db.exec('CREATE TABLE IF NOT EXISTS prefixes (guildId TEXT PRIMARY KEY, prefix TEXT)');
} catch (error) {
    notifyError('Falha ao criar a tabela de prefixos.');
}

// Função para definir um novo prefixo para um servidor específico
function setPrefix(guildId, newPrefix) {
    try {
        // Não salvar o prefixo se ele for igual ao prefixo padrão
        if (newPrefix === defaultPrefix) {
            removePrefix(guildId); // Remove o prefixo salvo se ele for redefinido para o padrão
            return;
        }
        const stmt = db.prepare('INSERT INTO prefixes (guildId, prefix) VALUES (?, ?) ON CONFLICT(guildId) DO UPDATE SET prefix = excluded.prefix');
        stmt.run(guildId, newPrefix);
        notifyPrefixAdded(guildId, newPrefix); // Avisar que o prefixo foi adicionado
    } catch (error) {
        notifyError('Falha ao definir o prefixo.');
    }
}

// Função para obter o prefixo de um servidor específico
function getPrefix(guildId) {
    try {
        // Converter guildId para string se não for um tipo aceitável
        if (typeof guildId !== 'string' && typeof guildId !== 'number') {
            guildId = String(guildId);  // Converte para string, se necessário
        }

        const stmt = db.prepare('SELECT prefix FROM prefixes WHERE guildId = ?');
        const row = stmt.get(guildId);
        return row && row.prefix ? row.prefix : defaultPrefix;
    } catch (error) {
        console.error('Falha ao obter o prefixo:', error.message);
        return defaultPrefix;
    }
}

// Função para remover o prefixo do banco de dados
function removePrefix(guildId) {
    try {
        const stmt = db.prepare('DELETE FROM prefixes WHERE guildId = ?');
        stmt.run(guildId);
    } catch (error) {
        notifyError('Falha ao remover o prefixo.');
    }
}

// Exportando as funções
module.exports = {
    notifyDatabaseStatus,
    setPrefix,
    getPrefix,
    removePrefix
};
