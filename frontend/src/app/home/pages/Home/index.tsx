import React, { useState } from 'react';
import Header from '../../../../shared/components/Header';
import SearchFilterComponent from '../../../../shared/components/SearchFilterComponent';
import { Wallpaper } from './style';


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
      <Header />
      {/* A div abaixo serve para dar um espaçamento após o Header, dado que ele está com position fixed */}
      <div style={{ marginBottom: "180px" }}></div>
      <SearchFilterComponent
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchQuery={searchQuery}
      />
    </Wallpaper>
  );
};

export default Home;