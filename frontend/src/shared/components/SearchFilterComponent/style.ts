import styled from 'styled-components';

export const SearchFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 10px;
  width: 50%;
  margin-left: 25%;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 5px;
  border: none;
  border-radius: 3px;
`;

export const FilterButton = styled.button`
  background-color: white;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0px 0px;
  cursor: pointer;
  width: 15%;
  height: 10%;
`;

export const FilterImage = styled.img`
  background-color: white;
  border: none;
  width: 20%;
  height: 10%;
  border-radius: 3px;
  padding: 0px 0px;
  cursor: pointer;
`;