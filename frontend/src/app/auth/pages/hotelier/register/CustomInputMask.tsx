import { forwardRef } from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { Input, InputProps } from "@chakra-ui/react";

type CustomInputMaskProps = InputMaskProps & InputProps;

const CustomInputMask = forwardRef<HTMLInputElement, CustomInputMaskProps>(
  (props, ref) => {
    return (
      <InputMask {...props} ref={ref}>
        {(inputProps) => <Input {...inputProps} />}
      </InputMask>
    );
  }
);

export default CustomInputMask;
