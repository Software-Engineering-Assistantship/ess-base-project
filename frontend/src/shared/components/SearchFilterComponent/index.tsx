import React from 'react';
import { SearchFilterWrapper, SearchInput, FilterButton } from './style';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  searchQuery: string; // Adicione esta propriedade
  
}

const SearchFilterComponent: React.FC<SearchFilterProps> = ({ onSearch, onFilter, searchQuery }) => {

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
      const query = e.currentTarget.value;
      onSearch(query);
    };
  
    return (
      <SearchFilterWrapper>
        <SearchInput type="text" placeholder="Pesquisar" onChange={handleSearch} />
        <FilterButton onClick={onFilter}>Filtrar</FilterButton>
      </SearchFilterWrapper>
    );
  };

export default SearchFilterComponent;
