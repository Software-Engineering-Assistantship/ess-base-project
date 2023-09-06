import React, { useState } from 'react';
import ButtonComponent from "../Button/ButtonComponent";
import {
  PageWrapper,
  TopBar,
  LogoImage,
  UserImage,
  NavButtons,
  ButtonsDiv,
} from "./style";

import Logo from "../../assets/Logo.png";
import user from "../../assets/user.png";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    if (buttonName === activeButton) {
      // Se o botão clicado já estiver ativo, desative-o
      setActiveButton(null);
    } else {
      // Caso contrário, ative-o
      setActiveButton(buttonName);
    }
  };

  const customButtonLogo = {
    backgroundColor: "transparent",
    border: "none",
  };

  const customButtonUser = {
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    marginRight: "30px",
  };

  return (
    <PageWrapper>
      <TopBar>
        <NavButtons>
          <Link to="/">
            <ButtonComponent customStyle={customButtonLogo}>
              <LogoImage src={Logo} alt="Logo" />
            </ButtonComponent>
          </Link>

          <ButtonsDiv>
            <Link to="/">
              <ButtonComponent
                customStyle={{
                backgroundColor: "transparent",
                color: "black",
                width: "fit-content",
                border: "none",
                fontSize: "20px",
                borderBottom: activeButton === "Reviews" ? "1px solid black" : "none", // Aplica a linha quando Reviews for verdadeiro
              }}
                isActive={activeButton === "Reviews"} // Verifique se o botão Reviews está ativo
                onClick={() => handleButtonClick("Reviews")}
              >
                Reviews
              </ButtonComponent>
            </Link>
            
            <Link to="/in-high">
              <ButtonComponent
                customStyle={{
                backgroundColor: "transparent",
                color: "black",
                width: "fit-content",
                border: "none",
                fontSize: "20px",
                borderBottom: activeButton === "Em Alta" ? "1px solid black" : "none",}} // Aplica a linha quando Em Alta for verdadeiro
                isActive={activeButton === "Em Alta"} // Verifique se o botão Em Alta está ativo
                onClick={() => handleButtonClick("Em Alta")}
              >
                Em Alta
              </ButtonComponent>
            </Link>

            <Link to="/most-listened">
              <ButtonComponent
                customStyle={{
                backgroundColor: "transparent",
                color: "black",
                width: "fit-content",
                border: "none",
                fontSize: "20px",
                borderBottom: activeButton === "Mais Escutadas" ? "1px solid black" : "none", // Aplica a linha quando Mais Escutadas for verdadeiro
                }}
                isActive={activeButton === "Mais Escutadas"} // Verifique se o botão Mais Escutadas está ativo
                onClick={() => handleButtonClick("Mais Escutadas")}
              >
                Mais Escutadas
              </ButtonComponent>
            </Link>
          </ButtonsDiv>
          
          <Link to="/edition">
            <ButtonComponent customStyle={customButtonUser}>
              <UserImage src={user} alt="User" />
              Ana
            </ButtonComponent>
          </Link>

        </NavButtons>
      </TopBar>
    </PageWrapper>
  );
};

export default Header;
