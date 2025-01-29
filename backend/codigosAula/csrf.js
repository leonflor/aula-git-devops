// Rota vulnerável a CSRF - Atualizar o nome de um usuário
app.post("/atualizar-usuario", (req, res) => {
  const { id, nome } = req.body;

  // Atualização do nome do usuário na tabela 'usuarios'
  const query = `UPDATE usuarios SET nome = ? WHERE id = ?`;
  db.run(query, [nome, id], (err) => {
    if (err) {
      res.status(500).send("Erro ao atualizar o usuário");
      return;
    }
    res.json({ message: `Usuário com id ${id} atualizado para ${nome}` });
  });
});


