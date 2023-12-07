import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Itinerary from "../../itinerary/Itinerary";

function ModalItinerario({itinerario}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn" onClick={handleShow}> Ver itinerario </button>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Itinerario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-itinerary">
                        <Itinerary itineraryText={itinerario} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cerrar </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalItinerario.propTypes = {
    itinerario: PropTypes.string
};

export default ModalItinerario;