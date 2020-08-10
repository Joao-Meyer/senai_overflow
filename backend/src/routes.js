// Esse arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");

// Criando o roteirizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");

// Rotas de usuário
routes.get("/alunos", alunoController.list);
routes.get("/alunos/:id", alunoController.searchById);
routes.post("/alunos", alunoController.store);

// Rotas de postagem
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

module.exports = routes;