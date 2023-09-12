import styled from 'styled-components';

type StyledInputProps = {
  disabled?: boolean;
}

const Input = styled.input`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #2C2F3480;
  border-radius: 4px ;
  outline: none;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: ${'7px'};
  ::placeholder {
    font-weight: 400;
    font-family:'Montserrat', sans-serif;
    opacity: 0.5;
  };
  opacity: ${({ disabled }: StyledInputProps) => disabled ? 0.4 : 1};
`;

Input.defaultProps = {

}

const MoneyContainer = styled.div`
  margin-top: -31px;
  margin-left: 10px;
  margin-right: 20px;
  width: max-content;

  opacity: 0.7;
`;

const Label = styled.label`
font-size: 0.9rem;
font-family: 'Montserrat', sans-serif;
margin: 0;
font-weight: 600;
margin-bottom: 4px;
height: 20px;
`;

const SearchContainer = styled.div`
  margin-top: -31px;
  margin-left: 10px;
  width: max-content;
  opacity: 0.7;
`;

type StyledInputContainer = {
  noMargin?: boolean;
}

const InputContainer = styled.div`
  width: 100%;
  margin-right: ${({ noMargin }: StyledInputContainer) => noMargin ? '0px' : '25px'};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`
export { Input, InputContainer, Label, SearchContainer, MoneyContainer, };
