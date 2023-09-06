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
          <ButtonComponent customStyle={customButtonLogo}>
            <LogoImage src={Logo} alt="Logo" />
          </ButtonComponent>

          <ButtonsDiv>
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
          </ButtonsDiv>

          <ButtonComponent customStyle={customButtonUser}>
            <UserImage src={user} alt="User" />
            Ana
          </ButtonComponent>

        </NavButtons>
      </TopBar>
    </PageWrapper>
  );
};

export default Header;
