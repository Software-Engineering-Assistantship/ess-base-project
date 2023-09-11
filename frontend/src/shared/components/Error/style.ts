import styled from "styled-components";

export const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 50px;
`;

export const SadImg = styled.img`
    width: 100%;
    max-width: 200px;
    
`;

export const ErrorMsg = styled.p`
    color: black; /* Estilo da mensagem de erro */
    font-size: 18px; /* Tamanho da fonte da mensagem de erro */
    margin-top: 20px;
`;

export const ErrorOtherMsg = styled.p`
    color: black; /* Estilo da mensagem de erro */
    font-size: 18px; /* Tamanho da fonte da mensagem de erro */
    margin-top: 5px;
`;

