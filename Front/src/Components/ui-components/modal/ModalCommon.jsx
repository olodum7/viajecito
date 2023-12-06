import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function ModalCommon({ data, handleSave }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleButtonSave = () => {
        handleSave(data.id);
        handleClose();
    }

    return (
        <>
            <button className="btn-svg" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </button>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{data.tituloModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Seguro que desea {data.actionModal} el producto {data.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cancelar </Button>
                    <Button variant="primary" onClick={handleButtonSave}> Confirmar </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalCommon.propTypes = {
    data: PropTypes.shape({
        tituloModal: PropTypes.string.isRequired,
        actionModal: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    handleSave: PropTypes.func.isRequired
};

export default ModalCommon;