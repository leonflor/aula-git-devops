const { Sequelize } = require("sequelize");

// Configurando SQLite com Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

module.exports = sequelize;
