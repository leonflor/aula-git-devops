const sqlite3 = require('sqlite3').verbose();
const path = require("path");
// Caminho relativo à raiz do projeto
const dbPath = path.resolve("database", "database.sqlite");

// Criação da instância do banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida");
  }
});

// Exportando o objeto db para ser utilizado em outros arquivos
module.exports = db;
