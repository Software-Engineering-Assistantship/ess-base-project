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
  background-color: ${props => (props.primary ? 'blue' : 'white')};
  color: ${props => (props.primary ? 'white' : 'black')};
  font-size: 1em;
  padding: 0;
  border: 2px solid blue;
  border-radius: 3px;
  cursor: pointer;

`;




