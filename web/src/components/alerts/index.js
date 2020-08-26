import React from 'react';

import { Alert } from './styles';

function Alerts( props ) {
    const { mensagem, tipo } = props;

    return mensagem ?
    (
       <Alert tipo={tipo}>
            <h1>{mensagem}</h1>       
       </Alert>
    ) 
    : 
    null;
}

export default Alerts;