const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.json');

module.exports = {
    async list( request, response ) {
        const alunos = await Aluno.findAll();

        response.send( alunos );
    },

    // Buscar aluno pelo ID
    async searchById( request, response ){
        const { id } = request.params;

        let aluno = await Aluno.findByPk( id, { raw : true } );

        // Verifica se o aluno não foi encontrado
        if( !aluno ){
            return response.status( 404 ).send( { erro : "Aluno não encontrado." } )
        }

        delete aluno.senha;

        // Retorna o aluno encontrado
        response.send( aluno );
    },

    // Inserções
    async store(request, response){
        const {ra, nome, email, senha} = request.body;

        // Verificar se o aluno já existe
        //      select * from alunos where ra = ? or email = ?
        let aluno = await Aluno.findOne(
            {
                 where: {
                    [ Op.or ] : [
                        { ra : ra },
                        { email : email }
                    ]
                 }
            }
        );

        if ( aluno ) { 
            return response.status( 400 ).send( { erro : "Aluno já cadastrado.s" } )
        }

        const senhaCripto = await bcrypt.hash(senha, 10)

        aluno = await Aluno.create({ra, nome, email, senha: senhaCripto});

        const token = jwt.sign({ alunoId : aluno.id }, authConfig.secret );

        response.status(201).send({
            aluno: {
                alunoId: aluno.id,
                nome: aluno.nome,
                ra: aluno.ra
            },
            token
        });
    },

    update(){

    },

    delete(){

    }
}