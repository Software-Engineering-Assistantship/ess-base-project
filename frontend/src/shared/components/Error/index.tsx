import React from "react";
import {
    SadImg,
    ErrorContainer,
    ErrorMsg,
    ErrorOtherMsg
} from "./style";
import SadFace from "../../../shared/assets/SadFace.png";

const Error: React.FC = () => {
    return (
        <ErrorContainer>
            <SadImg src={SadFace} alt="SadFace" />
            <ErrorMsg>Oooops! Parece que estamos enfrentando problemas ao localizar sua pesquisa.</ErrorMsg>
            <ErrorOtherMsg>Tente refazer a busca.</ErrorOtherMsg>
        </ErrorContainer>
    )
};
export default Error;