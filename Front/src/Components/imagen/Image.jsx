import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Imagen = ({ id }) => {

    const placeholder =
    'https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'


    Imagen.propTypes = {
        id: PropTypes.number.isRequired
    }

    const [imageURL, setImageURL] = useState(null);
    useEffect(() => {

        const idAsLong = Number(id); // Convierte id en un número
        if (isNaN(idAsLong)) {
            console.error('El valor de id no es un número válido');
            return;
        }

        fetch(`http://localhost:8089/imagen/${idAsLong}`)
            .then((response) => {
                if (response.ok) {
                    return response.blob(); // Convertir la respuesta en un objeto Blob
                } else {
                    throw new Error('La solicitud de la imagen no fue exitosa');
                }
            })
            .then((blob) => {
                const objectURL = URL.createObjectURL(blob); // Crear una URL del Blob
                setImageURL(objectURL); // Establecer la URL de la imagen en el estado
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return (
        <img src={imageURL ? imageURL : placeholder} alt="Imagen" />
    );
}

export default Imagen;

