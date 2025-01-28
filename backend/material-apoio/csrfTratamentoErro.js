// Middleware para capturar erros CSRF e exibir mensagens amigáveis
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    // Token CSRF ausente ou inválido
    return res.status(403).json({
      message:
        "Token CSRF inválido ou ausente. A requisição foi rejeitada por segurança.",
    });
  }
  next(err); // Passa para o próximo middleware de erro
});
