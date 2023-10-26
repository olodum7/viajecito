import { React, useEffect, useState } from 'react'

function Imagen({ nombre }) {
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8089/imagen/${nombre}`)
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
    }, []);

    return (
        <>
            {imageURL && <img src={imageURL} alt="Imagen" />}
        </>
    );
}

export default Imagen;

