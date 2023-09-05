import React from 'react';
import { ButtonWrapper } from './style';

interface ButtonProps {
  primary?: boolean;
  customStyle?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ primary, customStyle, children, onClick }) => {
  return (
    <ButtonWrapper primary={primary} style={customStyle} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export default ButtonComponent;
