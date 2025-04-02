/**
 * @author ricardo-as1
 * @github https://github.com/ricardo-as1/Hyouka.git
 * @support https://discord.gg/5MWurPkP6S
 * @see https://github.com/ricardo-as1/Hyouka/blob/HyoukaDefaultBranch/Src/Database/DataBase.js
 */

const Database = require('better-sqlite3');
const db = new Database('./Hyouka.db');
const { Sync: { defaultPrefix } } = require('../ConfigHub/System.js');

/**
 * Função para notificar o status da inicialização da base de dados.
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

// Função para criar as tabelas, se não existirem
try {
    db.exec('CREATE TABLE IF NOT EXISTS prefixes (guildId TEXT PRIMARY KEY, prefix TEXT)');
} catch (error) {
    console.error('Erro ao criar as tabelas:', error.message);
    notifyDatabaseStatus(false, 'Falha ao criar as tabelas de dados.');
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
        stmt.run(guildId, newPrefix);  // Salva o novo prefixo ou atualiza caso já exista
    } catch (error) {
        console.error('Falha ao definir o prefixo:', error.message);
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
        const row = stmt.get(guildId);  // Retorna a linha correspondente
        return row && row.prefix ? row.prefix : defaultPrefix;
    } catch (error) {
        console.error('Falha ao obter prefixo:', error.message);
        return defaultPrefix;
    }
}

// Função para remover o prefixo do banco de dados
function removePrefix(guildId) {
    try {
        const stmt = db.prepare('DELETE FROM prefixes WHERE guildId = ?');
        stmt.run(guildId);  // Executa o comando para remover o prefixo
    } catch (error) {
        console.error('Falha ao remover o prefixo:', error.message);
    }
}

// Exportando as funções
module.exports = {
    db,
    setPrefix,
    getPrefix,
    removePrefix,
    notifyDatabaseStatus
};
