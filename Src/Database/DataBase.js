/**
 * @author ricardo-as1
 * @instagram https://www.instagram.com/kingzin.021/
 * @github https://github.com/ricardo-as1
 * @repository https://github.com/ricardo-as1/Hyouka.git
 * @server_support https://discord.gg/HKkHaqPNac
 */

const Database = require('better-sqlite3');
const db = new Database('./HyoukaDatabase.db');

// Função para avisar que a database foi iniciada com sucesso
function notifyDatabaseStarted() {
    return 'Sucesso!'; // Mensagem ou status que você deseja exibir
}

// Função para avisar sobre erros
function notifyError(message) {
    console.error(`Erro: ${message}`);
}

// Função para avisar sobre prefixos adicionados
function notifyPrefixAdded(guildId, newPrefix) {
    console.log(`Prefixo "${newPrefix}" adicionado para o servidor com ID ${guildId}.`);
}

notifyDatabaseStarted(); // Chama a função para exibir a mensagem

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
        notifyError(`Falha ao obter o prefixo: ${error.message}`);
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
    notifyDatabaseStarted,
    setPrefix,
    getPrefix,
    removePrefix
};
