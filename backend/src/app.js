const express = require('express');
const rotas = require('./routes');
const cors = require("cors");
require('./database');

// Iniciando a aplicação
const app = express();

// Habilitar o cors para qualquer origem
app.use(cors());

// Nas requisições podem ter dados tipo Json
app.use(express.json());

// Cadastrando as rotas
app.use(rotas);

// Exportar a aplicação configurada
module.exports = app;   