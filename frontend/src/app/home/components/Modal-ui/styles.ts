import styled from 'styled-components';
import { flexcc } from '../../global/styles/variables'
import Theme from '../../global/styles/theme';
import { FlexContainer } from '../../global/styles/components';
interface ButtonColor {
    color?: string;
}

export const ModalContainer = styled.div`
  padding: 25px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 3px 6px #00000029;
  z-index: 1000000000;
`;

export const Button = styled.button<ButtonColor>`
  width: 100px;
  height: 20px;
  margin-right: 20px;
  font-weight: 600;
  border: none;
  margin: 0 10px;
  font-weight: 600;
  ${flexcc};
  border-radius: 7px;
  padding: 20px 15px;
  background-color: ${({ color }) => color || 'unset'};
  color: ${({ color }) => (color === '#FFFFFF' ? 'black' : 'white')};
  ${({ disabled }) => (disabled ? 'opacity: 0.7;' : null)}
  cursor: pointer;
  outline: none;
  :hover {
    opacity: 0.7;
  }
`;
export const ExcludeButton = styled.button`
  width: 45px;
  height: 45px;
  padding: 15px;
  margin-left: 30px;
  outline: none;
  border-radius: 100px;
  ${flexcc};
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${flexcc};
  :hover {
    background-color: ${Theme.colors.gray};
  };
`;

export const Header = styled(FlexContainer)`
  margin-bottom: 10px;
  border-bottom: 1px solid ${Theme.colors.gray};
  h1 {
    font-size: 1.3rem;
  }
`;

export const Pbuttons = styled.p`
font-weight: bold;
margin: 0;
color: ${Theme.colors.black};
`

export const ButtonContainer = styled(FlexContainer)`
  background-color: white;

`;