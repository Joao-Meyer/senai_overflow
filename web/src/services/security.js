const CHAVE_ALUNO = "@aluno";

export const signIn = ( aluno ) => {
    localStorage.setItem( CHAVE_ALUNO, JSON.stringify( aluno ) );
}

export const signOut = () => {
    localStorage.clear();
}

export const issSignedIn = () => {
    const aluno = JSON.parse( localStorage.getItem( CHAVE_ALUNO ) );

    // Futuramente implementar a verificação do token

    return aluno ? true : false;
}