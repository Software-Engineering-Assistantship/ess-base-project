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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
`;