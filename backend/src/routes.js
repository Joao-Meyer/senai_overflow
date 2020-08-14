// Esse arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");

// Criando o roteirizador
const routes = express.Router();

const autorizacaoMid = require("./middlewares/autorizacao");

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
const comentarioController = require("./controllers/comentario");
const sessaoController = require("./controllers/sessao");

// Rotas públicas
// Rotas de sessão
routes.post("/sessao", sessaoController.store);

// Rota de cadastro de aluno
routes.post("/alunos", alunoController.store);

// Middleware de proteção das rotas
routes.use(autorizacaoMid);

// Rotas privadas
// Rotas de aluno
routes.get("/alunos", alunoController.list);
routes.get("/alunos/:id", alunoController.searchById);

// Rotas de postagem
routes.get("/postagens", postagemController.index);
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

// Rotas de comentário
routes.get("/postagens/:postId/comentarios", comentarioController.index);
routes.post("/postagens/:postId/comentarios", comentarioController.store);

module.exports = routes;