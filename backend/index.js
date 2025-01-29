const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./database/db.js"); // Importando a conexão com o banco
const csrf = require("csurf");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Para dados de formulários
app.use(cookieParser()); // Necessário para trabalhar com cookies

// Rota inicial
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao backend em Node.js!" });
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
