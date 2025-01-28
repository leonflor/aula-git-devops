const Usuario = require("./models/Usuario");

async function listarUsuarios() {
  try {
    // Sincroniza o modelo com o banco (opcional, só para desenvolvimento)
    await Usuario.sync();

    // Consulta todos os registros
    const usuarios = await Usuario.findAll();

    // Exibe os resultados
    console.log("Lista de usuários:");
    usuarios.forEach((usuario) => {
      console.log(
        `ID: ${usuario.id}, Nome: ${usuario.nome}, Email: ${usuario.email}, Role: ${usuario.role}`
      );
      console.log(`Senha: ${usuario.senha}, SenhaCripto: ${usuario.senhaCripto}`);
      console.log('-----------------------')
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", error.message);
  }
}

// Executa a consulta
listarUsuarios();