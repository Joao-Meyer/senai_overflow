import React, { useState } from 'react';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handlerEmail = (event) => {
    setEmail(event.target.value);
  }
  
  const handlerSenha = (event) => {
    setSenha(event.target.value);
  }

  const entrar = async () => {
    const retorno = await fetch("http://localhost:3333/sessao", {
      method: "POST",
      body: JSON.stringify({
        email, 
        senha
      })
    });

    console.log(retorno.json());
  }

  return (
    <>
      <input
        type="text"
        value={email} 
        onChange={handlerEmail}
        placeholder="Insira seu email"
      />

      <input
        type="text"
        value={senha}
        onChange={handlerSenha}
        placeholder="Insira sua senha"
      />

      <button onClick={()=>{
          entrar();
        }
      }>Teste</button>

      <p>{email}</p>
    </>
  );
}

function App() {
  return (
    <>
      <Login/>
    </>
  );
}

export default App;
