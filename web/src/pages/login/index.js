import React from "react";

import { Container, ImageCropped, Form, Titulo, Subtitulo, InputGroup, Button, HiddenForm } from './styles';

import foto from '../../assets/foto.jpg';

const Login = () => {
    return (
        <Container>
            <ImageCropped>
                <img src={foto} alt="Imagem de capa" />
            </ImageCropped>

            <Form>
                <Titulo> Senai Overflow </Titulo>
                <Subtitulo> Compartilhe suas dúvidas </Subtitulo>

                <InputGroup>
                    <label>E-mail</label>
                    <input type="email" placeholder="Insira seu email"/>
                </InputGroup>

                <InputGroup>
                    <label>Senha</label>
                    <input type="senha" placeholder="Insira sua senha"/>
                </InputGroup>

                <Button> Entrar </Button>

                <Button> Registrar-se </Button>
            </Form>

            <HiddenForm>
                <Titulo> Registrar-se </Titulo>

                <InputGroup>
                    {/* <label>E-mail</label> */}
                    <input type="nome" placeholder="Insira seu nome"/>
                </InputGroup>

                <InputGroup>
                    {/* <label>E-mail</label> */}
                    <input type="email" placeholder="Insira um email"/>
                </InputGroup>

                <InputGroup>
                    {/* <label>Senha</label> */}
                    <input type="senha" placeholder="Insira uma senha"/>
                </InputGroup>

                <Button> Registrar-se </Button>
            </HiddenForm>
        </Container>
    )
}

export default Login;