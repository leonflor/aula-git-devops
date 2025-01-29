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

//Uso
// http://localhost:3000/usuario/1 OR 1=1