import styled from "styled-components";

export const PageWrapper = styled.div`
  background: transparent;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin-right: 70px;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 45vw;
  gap: 12%;
  margin-right: 100px;
`;

export const UserImage = styled.img`
  width: 40px;
  padding-right: 10px;
`; 

export const NavButtons = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
`;
