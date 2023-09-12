import React from "react";
import {
  SearchMainDiv,
  SearchFilterWrapper,
  SearchInput,
  FilterButton,
  FilterImage,
  DropdownFilter,
  LupaImage,
} from "./style";
import filter from "../../assets/filter.png";
import Lupa from "../../assets/Lupa.png";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  searchQuery: string; // Adicione esta propriedade
}

const SearchFilterComponent: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilter,
  searchQuery,
}) => {
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    onSearch(query);
  };

  const [showDropdown, setShowDropdown] = React.useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <SearchMainDiv>
      <SearchFilterWrapper>
      <LupaImage src={Lupa} alt="lupa" />
        <SearchInput
          type="text"
          placeholder="Pesquisar"
          onChange={handleSearch}
        />
        <FilterButton onClick={onFilter}>
          <FilterImage onClick={handleDropdown} src={filter} alt="filter" />
          <DropdownFilter
            style={showDropdown ? { display: "flex" } : { display: "none" }}
          >
            <div>
            
              <label htmlFor="cars1">Gênero</label>
              <div style={{ marginBottom: "5px" }}></div>
              <select name="cars1" id="cars1">
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
              <div style={{ marginBottom: "5px" }}></div>
              <label htmlFor="cars2">Ano de Lançamento</label>
              <div style={{ marginBottom: "5px" }}></div>
              <select name="cars2" id="cars2">
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
    </SearchMainDiv>
  );
};

export default SearchFilterComponent;