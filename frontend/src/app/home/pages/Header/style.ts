import styled from 'styled-components';

export const PageWrapper = styled.div`
  background: transparent; /*linear-gradient(to bottom, #ff66c4, #ffde59)*/
  padding: 0px;
  min-height: 100vh; /* Isso garante que o gradiente cubra toda a altura da tela */
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10%;
`;

export const LogoImage = styled.img`
  width: 80%;
  height: 80%;
`;

export const UserImage = styled.img`
  width: 6%;
  height: 6%;
  padding-right: 10px;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 8%;
  align-items: center;

`;