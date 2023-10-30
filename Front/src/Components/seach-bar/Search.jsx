import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchButton from "../buttons/SearchButton";

export function Search() {
  const [country, setCountry] = useState("");
  const [people, setPeople] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePeopleChange = (event) => {
    setPeople(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar alguna acción con los valores seleccionados
  };

  return (
    <section id="search-bar" className="container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center align-items-center d-flex">
            <div className="col-lg-3">
              <div className="form-group">
                <label htmlFor="country">Lugar</label>
                <select
                  id="country"
                  name="country"
                  className="form-control"
                  value={country}
                  onChange={handleCountryChange}
                >
                  <option value="" disabled className="inactive-option">
                    ¿A dónde te gustaría ir?
                  </option>
                  <option value="usa" className="selected-option">
                    Estados Unidos
                  </option>
                  <option value="canada" className="selected-option">
                    Canadá
                  </option>
                  <option value="mexico" className="selected-option">
                    México
                  </option>
                  <option value="spain" className="selected-option">
                    España
                  </option>
                  <option value="france" className="selected-option">
                    Francia
                  </option>
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="people">Personas</label>
                <select
                  id="people"
                  name="people"
                  className="form-control"
                  value={people}
                  onChange={handlePeopleChange}
                >
                  <option value="" disabled>
                    ¿Cuántas personas viajarán contigo?
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4">
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
