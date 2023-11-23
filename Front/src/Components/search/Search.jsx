import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchButton from "../buttons/SearchButton";

export function Search({ onSearchChange, onSearchSubmit, search }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
            <div className="col-12 col-lg-4">
              <div className="form-group">
                <label htmlFor="date-range">Fechas</label>
                <div className="input-daterange input-group">
                  <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleStartDateChange}
                    placeholderText="Fecha de Ida"
                  />
                  <div className="input-group-addon"></div>
                  <DatePicker
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleEndDateChange}
                    placeholderText="Fecha de Vuelta"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-1">
              <SearchButton />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
