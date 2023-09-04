import React from 'react';
import ButtonComponent from '../../../../shared/components/Button/ButtonComponent';
import { PageWrapper, TopBar, LogoImage, UserImage, NavButtons} from './style';
import Logo from '../../../../shared/assets/Logo.png';
import user from '../../../../shared/assets/user.png';

const Header: React.FC = () => {
  const customButtonStyle = {
    backgroundColor: 'transparent',
    color: 'black',
    border: 'none',
    fontSize: '20px',
  };

  const customButtonLogo = {
    backgroundColor: 'transparent',
    border: 'none',
    margin: '0px',
    width: '30%',
    height: '30%',
  };

  const customButtonUser = {
    backgroundColor: 'transparent',
    border: 'none',
    width: 'auto',
    fontSize: '20px',
  };

  return (
    <PageWrapper>
      <TopBar>
        <NavButtons>

          <ButtonComponent customStyle={customButtonLogo}>
            <LogoImage src={Logo} alt="Logo" /> 
          </ButtonComponent>

          <ButtonComponent customStyle={customButtonStyle}>Reviews</ButtonComponent>
          <ButtonComponent customStyle={customButtonStyle}>Em Alta</ButtonComponent>
          <ButtonComponent customStyle={customButtonStyle}>Mais Escutadas</ButtonComponent>

          <ButtonComponent customStyle={customButtonUser}> {/*não sei porque a div ta tão grande na largura, não consegui diminuir*/}
            <UserImage src={user} alt="User" /> 
            Ana
          </ButtonComponent>

        </NavButtons>
      </TopBar>
    </PageWrapper>
  );
};

export default Header;