import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Image from '../Components/Image';

const Detail = () => {
    const { id } = useParams();
    const [result, setResult] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8089/tour/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setResult(data);
            })
            .catch((error) => {
                console.error("Error al obtener el detalle: \n", error)
            })
    }, [id])

    return (
        <section>
            <div>
                <div className='S1-galeria-imagenes'>
                    <div className="parte-superior-galeria">
                        <div className="image-grid">
                            {result.imagenes && result.imagenes.length > 0 && (
                                result.imagenes.map((imagen) => (
                                    <Image key={imagen} id={imagen} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className='S2-Datos'>
                    <div className='A1-Info'>
                        <h1>{result.titulo}</h1>
                        <p>Categoria : {result.subtitulo}</p>
                        <p>Precio: USD {result.precio}</p>
                        <p>Categoria: {result.categoria}</p>
                        <p>Dificultad: {result.dificultad}</p>
                        <p>Duracion: {result.duracion}</p>
                    </div>
                </div>
            </div >
        </section>
    );
};

export default Detail;