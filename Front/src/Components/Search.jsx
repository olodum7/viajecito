import '../style/Search.css'
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";

export function Search(){
    const [dateRange, setDateRange] = useState([null, null]);

    const handleDateChange = (date, index) => {
        const newDateRange = [...dateRange];
        newDateRange[index] = date;
        setDateRange(newDateRange);
    };
    return (
            <div className='container-search'>
                <div className="country-date-select">
                    <label htmlFor="country">¿A dónde te gustaría viajar?:</label>
                    <select id="country" name="country">
                        <option value="">Selecciona un país</option>
                        <option value="usa">Estados Unidos</option>
                        <option value="canada">Canadá</option>
                        <option value="mexico">México</option>
                        <option value="spain">España</option>
                        <option value="france">Francia</option>
                    </select>
                </div>
                <div className="people-select">
                    <label htmlFor="people">Personas</label>
                    <select id="country" name="country">
                        <option value="">¿Cuántas personas viajan contigo?:</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                    </select>
                </div>
                <div className='range-date'>
                    <label>Selecciona el rango de fechas:</label>
                    <div>
                    <DatePicker
                        selected={dateRange[0]}
                        selectsStart
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={(date) => handleDateChange(date, 0)}
                        placeholderText="Fecha de Ida"
                    />
                    <DatePicker
                        selected={dateRange[1]}
                        selectsEnd
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={(date) => handleDateChange(date, 1)}
                        placeholderText="Fecha de Vuelta"
                    />
                    </div>
                </div>
            <button className='formButton'>Buscar</button>
        </div>
    )
}