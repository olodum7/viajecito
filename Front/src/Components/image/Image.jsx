import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ id }) => {
    Image.propTypes = {
        id: PropTypes.number.isRequired
    }

    const [imageURL, setImageURL] = useState(null);
    useEffect(() => {
        fetch(`http://54.92.136.117:8089/imagen/${id}`)
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
        <>
            <img src={imageURL} alt="Imagen" />
        </>
    );
}

export default Image;