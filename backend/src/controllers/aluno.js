const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");

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
            return response.status( 404 ).send( { erro : "Aluno mnão encontrado." } )
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

        aluno = await Aluno.create({ra, nome, email, senha});

        response.status(201).send(aluno);
    },

    update(){

    },

    delete(){

    }
}