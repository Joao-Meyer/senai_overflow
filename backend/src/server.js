const app = require('./app.js')

// Sobe a aplicação em um servidor(conteiner)
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.');
});