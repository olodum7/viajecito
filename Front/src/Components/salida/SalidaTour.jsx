import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const SalidaTour = ({ salidaData, onSalidaDataChange }) => {
    const [localSalidaData, setLocalSalidaData] = useState({
        dias: "",
        fechaDesde: "",
        fechaHasta: ""
    });

    const [daysWeek, setDaysWeek] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    })

    useEffect(() => {
        setLocalSalidaData({
            ...localSalidaData,
            ...salidaData
        });
    }, [salidaData]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        if (
            name === 'monday' ||
            name === 'tuesday' ||
            name === 'wednesday' ||
            name === 'thursday' ||
            name === 'friday' ||
            name === 'saturday' ||
            name === 'sunday'
        ) {
            setDaysWeek((prevDaysWeek) => ({
                ...prevDaysWeek,
                [name]: checked,
            }));
        }
    };

    useEffect(() => {
        const updatedSalidaData = {
            ...localSalidaData,
            dias: getSelectedDays(),
        };
        onSalidaDataChange(updatedSalidaData);
    }, [daysWeek]);

    const getSelectedDays = () => {
        return Object.keys(daysWeek)
            .map((day) => (daysWeek[day] ? '1' : '0'))
            .join(',');
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        const updatedSalidaData = {
            ...localSalidaData,
            [name]: value,
        };

        onSalidaDataChange(updatedSalidaData);
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h2>Salidas</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="label-checkbox">
                            <input className="form-check-input" name="monday" type="checkbox" checked={daysWeek.monday} onChange={handleCheckboxChange} />
                            Lunes
                        </label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="label-checkbox">
                            <input className="form-check-input" name="tuesday" type="checkbox" checked={daysWeek.tuesday} onChange={handleCheckboxChange} />
                            Martes</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="label-checkbox">
                            <input className="form-check-input" name="wednesday" type="checkbox" checked={daysWeek.wednesday} onChange={handleCheckboxChange} />
                            Miércoles</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="label-checkbox">
                            <input className="form-check-input" name="thursday" type="checkbox" checked={daysWeek.thursday} onChange={handleCheckboxChange} />
                            Jueves</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="label-checkbox">
                            <input className="form-check-input" name="friday" type="checkbox" checked={daysWeek.friday} onChange={handleCheckboxChange} />
                            Viernes</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="label-checkbox">
                            <input className="form-check-input" name="saturday" type="checkbox" checked={daysWeek.saturday} onChange={handleCheckboxChange} />
                            Sábado</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="label-checkbox">
                            <input className="form-check-input" name="sunday" type="checkbox" checked={daysWeek.sunday} onChange={handleCheckboxChange} />
                            Domingo</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group mb-3">
                        <label>Fecha de salida desde:</label>
                        <input type="date" className="form-control" name="fechaDesde"
                            value={localSalidaData.fechaDesde} onChange={handleDateChange} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label>Fecha de salida hasta:</label>
                        <input type="date" className="form-control" name="fechaHasta"
                            value={localSalidaData.fechaHasta} onChange={handleDateChange} />
                    </div>
                </div>
            </div>
        </>
    )
}

SalidaTour.propTypes = {
    salidaData: PropTypes.shape({
        dias: PropTypes.string.isRequired,
        fechaDesde: PropTypes.string.isRequired,
        fechaHasta: PropTypes.string.isRequired
    }).isRequired,
    onSalidaDataChange: PropTypes.func.isRequired
};

export default SalidaTour;