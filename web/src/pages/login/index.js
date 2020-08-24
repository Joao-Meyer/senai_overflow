import React, { useState } from "react";

import { Container, ImageCropped, Form, Titulo, Subtitulo, InputGroup, Button } from './styles';

import foto from '../../assets/foto.jpg';
import { api } from "../../services/api";
import { signIn } from "../../services/security";
import { useHistory } from "react-router-dom";

// import Alerts from "../../components/alerts";

const FormLogin = (props) => {
    const history = useHistory();

    const [ alunoLogin, setAlunoLogin ] = useState({
        email: "",
        senha: "",
    });

    const entrar = async ( e ) => {
        e.preventDefault();

        try {
            const retorno = await api.post("/sessao", alunoLogin);

            if(retorno.status === 201){
                // Vai logar na aplicação
                signIn( retorno.data );

                // Redirecionar para a tela home
                return history.push("/home");
            }
        } catch (erro) {
            if(erro.response){
                return window.alert(erro.response.data.erro);
            }
            window.alert("Ops, algo deu errado. Tente novamente.");
        }
    }

    const handlerInput = (e) => {
        setAlunoLogin({...alunoLogin, [e.target.id] : e.target.value})
    }

    return (
        <Form onSubmit={entrar}>
            <Titulo> Senai Overflow </Titulo>
            <Subtitulo> Compartilhe suas dúvidas </Subtitulo>

            <InputGroup>
                <label>E-mail</label>

                <input
                    type="email"
                    id="email"
                    value={alunoLogin.email}
                    onChange={handlerInput}
                    placeholder="Insira seu email"
                />
            </InputGroup>

            <InputGroup>
                <label>Senha</label>

                <input
                    type="password"
                    id="senha"
                    value={alunoLogin.senha}
                    onChange={handlerInput}
                    placeholder="Insira sua senha"
                />
            </InputGroup>

            <Button type="submit"> Entrar </Button>

            <Button type="button" onClick={() => {
                props.mostrarForm("registrar");
            }}> Registrar-se </Button>
        </Form>
    )
}

const FormRegistrar = (props) => {
    const [ alunoRegistrar, setAlunoRegistrar ] = useState({
        ra : "",
        nome: "",
        email: "",
        senha: "",
    });

    const registrar = async ( e ) => {
        e.preventDefault();

        try {
            const retorno = await api.post("/alunos", alunoRegistrar);

            if(retorno.status === 201){
                // Vai logar na aplicação
                // Redirecionar para a tela home

                window.alert("Registrado com sucesso!");
            }
        } catch (erro) {
            if(erro.response){
                return window.alert(erro.response.data.erro);
            }
            window.alert("Ops, algo deu errado. Tente novamente.");
        }
    }

    const handlerInput = (e) => {
        setAlunoRegistrar({...alunoRegistrar, [e.target.id] : e.target.value})
    }

    return (
        <Form onSubmit={registrar}>
            <Titulo> Senai Overflow </Titulo>
            <Subtitulo> Compartilhe suas dúvidas </Subtitulo>

            <InputGroup>
                <label>RA</label>

                <input
                    type="number"
                    id="ra"
                    value={alunoRegistrar.ra}
                    onChange={handlerInput}
                    placeholder="Insira seu ra"
                />
            </InputGroup>

            <InputGroup>
                <label>Nome</label>

                <input
                    type="text"
                    id="nome"
                    value={alunoRegistrar.nome}
                    onChange={handlerInput}
                    placeholder="Insira seu nome"
                />
            </InputGroup>

            <InputGroup>
                <label>E-mail</label>

                <input
                    type="email"
                    id="email"
                    value={alunoRegistrar.email}
                    onChange={handlerInput}
                    placeholder="Insira seu email"
                />
            </InputGroup>

            <InputGroup>
                <label>Senha</label>

                <input
                    type="password"
                    id="senha"
                    value={alunoRegistrar.senha}
                    onChange={handlerInput}
                    placeholder="Insira sua senha"
                />
            </InputGroup>

            <Button type="submit"> Enviar </Button>

            <Button type="button" onClick={() => {
                props.mostrarForm("login");
            }}> Já tenho cadastro </Button>
        </Form>
    )
}

const Login = () => {
    const [mostrarForm, setMostrarForm] = useState("login");

    return (
        <Container>
            <ImageCropped>
                <img src={foto} alt="Imagem de capa" />
            </ImageCropped>

            {mostrarForm === "login" ?
                (
                    <FormLogin mostrarForm={setMostrarForm} />
                )
                :
                (
                    <FormRegistrar mostrarForm={setMostrarForm} />
                )
            }

        </Container>
    )
}

export default Login;