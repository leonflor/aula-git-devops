const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Caminho relativo à raiz do projeto
const dbPath = path.resolve("database", "database.sqlite");

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao SQLite.");
  }
});

// Exemplo de criação de tabela
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT,
    senhaCripto TEXT,
    role TEXT
  )
`);

module.exports = db;
