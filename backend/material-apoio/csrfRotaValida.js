

// Rota inicial para exibir o token CSRF
app.get("/comCsrf", csrfProtection, (req, res) => {
  res.send(`
    <h1>Bem-vindo ao backend em Node.js!</h1>
    <form action="/atualizar-usuario" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}"> <!-- Token CSRF -->
      <input type="text" name="id" placeholder="ID do Usuário">
      <input type="text" name="nome" placeholder="Novo Nome">
      <button type="submit">Atualizar Usuário</button>
    </form>
  `);
});
