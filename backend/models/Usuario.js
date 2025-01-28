const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbSequelize");

// Definição do modelo Usuario
const Usuario = sequelize.define(
  "Usuario",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    senhaCripto: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    tableName: "usuarios", // Nome da tabela no banco
    timestamps: false, // Desativa colunas de createdAt/updatedAt
  }
);

module.exports = Usuario;