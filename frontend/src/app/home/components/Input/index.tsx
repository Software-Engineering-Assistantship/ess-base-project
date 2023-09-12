import React from 'react';
import Image from '../Image';

import {
  Input,
  InputContainer,
  Label,
  SearchContainer,
} from './styles';

type Props = {
  onChange: Function;
  value?: string;
  placeholder: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  type?: boolean;
  isAdjustStock?: boolean;
  style?: React.CSSProperties;
  noMargin?: boolean;
};

function RegisterInput({
  onChange,
  value,
  placeholder,
  label,
  id,
  disabled = false,
  type,
  style,
  noMargin,
}: Props) {
  return (
    <InputContainer style={style} className="input-container" noMargin={noMargin}>
      {label && <Label htmlFor={id}>{label}</Label>}

      {
        <Input
          disabled={disabled}
          id={id}
          type={'text'}
          required
          placeholder={placeholder}
          onChange={(e: any) => onChange(e.target.value)}
          value={value}
        />
      }
    </InputContainer>
  );
}

export default RegisterInput;
