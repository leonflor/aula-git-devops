// Exemplo de XSS - Vulnerabilidade
app.get("/comentario", (req, res) => {
  const comentario = req.query.comentario;
  res.send(`<h1>Comentário Recebido</h1><p>${comentario}</p>`);
});


//Uso
//http://localhost:3000/comentario?comentario=<script>alert('XSS');</script>