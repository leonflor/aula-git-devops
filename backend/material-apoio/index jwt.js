const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const db = require("./database/db.js"); // Importando a conexão com o banco

const app = express();
const PORT = 3000;

// Chave secreta para assinar o JWT (não use isso em produção)
const SECRET_KEY = "minha_chave_secreta";

// Middleware para processar JSON no corpo da requisição
app.use(bodyParser.json());

// Endpoint de autenticação (via GET)
app.get("/login", (req, res) => {
  const { email, password } = req.query;

// Verificar as credenciais no banco de dados
  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.get(query, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Erro no banco de dados." });
    }

    // Verificar se o usuário existe e se a senha está correta
    if (row && row.senha === password) {
      // Gerar o payload do JWT com a role do usuário
      const payload = {
        email: row.email, // Alterado para email
        role: row.role, // Role vinda do banco de dados
      }; 

      // Gerar o token com 1 hora de expiração
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "60s" });

      // Retornar o token ao cliente
      console.log(`curl -H \"Authorization: Bearer ${token}" http://localhost:3000/protected`);
      return res.json({ message: "Autenticação bem-sucedida!"});
    }

    // Caso as credenciais sejam inválidas
    return res.status(401).json({ message: "Credenciais inválidas!" });
  });
});

// Endpoint protegido para verificar o JWT
app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  const token = authHeader.split(" ")[1]; // Extrair o token do cabeçalho

  try {
    // Verificar o token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token Decodificado:", decoded);

    return res.json({ message: "Acesso autorizado!", data: decoded });
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado!" });
  }
});

// Exemplo de Injeção de SQL - Vulnerabilidade
app.get("/usuario/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM usuarios WHERE id = ${id}`;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send("Erro no banco de dados");
      return;
    }
    res.json(rows);
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
