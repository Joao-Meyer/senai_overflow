// Esse arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");

// Criando o roteirizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
const comentarioController = require("./controllers/comentario");

// Rotas de aluno
routes.get("/alunos", alunoController.list);
routes.get("/alunos/:id", alunoController.searchById);
routes.post("/alunos", alunoController.store);

// Rotas de postagem
routes.get("/postagens", postagemController.index);
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

// Rotas de comentário
routes.get("/postagens/:postId/comentarios", comentarioController.index);
routes.post("/postagens/:postId/comentarios", comentarioController.store);

module.exports = routes;