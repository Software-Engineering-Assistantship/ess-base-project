import React, { useState } from 'react';
import SearchFilterComponent from '../../../../shared/components/SearchFilterComponent';
import { Wallpaper } from './style';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Lógica para executar a pesquisa com base na query
  };

  const handleFilter = () => {
    // Lógica para aplicar o filtro
  };

  return (
    
    <Wallpaper>
      {/* A div abaixo serve para dar um espaçamento após o Header, dado que ele está com position fixed */}
      <div style={{ paddingBottom: "180px" }}></div>
      <SearchFilterComponent
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchQuery={searchQuery}
      />
    </Wallpaper>
  );
};

export default Home;