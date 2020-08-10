const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno");

// Criamo a conexão com os dados da configuração
const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);

// Exportamos a conexão
module.exports = conexao;