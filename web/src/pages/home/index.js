import React from 'react';

import { FiGithub, FiLogOut } from 'react-icons/fi';
import fotoPerfil from "../../assets/foto_perfil.png";
import imgPost from "../../assets/post-exemplo.jpg";

import './styles.css';
import { signOut } from '../../services/security';
import { useHistory } from 'react-router-dom';

function home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
  return (
    <div className="container">
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

                <a href="#">Editar foto</a>

                <strong>Nome:</strong>
                <p>Fulano Ahí</p>

                <strong>Email:</strong>
                <p>fulano@mail.com</p>

                <strong>RA:</strong>
                <p>11</p>
            </section>

            <section className="feed">
                <div className="card-post">
                    <header>
                        <img src={fotoPerfil} alt="Foto de perfil"/>

                        <strong>Fulanilson</strong>
                        <p> em 12/12/2012</p>
                        <FiGithub className="icon" size={20}/>
                    </header>

                    <body>
                        <strong>
                            Aqui é a minha pergunta
                        </strong>

                        <p>
                            Aqui é a descrição da minha pergunta
                        </p>

                        <img src={imgPost} alt="Imagem do post"/>
                    </body>

                    <footer>
                        <h1>Comentários</h1>

                        <section>
                            <header>
                                <img src={fotoPerfil} alt="Foto de perfil"/>

                                <strong>Ciclanilson</strong>
                                <p> em 12/12/2012 às 13:00</p>
                            </header>

                            <p>Isso é um comentáriooooooooooooooooooooooo!!!</p>
                        </section>
                    </footer>
                </div>
            </section>
        </div>
    </div>
  );
}

export default home;