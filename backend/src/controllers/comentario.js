const Comentario = require("../models/Comentario");
const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");
const { index } = require("./postagem");
// const { delete } = require("./aluno");

module.exports = {
    // Implementar a inserção de comentário
    async store(req, res){
        // Recuperar o id do usuário
        const token = req.headers.authorization;
        const [Bearer, aluno_id] = token.split(" ");

        // Recuperar o id da postagem
        const {postId} = req.params;

        // Recuperar a descrição do comentário
        const {descricao} = req.body;

        // Procurar postagem pelo id
        const postagem = await Postagem.findByPk(postId);

        // Se não existir, retornar o erro
        if(!postagem){
            return res.status(404).send({erro: "Postagem não encontrada."})
        }

        // Criar o comentário usando o createComentario passamdo o id do aluno
        let comentario = await postagem.createComentario(
            {
            descricao,
            aluno_id: aluno_id
            }
        );

        comentario = comentario.dataValues;
        comentario.postagem_id = comentario.PostagemId;
        delete comentario.PostagemId;
        delete comentario.AlunoId;

        // Responder com status de criado
        res.status(201).send(comentario);
    },

    // Implementa a listagem de comentários
    async index(request, response){ 
        const {postId} = request.params;

        const postagem = await Postagem.findByPk(postId);

        if(!postagem){
            return response.status(404).send("Postagem não encontrada");
        }

        const comentarios = await postagem.getComentarios({
            include: {
                association: "Aluno",
                as: "aluno",
                attributes: ["id", "nome"]
            },
            attributes: ["id", "descricao"],
            order: [["created_at", "DESC"]]
        });

        // let comentarios = await Comentario.findAll({
        //     include: {
        //         association: "Aluno",
        //         attributes: ["id", "nome", "ra"]
        //     },
        //     include: {
        //         association: "Postagem",
        //         attributes: ["id"]
        //     },
        //     order:[
        //         ["created_at", "DESC"]
        //     ]
        // });

        // if(!comentarios){
        //     return response.status(404).send("Comentários não encontrados.")
        // }

        response.send(comentarios);
    },
}