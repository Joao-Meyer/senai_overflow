// Esse arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");

// Criando o roteirizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");

// Rota de criação de usuário
routes.get("/alunos", alunoController.list);
routes.get("/alunos/:id", alunoController.searchById);
routes.post("/alunos", alunoController.store);

module.exports = routes;