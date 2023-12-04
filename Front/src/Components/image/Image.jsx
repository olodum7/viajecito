import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ id }) => {
    Image.propTypes = {
        id: PropTypes.number.isRequired
    }

    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        fetch(`http://3.82.3.215:8089/imagen/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('La solicitud de la imagen no fue exitosa');
                }
            })
            .then((data) => {
                if (data && data.mensaje) {
                    const parts = data.mensaje.split('/');
                    const lastPartEncoded = encodeURIComponent(parts.pop());
                    const encodedURL = parts.join('/') + '/' + lastPartEncoded;
                    setImageURL(encodedURL);
                } else {
                    throw new Error('URL no encontrada en la respuesta');
                }
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
