import React, { useEffect, useRef, useState } from 'react';

import { FiGithub, FiLogOut } from 'react-icons/fi';
import fotoPerfil from "../../assets/foto_perfil.png";
import imgPost from "../../assets/post-exemplo.jpg";

import Alerts from "../../components/alerts";

import './styles.css';
import { signOut, getAluno } from '../../services/security';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';
import Popup from '../../components/popup';
import moment from 'moment';

const CardPost = ({ post }) => {
    const [ mostrarComentarios, setMostrarComentarios ] = useState(false);
    const [ comentarios, setComentarios ] = useState([]);
    const [ novoComentario, setNovoComentario ] = useState("");

    const carregarComentarios = async () => {
        try {
            if(!mostrarComentarios){
                const retorno = await api.get(`postagens/${post.id}/comentarios`);

                setComentarios(retorno.data);
            }
            
            setMostrarComentarios(!mostrarComentarios);
        } catch (erro) {
            console.log(erro);
        }
    }

    const criarComentario = async (e) =>{
        e.preventDefault();

        try {
            // Chamada para a api, criando um novo comentário
            const retorno = await api.post(`/postagens/${post.id}/comentarios`, {
                descricao: novoComentario
            });

            // Recebe o retorno da api com o comentario criado
            let comentario = retorno.data;

            // Coloca os dados do aluno logado no comentario criado
            comentario.Aluno = getAluno();

            // Atualiza a lista inserindo o novo comentário
            // Seta a lista com o que ele já tinha, e com o novo comentário
            setComentarios([...comentarios, comentario]);

            // Limpa o campo novo comentário
            setNovoComentario("");
        } catch (erro) {
            console.log(erro)
        }
    };

    const alunoSessao = getAluno();

    return (
        <div className="card-post">
            <header>
                <img src={fotoPerfil} alt="Foto de perfil"/>

            <strong>por {post.Aluno.id === alunoSessao.alunoId ? "você" : post.Aluno.nome}</strong>
                <p> {moment( post.create_at ).locale("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}</p>
                {/* Renderização condicional. Só mostra o ícone se o "gists" for verdadeiro.*/}
                {post.gists &&  (<FiGithub className="icon" size={20}/>)}
            </header>

            <section>
                <strong>
                    {post.titulo}
                </strong>

                <p>
                    {post.descricao}
                </p>

                {post.imagem && <img src={post.imagem} alt="Imagem do post"/>}
            </section>

            <footer>
                <h1 onClick={carregarComentarios}>
                    Comentários
                </h1>

                {mostrarComentarios && (
                        <>
                            {comentarios.length === 0 && (<p>Seja o primeiro a comentar!</p>)}

                            {comentarios.map(( comentario ) => (
                                <section key={comentario.id}>
                                    <header>
                                        <img src={fotoPerfil} alt="Foto de perfil"/>

                                        <strong>{comentario.Aluno.nome}</strong>
                                        <p> {comentario.createdAt}</p>
                                    </header>

                                    <p>{comentario.descricao}</p>
                                </section>
                            ))}

                            <form className="novo-comentario" onSubmit={criarComentario}>
                                <textarea placeholder="Comente essa dúvida"
                                            required
                                            value={novoComentario}
                                            onChange={(e) => {
                                               setNovoComentario(e.target.value);
                                            }}></textarea>
                                <button>Enviar</button>
                            </form>
                        </>
                    )
                }
            </footer>
        </div>
    );
}

const NovaPostagem =  ({ carregarPostagens, setmostrarNovaPostagem, setMensagem }) => {
    const [ novaPostagem, setNovaPostagem ] = useState({
        titulo: "",
        descricao: "",
        gists: "",
    })

    const enviar = async (e) => {
        e.preventDefault();

        setMensagem("Enviando");

        const dados = new FormData();

        dados.append("titulo", novaPostagem.titulo);
        dados.append("descricao", novaPostagem.descricao);
        dados.append("gists", novaPostagem.gists);
        dados.append("imagem", imagem);

        try {
            await api.post("/postagens", dados, {
                headers: {
                    "Content-type" : `multipart/form-data`,
                },
            });

            carregarPostagens();
            
            setmostrarNovaPostagem(false);

            setMensagem("Feito");
            
            setTimeout(() => {
                setMensagem("")
            }, 3000);
        } catch (error) {
            console.log(error);

            setMensagem("Erro ao enviar, consulte o administrador de sistema.");

            setTimeout(() => {
                setMensagem("")
            }, 3000);
        }
    }

    const handlerInput = (e) => {
        setNovaPostagem({...novaPostagem, [e.target.id]: e.target.value});
    }

    const handlerImagem = (e) => {
        if(e.target.files[0]){
            imgRef.current.src = URL.createObjectURL(e.target.files[0]);
            imgRef.current.style.display = "block";
        }
        else {
            imgRef.current.src = "";
            imgRef.current.style.display = "none";
        }

        setImagem(e.target.files[0]);
    }

    const imgRef = useRef();

    const [ imagem, setImagem ] = useState(null);

    const fechar = () => {
        const { titulo, descricao, gists } = novaPostagem;

        if(
            ( titulo || descricao || gists ) &&
            !( window.confirm("Tem certeza que deseja abandonar a dúvida?"))
        )   {
                return;
        }
        setmostrarNovaPostagem(false);
    }

    return (
        <Popup>
            <form className="nova-postagem" onSubmit={enviar}>
                <span onClick={fechar}>&times;</span>

                <h1>Publique sua dúvida</h1>

                <label>Titulo</label>
                <input
                    type="text"
                    id="titulo"
                    placeholder="Sobre o que é sua dúvida"
                    onChange={handlerInput}/>

                <label>Descrição</label>
                <textarea
                    id="descricao"
                    placeholder="Descreva em detalhes o que te aflinge"
                    onChange={handlerInput}/>

                <label>Gist <em>(Opcional)</em></label>
                <input
                    type="text"
                    id="gists"
                    placeholder="https://gist.github.com/user/123"
                    onChange={handlerInput}/>

                <label htmlFor="inputImagem">Imagem <em>(Opcional)</em></label>

                <input id="inputImagem" type="file" onChange={handlerImagem}/>
                <img alt="preview" ref={imgRef}/>

                <button>Enviar</button>
            </form>
        </Popup>
    )
}

function Home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const [ mensagem, setMensagem ] = useState("");
    const [ postagens, setPostagens ] = useState([]);
    const [ mostrarNovaPostagem, setmostrarNovaPostagem ] = useState(false);

    useEffect( () => {
        carregarPostagens();
    }, []);

    const carregarPostagens = async () => {
        try {
            const retorno = await api.get("/postagens");

            setPostagens(retorno.data);
        } catch (erro) {
            if(erro.response) {
                return setMensagem(erro.response.data.erro)
            }

            setMensagem("Ops, algo deu errado, tente novamente.");
        }
    };

    const alunoSessao = getAluno();

  return (
    <div className="container">
        <Alerts mensagem={mensagem} setMensagem={setMensagem} tipo="erro"/>

        {mostrarNovaPostagem && (
        <NovaPostagem   
            carregarPostagens= {carregarPostagens}
            setmostrarNovaPostagem={setmostrarNovaPostagem}
            setMensagem={setMensagem}
        />)}

        <header className="header">
            <div>
                <p>Senai Overflow</p>
            </div>

            <div>
                <input type="search" placeholder="Pesquiaar uma dúvida" id="" name=""/>    
            </div>

            <div>
                <button className="btnSair" onClick={ () => {
                    signOut();
                    history.replace("/");
                } }>
                    Sair <FiLogOut />
                </button>
            </div>
        </header>

        <div className="content">
            <section className="profile">
                <img src={fotoPerfil} alt="Foto de perfil"/>

                <label >Editar foto</label>

                <strong>Nome:</strong>
                <p>{alunoSessao.nome}</p>

                <strong>RA:</strong>
                <p>{alunoSessao.ra}</p>
            </section>

            <section className="feed">
                {postagens.map((post) => (
                    <CardPost key={post.id} post={post}/>
                ))}
            </section>

            <section className="actions">
                    <button onClick={() => {
                        setmostrarNovaPostagem(true);
                    }}>Nova Postagem</button>
            </section>
        </div>
    </div>
  );
}

export default Home;