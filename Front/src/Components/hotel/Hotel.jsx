import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Lodging = ({ tourData, handleChange, className }) => {
    const[alojamientos, setAlojamientos] = useState([]);
    
    useEffect(() => {
        fetch("http://3.82.3.215:8089/alojamiento")
            .then((response) => response.json())
            .then((data) => {
                setAlojamientos(data);
            })
            .catch((error) => {
                console.error("Error al obtener los alojamientos: \n", error);
            });
    }, []);

    return (
        <>
        <div className="col">
                <div className="form-group mb-3">
                    <small>Alojamientos*</small>
                    <select className={`form-control ${className}`} id="alojamiento" type="number" value={tourData.alojamiento} onChange={handleChange} required>
                        <option  key={0} value={0}>Seleccione...</option>
                        {alojamientos.map((alojamiento) => (
                            <option key={alojamiento.id} value={alojamiento.id}> {alojamiento.nombre} </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

Lodging.propTypes = {
    tourData: PropTypes.shape({
        alojamiento: PropTypes.number.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string
};


export default Lodging;