import { useState } from "react";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import SearchButton from '../buttons/SearchButton'

const Search = ({ onSearchClick, startDate: propStartDate, endDate: propEndDate }) => {
  const [filter, setFilter] = useState({
    location: "",
    people: "",
    startDate: propStartDate || new Date(),
    endDate: propEndDate || addDays(new Date(), 2),
  });
export function Search({ onSearchChange, onSearchSubmit, search }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (name, value) => {
    if (name === "startDate") {
      setFilter({ ...filter, startDate: value, endDate: addDays(value, 2) });
    } else if (name === "endDate") {
      setFilter({ ...filter, endDate: value });
    } else {
      setFilter({ ...filter, [name]: value });
    }
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const keywords = ["Tailandia", "Camboya", "Vietnam", "Auroras en el norte", "Artico", "Japón", "Tradición", "Andino", "Bicicleta", "Gourmet", "Lima", "Riviera", "Maya", "Cenotes", "Ruinas", "Playas paradisíacas", "Patagonia Argentina", "Bariloche", "Chivito uruguayo", "Rio de Janeiro", "Uyuni", "Salar de Uyuni", "Bolivia"];

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    onSearchChange(value);

    if (value.length > 2) {
      // Empieza a sugerir después de 2 caracteres
      const filteredSuggestions = keywords.filter((keyword) =>
        keyword.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    onSearchClick(filter);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      onSearchSubmit();
    }
  };

  return (
    <section id="search-bar" className="container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center align-items-center d-flex">
            <div className="col-12 col-lg-7">
              <div className="form-group search-container">
                <label htmlFor="search-input">Busca tu próxima aventura</label>
                <input
                  id="search-input"
                  type="text"
                  className="form-control"
                  placeholder="Escribe el nombre del destino que deseas explorar..."
                  value={search}
                  onChange={handleSearchChange}
                />
                {showSuggestions && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="country">Lugar</label>
                <input
                  className="form-control"
                  name="location"
                  type="text"
                  placeholder="¿A dónde te gustaría ir?"
                  value={filter.location}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="form-group">
                <label htmlFor="date-range">Fechas</label>

                <div className="input-daterange input-group">
                  <DatePicker  name="startDate"
                    selected={filter.startDate}
                    onChange={(date) => handleChange("startDate", date)}
                    selectsStart
                    startDate={filter.startDate}
                    endDate={filter.endDate}
                    minDate={new Date()}
                    showIcon
                    dateFormat="dd/MM/yyyy"
                    todayButton="Hoy"
                    placeholderText="Fecha de salida"
                  />
                  <DatePicker name="endDate"
                    selected={filter.endDate}
                    onChange={(date) => handleChange("endDate", date)}
                    selectsEnd
                    startDate={filter.startDate}
                    endDate={filter.endDate}
                    showIcon
                    isClearable
                    dateFormat="dd/MM/yyyy"
                    minDate={addDays(filter.startDate, 2)}
                    todayButton="Hoy"
                    placeholderText="Fecha de retorno"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 search-button">
              <SearchButton/>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

Search.propTypes = {
  onSearchClick: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

export default Search;