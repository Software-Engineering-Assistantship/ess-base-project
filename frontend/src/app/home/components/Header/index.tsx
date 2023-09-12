import React from "react";
import ButtonComponent from "../../../../shared/components/ButtonComponent";
import {
  PageWrapper,
  TopBar,
  LogoImage,
  UserImage,
  NavButtons,
  ButtonsDiv,
} from "./style";
import Logo from "../../../../shared/assets/Logo.png";
import user from "../../../../shared/assets/user.png";

const Header: React.FC = () => {
  const customButtonStyle = {
    backgroundColor: "transparent",
    color: "black",
    width: "fit-content",
    border: "none",
    fontSize: "20px",
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
            <ButtonComponent customStyle={customButtonStyle}>
              Reviews
            </ButtonComponent>
            <ButtonComponent customStyle={customButtonStyle}>
              Em Alta
            </ButtonComponent>
            <ButtonComponent customStyle={customButtonStyle}>
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
