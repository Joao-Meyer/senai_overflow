import styled from 'styled-components';

export const Alert = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 0px;
  height: 60px;
  margin: 10px;

  z-index: 19;

  transition: width 0.2s;

  background-color: ${props => props.tipo === "sucesso ? `var(--alertSucesso)` : `var(--alertErro)`"};

  > h1 {
      font-size: 18px;
      font-weight: 500;
      margin: 10px;

      color: var(--primary);
  }

  > p {

  }
`;