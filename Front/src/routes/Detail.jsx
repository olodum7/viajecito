import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Image from '../Components/Image'
import '../assets/css/detail.css';

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
                console.error("Error al obtener los tours: \n", error)
            })
    }, [id])

    return (
        <section>
            <div>
                <div className='S1-galeria-imagenes'>
                    <div className="parte-superior-galeria">
                        <div className="image-container">
                            {/* <Image nombre={result.imagenes[0].nombre} /> */}
                        </div>
                        <div className="image-grid">
                            {/* <>
                            {result.map((image) => (
                                <Image key={image.id} nombre={image.nombre} />
                            ))}
                        </> */}
                        </div>
                    </div>
                    <div className="parte-inferior-galeria">
                        {/* <div className="ver-mas-button"> */}
                        {/* <Link to="/Gallery"> Ver más </Link> */}
                        {/* </div> */}
                    </div>
                </div>
                <div className='S2-Datos'>
                    <div className='A1-Info'>
                        <h1>{result.descripcion}</h1>
                        <p>Categoria : {result.categoria}</p>
                        <p>Precio: {result.precio}</p>
                    </div>
                </div>
            </div >
        </section>
    );
};

export default Detail;