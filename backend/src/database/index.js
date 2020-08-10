const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");

// Criamo a conexão com os dados da configuração
const conexao = new Sequelize(dbConfig);

// Inicializando as models
Aluno.init(conexao);
Postagem.init(conexao);

// Inicializando as associações
Aluno.associate( conexao.models );
Postagem.associate( conexao.models );

// Exportamos a conexão
module.exports = conexao;