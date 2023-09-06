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
                <option value="Anos 80">Anos 80</option>
                <option value="Anos 90">Anos 90</option>
                <option value="Anos 2000">2000-2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
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