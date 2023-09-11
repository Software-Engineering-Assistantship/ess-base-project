import React from "react";
import {
  SearchMainDiv,
  SearchFilterWrapper,
  SearchInput,
  FilterButton,
  FilterImage,
  DropdownFilter,
  LupaImage,
  Results,
  ResultItem,
} from "./style"; // Importando estilos e elementos visuais
import filter from "../../assets/filter.png"; // Importando a imagem do ícone de filtro
import Lupa from "../../assets/Lupa.png"; // Importando a imagem da lupa
import axios from "axios";

interface SearchResult {
  id: number;
  title: string;
  artist: string;
}

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  searchQuery: string;
}

interface SearchFilterProps {
  onSearch: (query: string) => void; // Função de busca
  onFilter: () => void; // Função de filtro
  searchQuery: string; // Consulta de busca
}

const SearchFilterComponent: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilter,
  searchQuery,
}) => {
  // Função chamada quando o input de pesquisa é alterado
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    onSearch(query); // Se ainda quiser usar onSearch para alguma lógica
    await fetchData();
  };

  // Estado para controlar a visibilidade do dropdown
  const [showDropdown, setShowDropdown] = React.useState(false);

  const [selectedGenre, setSelectedGenre] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState('');

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.currentTarget.value);
  };
  
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.currentTarget.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/search', {
        params: {
          query: searchQuery,
          genre: selectedGenre,
          year: selectedYear,
        },
      });
      
      const data: SearchResult[] = response.data;
      setSearchResults(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Função chamada quando o botão de filtro é clicado
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <SearchMainDiv>
      <SearchFilterWrapper>
        {/* Imagem da lupa */}
        <LupaImage src={Lupa} alt="lupa" />

        {/* Input de pesquisa */}
        <SearchInput
          type="text"
          placeholder="Pesquisar"
          onChange={handleSearch}
        />

        {/* Botão de filtro */}
        <FilterButton onClick={onFilter}>
          {/* Ícone de filtro */}
          <FilterImage onClick={handleDropdown} src={filter} alt="filter" />

          {/* Dropdown de filtros */}
          <DropdownFilter
            style={showDropdown ? { display: "flex" } : { display: "none" }}
          >
            <div>
              {/* Dropdown para selecionar gênero */}
              <label htmlFor="cars1">Gênero</label>
              <div style={{ marginBottom: "5px" }}></div>
              <select name="cars1" id="cars1" onChange={handleGenreChange}>
                {/* Opções de gênero */}
                <option value="Pop">Pop</option>
                <option value="MPB">MPB</option>
                <option value="Rap">Rap</option>
                <option value="Bossa Nova">Bossa Nova</option>
                <option value="Rock">Rock</option>
                <option value="Sertanejo">Sertanejo</option>
                <option value="Funk">Funk</option>
                <option value="Pagode">Pagode</option>
                <option value="Samba">Samba</option>
                <option value="Forró">Forró</option>
                <option value="Eletrônica">Eletrônica</option>
                <option value="Reggae">Reggae</option>
                <option value="Trap">Trap</option>
                <option value="Axé">Axé</option>

              </select>
      
            </div>

            <div>
              {/* Dropdown para selecionar ano de lançamento */}
              <div style={{ marginBottom: "5px" }}></div>
              <label htmlFor="cars2">Ano de Lançamento</label>
              <div style={{ marginBottom: "5px" }}></div>
              <select name="cars2" id="cars2"  onChange={handleYearChange}>
                {/* Opções de ano de lançamento */}
                <option value="Anos 80">Anos 60</option>
                <option value="Anos 80">Anos 70</option>
                <option value="Anos 80">Anos 80</option>
                <option value="Anos 90">Anos 90</option>
                <option value="2000-2004">2000-2004</option>
                <option value="2005-2009">2005-2009</option>
                <option value="2010-2014">2010-2014</option>
                <option value="2015-2017">2015-2017</option>
                <option value="2018-2020">2018-2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>

          </DropdownFilter>
        </FilterButton>
      </SearchFilterWrapper>

      <Results>
        {searchResults.length > 0 ? (
          <div>
            <h2>Resultados da Pesquisa:</h2>
            <ul>
              {searchResults.map(result => (
                <ResultItem key={result.id}>
                  <strong>Título:</strong> {result.title} <br />
                  <strong>Artista:</strong> {result.artist}
                  {/* Renderize outros campos conforme necessário */}
                </ResultItem>
              ))}
            </ul>
          </div>
        ) : (
          <div>Nenhum resultado encontrado</div>
        )}
      </Results>

    </SearchMainDiv>
  );
};

export default SearchFilterComponent;