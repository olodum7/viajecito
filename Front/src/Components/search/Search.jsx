import { useState } from "react";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import SearchButton from '../buttons/SearchButton'

const Search = ({onSearchClick}) => {
  const [filter, setFilter] = useState({
    location: "",
    people: "",
    startDate: new Date(), 
    endDate: addDays(new Date(), 2),
  });
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const handleChange = (name, value) => {
    if (name === "startDate") {
      setStartDate(value);
      setEndDate(addDays(value, 2))
    }
    if (name === "endDate") {
      setEndDate(value);
    }
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    onSearchClick(filter);
  };

  return (
    <section id="search-bar" className="container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center align-items-center d-flex">
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
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="date-range">Fechas</label>

                <div className="input-daterange input-group">
                  <DatePicker  name="startDate"
                    selected={startDate}
                    onChange={(date) => handleChange("startDate", date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    showIcon
                    dateFormat="dd/MM/yyyy"
                    todayButton="Hoy"
                    placeholderText="Fecha de salida"
                  />
                  <DatePicker name="endDate"
                    selected={endDate}
                    onChange={(date) => handleChange("endDate", date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    showIcon
                    isClearable
                    dateFormat="dd/MM/yyyy"
                    minDate={addDays(startDate, 2)}
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
};

export default Search;