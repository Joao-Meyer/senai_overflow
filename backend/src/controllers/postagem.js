const Postagem = require( "../models/Postagem" );
const Aluno = require( "../models/Aluno" );
const { post } = require("../routes");
const { response } = require("express");

module.exports = {
    async store( req, res ){
        // Pegar o aluno ID
        const created_aluno_id = req.alunoId;

        const { titulo, descricao, imagem, gists } = req.body;

        try{        
            const aluno = await Aluno.findByPk(created_aluno_id);

            if(!aluno){
                response.status(404).send({erro: "Aluno não encontrado."})
            }

            let postagem = await aluno.createPostagem({
                titulo, descricao, imagem, gists
            });

           res.status(201).send(postagem);
        }
        catch(error){
            return response.status(500)
                        .send({
                            erro:
                                "Não foi possível cadastrar a postagem, tente novamente."
                        })
        }
    },

    async delete(req, res){
        // Pegando o id do aluno que está logado
        const created_aluno_id = req.alunoId;

        // Pegando o id do post apagar
        const {id} = req.params;

        // Procura o post pelo id
        let postagem = await Postagem.findByPk( id );
        
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

    async index(request, response){
        let postagens = await Postagem.findAll({
            include:{
                association: "Aluno",
                attributes: [ "id", "nome", "ra" ]
            },
            order:[
                ["created_at", "DESC"]
            ]
        });
        
        // // Se a não existirem postagens retorna not found
        // if(!postagens){
        //     return res.status(404).send({erro: "Sem postagens."})
        // }

        response.send(postagens);
    }
};