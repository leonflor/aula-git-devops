const sqlite3 = require("sqlite3").verbose();
const { faker } = require("@faker-js/faker");
const path = require("path");
// Caminho relativo à raiz do projeto
const dbPath = path.resolve("database", "database.sqlite");
const crypto = require("crypto");

// Conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao SQLite.");
  }
});

// Função que gera o hash de uma string
function generateHash(inputString) {
  // Usando o algoritmo SHA-256
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  return hash.digest("hex"); // Retorna o hash em formato hexadecimal
}

// Função para inserir dados fictícios
const seedUsuarios = () => {
  const stmt = db.prepare(
    "INSERT INTO usuarios (nome, email, senha, senhaCripto, role) VALUES (?, ?, ?, ?, ?)"
  );

  for (let i = 0; i < 20; i++) {
    const nome = faker.person.fullName(); // Nome aleatório
    const email = faker.internet.email(nome); // Email baseado no nome
    const senha = faker.internet.password(); // Senha aleatória
    const senhaCripto = generateHash(senha);
    const role = faker.helpers.arrayElement(["admin", "vendedor", "gerente"]); // Função aleatória (role)
    stmt.run(nome, email.toLowerCase(), senha, senhaCripto, role, (err) => {
      if (err) {
        console.error("Erro ao inserir registro:", err.message);
      }
    });
  }

  stmt.finalize(() => {
    console.log("Seed de usuários concluído com sucesso!");
    db.close();
  });
};

// Executa a seed
seedUsuarios();