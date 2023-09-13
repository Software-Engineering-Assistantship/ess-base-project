import React, {useEffect} from "react";
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
  ResultItemsDiv,
  ResultMsg,
} from "./style"; // Importando estilos e elementos visuais
import filter from "../../assets/filter.png"; // Importando a imagem do ícone de filtro
import Lupa from "../../assets/Lupa.png"; // Importando a imagem da lupa
import axios from "axios";
import MusicCard from "../MusicCard";
import Error from "../Error";

interface SearchResult {
  id: number;
  title: string;
  artist: string;
  available_on: object;
  image_uri: string;
  popularity: number;
  release_year: number;
}
interface ReponseTrue {
  albums: SearchResult[];
  songs: SearchResult[];
}
interface ResultReponse {
  data: ReponseTrue[];
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
    // onSearch(query); // Se ainda quiser usar onSearch para alguma lógica
    setQueryText(query);
    // await fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  // Estado para controlar a visibilidade do dropdown
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [queryText, setQueryText] = React.useState('');
  const [isEmpty, setIsEmpty] = React.useState(true);

  const [selectedGenre, setSelectedGenre] = React.useState('Nenhum');
  const [selectedYear, setSelectedYear] = React.useState('Nenhum');

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.currentTarget.value);
  };
  
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.currentTarget.value);
  };
  // response is a lsit of objects, create a interface for it

  const handleResponse = (response: ResultReponse) => {
    const aux = [];
    response.albums.forEach((album) => {
      // album.image_url = 'https://akamai.sscdn.co/uploadfile/letras/fotos/5/2/6/6/5266e6a16b5fe4501de0d70cb2935f48.jpg'
      aux.push(album);
    }
    );
    response.songs.forEach((song) => {
      // song.image_url = 'https://akamai.sscdn.co/uploadfile/letras/fotos/5/2/6/6/5266e6a16b5fe4501de0d70cb2935f48.jpg'

      aux.push(song);
    }
    );

    setSearchResults(aux);
  };
  const fetchData = async () => {
    console.log(queryText);
    console.log(selectedGenre);
    console.log(selectedYear);
    try {
      const queryToBeUsed = queryText === '' ? ' ' : queryText;
      const genreToBeUsed = selectedGenre === 'Nenhum' ? ' ' : selectedGenre;
      const yearToBeUsed = selectedYear === 'Nenhum' ? 199 : selectedYear;
      if(queryText === '' && selectedGenre === 'Nenhum' && selectedYear === 'Nenhum'){ 
        setIsEmpty(true);
        console.log("entrei")
      } else {
        const response = await axios.get('http://127.0.0.1:8000/search/search', {
          params: {
            'name': queryToBeUsed,
            'genre': genreToBeUsed,
           'year': Number(yearToBeUsed),
          },
        });
        
        const data: SearchResult[] = response.data;
        console.log('---------------');
        console.log(data);
        console.log('---------------');
        handleResponse(response.data);
        if(data.albums.length == 0 && data.songs.length == 0) {
          setIsEmpty(false);
        }
      }
      // setSearchResults(data);
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
        <LupaImage src={Lupa} alt="lupa" onClick={() => fetchData()}/>

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
                <option value="Nenhum">Nenhum</option>
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
              <input type="number" name="cars2" id="cars2" onChange={handleYearChange}/>

            </div>

          </DropdownFilter>
        </FilterButton>
      </SearchFilterWrapper>

      <Results>
        {searchResults.length > 0 || isEmpty ? (
          <ResultItem>

              <ResultItemsDiv>
              {/* {searchResults.map(result => (
                <ResultItem key={result.id}>
                  <strong>Título:</strong> {result.title} <br />
                  <strong>Artista:</strong> {result.artist}
                </ResultItem>
              ))} */}
                {searchResults.map(result => (
                <MusicCard
                  key={result.id}
                  artist={result.artist}
                  name={result.title}
                  image={result.image_url}
                  id={result.id}
                  
                />
              ))}
              </ResultItemsDiv>
          </ResultItem>
        ) : (
            <Error />
        )}
      </Results>

    </SearchMainDiv>
  );
};

export default SearchFilterComponent;