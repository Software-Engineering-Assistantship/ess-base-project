import React from "react";
import { ButtonWrapper } from "./style";

interface ButtonProps {
  primary?: boolean;
  customStyle?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  primary,
  customStyle,
  children,
  onClick,
  isActive,
}) => {
  return (
    <ButtonWrapper
      primary={primary}
      style={{
        ...customStyle,
      }}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  );
};

export default ButtonComponent;
