// database.js
const { Sequelize } = require('sequelize');

// Crie a instância da conexão com o banco
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './banco.db', // ou o caminho que você quiser
  logging: false, // Desativa os logs do Sequelize
});

// Exporta para usar nos outros arquivos
module.exports = sequelize;
