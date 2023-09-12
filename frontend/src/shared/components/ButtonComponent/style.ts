import styled from 'styled-components';

interface ButtonWrapperProps {
    primary?: boolean;
    width?: string;
    height?: string;
    text?: string;
    textColor?: string;
    fontSize?: string;
    backgroundColor?: string;
    backgroundOpacity?: string;
    opacity?: string;
    border?: string;
    borderColor?: string;
    marginBottom?: string;
    marginRight?: string,
    onPress?: () => void;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  background-color: ${props => (props.primary ? 'black' : 'white')};
  color: ${props => (props.primary ? 'white' : 'black')};
  font-size: 1em;
  padding: 0;
  border-bottom:none;
  cursor: pointer;
  
  transition: all 0.2s ease-in;

  &:hover {
    color: white !important;
  }

`;




