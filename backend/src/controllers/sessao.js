const Aluno = require('../models/Aluno');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.json');

module.exports = {
    async store(req, res){
        const {email, senha} = req.body;

        // Verificar se o aluno existe & se a senha está correta
            // SELECT * FROM aluno WHERE email = ?, senha ?
        const aluno = await Aluno.findOne({
            where: {
                email,
                // senha : await bcrypt.hash(senha, 10),
            }
        });

        // Se o aluno não existir ou a senha estiver incorreta, retornar erro
        if(!aluno || !(await bcrypt.compare(senha, aluno.senha))){
            return res.status(403).send({erro : "Usuário e/ou senha incorretos."});
        }

        const token = jwt.sign({ alunoId: aluno.id }, authConfig.secret);

        // Se existir e a senha estiver correta, retorna ok com o token
        res.status(201).send({
            aluno: {
                alunoId: aluno.id,
                nome: aluno.nome,
                ra: aluno.ra
            },
            token
        });
    }
}