import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Categoria from '../../category/CategoryTour';

function ModalEditTour({ tourData, handleSave }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [tourDataModified, setTourDataModified] = useState({
        ...tourData,
        categoria: parseInt(tourData.categoria, 10) || 0,
        dificultad: (() => {
            switch (tourData.dificultad) {
                case "Alta":
                    return "ALTA";
                case "Media-Alta":
                    return "MEDIA_ALTA";
                case "Media":
                    return "MEDIA";
                case "Media-Baja":
                    return "MEDIA_BAJA";
                case "Baja":
                    return "BAJA";
                default:
                    return "";
            }
        })(),
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        let parsedValue = value;

        if (id === "precioAdulto" || id === "precioMenor" || id === "categoria") {
            parsedValue = parseInt(value);
        }

        setTourDataModified({ ...tourDataModified, [id]: parsedValue });
    };

    const handleButtonSave = () => {
        handleSave(tourDataModified);
        handleClose();
    }

    return (
        <>
            <button className="btn-svg" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
            </button>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{tourDataModified.titulo}</Modal.Title>
                    <h6 className="pl-2">{tourDataModified.subtitulo}</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Duración en días*</small>
                                <input className="form-control" id="duracion" type="number" value={tourData.duracion} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Dificultad*</small>
                                <select className="form-control" id="dificultad" value={tourDataModified.dificultad} onChange={handleChange} required>
                                    <option value="">Seleccione...</option>
                                    <option value="ALTA">Alta</option>
                                    <option value="MEDIA_ALTA">Media-Alta</option>
                                    <option value="MEDIA">Media</option>
                                    <option value="MEDIA_BAJA">Media-Baja</option>
                                    <option value="BAJA">Baja</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-3">
                                <Categoria tourData={{ categoria: tourDataModified.categoria, categoriaNom: tourData.categoria }} handleChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Precio por adulto*</small>
                                <input className="form-control" id="precioAdulto" type="number" value={tourDataModified["precioAdulto"]} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Precio por menores*</small>
                                <input className="form-control" id="precioMenor" type="number" value={tourDataModified["precioMenor"]} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cerrar </Button>
                    <Button variant="primary" onClick={handleButtonSave}> Guardar </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalEditTour.propTypes = {
    tourData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        titulo: PropTypes.string.isRequired,
        subtitulo: PropTypes.string.isRequired,
        precioBase: PropTypes.number.isRequired,
        precioAdulto: PropTypes.number.isRequired,
        precioMenor: PropTypes.number.isRequired,
        categoria: PropTypes.string.isRequired,
        duracion: PropTypes.number.isRequired,
        dificultad: PropTypes.string.isRequired,
    }).isRequired,
    handleSave: PropTypes.func.isRequired
};

export default ModalEditTour;