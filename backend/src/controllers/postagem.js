const Postagem = require( "../models/Postagem" );
const { post } = require("../routes");

module.exports = {
    async store( req, res ){
        const token = req.headers.authorization;

        const [Bearer, created_aluno_id] = token.split(" ");

        const { titulo, descricao, imagem, gists } = req.body;

        let postagem = await Postagem.create({ titulo, descricao, imagem, gists, created_aluno_id });

        res.status(201).send(postagem);
    },

    async delete(req, res){
        // Pegando o id do aluno que está logado
        const token = req.headers.authorization;
        const [Bearer, created_aluno_id] = token.split(" ");

        // Pegando o id do post apagar
        const {id} = req.params;

        // Procura o post pelo id
        let postagem = await Postagem.findByPk();

        // Se a postagem não existir retorna not found
        if(!postagem){
            return res.status(404).send({erro: "Postagem não encontrada."})
        }
        // Se o aluno logado for diferente do aluno que criou a postagem retorna não autorizado 
        if(postagem.created_aluno_id != created_aluno_id){
            return res
                    .status(401)
                    .send({erro: "Você não tem permissão para apagar esta postagem."})
        }
        
        await postagem.destroy();

        res.status(204).send();
    },
};