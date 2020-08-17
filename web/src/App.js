import React, { useState } from 'react';

const Login = (props) => {
  const [email, senha, setEmail] = useState("");

  const handlerEmail = (event) => {
    setEmail(event.target.value);
  }

  const entrar = async () => {
    const retorno = await fetch("http://localhost:3333/sessao", {
      method: "POST",
      body: {
        email, 
        senha
      }
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
