import styled from "styled-components";

export const SearchMainDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const SearchFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 40px;
  width: 100%;
  max-width: 700px;

`;

export const SearchInput = styled.input`
  width: 90%;
  padding: 5px 5px 5px 12px;
  border: none;
  border-radius: 40px;
  background-color: transparent;

  // O '&:focus' é o mesmo que 'SearchInput:focus' (se não me engano, é uma funcionalidade do styled-components)
  &:focus-visible,
  :focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

export const FilterButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;

  position: relative;
`;

export const FilterImage = styled.img`
  background-color: transparent;
  border: none;
  width: 20px;
  cursor: pointer;
`;
export const LupaImage = styled.img`
  background-color: transparent;
  border: none;
  width: 30px;
  cursor: pointer;
`;


export const DropdownFilter = styled.div`
  position: absolute;
  top: 22px;

  flex-direction: column;
  align-items: start;
  justify-content: center;
  text-align: left;

  background-color: pink;

  border-radius: 10px;
  padding: 10px;
  width: 150px
`;