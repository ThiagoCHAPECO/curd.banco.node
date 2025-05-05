const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');  // Caminho correto para importar o arquivo

const Cadastro = sequelize.define('Cadastro', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // Validação personalizada: Nome não pode conter números
      noNumbers(value) {
        if (/\d/.test(value)) {
          throw new Error("O nome não pode conter números.");
        }
      }
    }
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        args: true,
        msg: "A idade deve ser um número inteiro."
      },
      min: {
        args: [18],
        msg: "A idade deve ser maior ou igual a 18 anos."
      }
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: {
          args: [11, 11],  // Verifica se o número tem exatamente 11 caracteres
          msg: "O número de telefone deve ter 11 caracteres."
        }
      }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: "Por favor, insira um email válido."
      }
    }
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'cadastros',  // Nome da tabela no banco de dados
  timestamps: false,       // Desativa a criação automática dos campos 'createdAt' e 'updatedAt'
});

module.exports = { Cadastro, sequelize };
