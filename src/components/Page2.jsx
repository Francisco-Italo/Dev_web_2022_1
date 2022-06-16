import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Page2 = () =>
{
    let params = useParams();
    return(
        <div>
            Página 2
            <h3>Nome: {params.nome}</h3>
            <h3>ID: {params.id}</h3>
            <Link to="/">Voltar para Home</Link>
        </div>
    )
}

export default Page2;