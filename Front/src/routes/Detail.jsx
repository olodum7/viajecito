import React, { useEffect, useState } from "react"
import '../style/Detail.css'
import Imagen from "../Components/Imagen";

export function Detail({ id }) {
    const [result, setResult] = useState("");

    useEffect(() => {
        fetch(`https://localhost:8089/tour/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setResult(data);
            })
            .catch((error) => {
                console.error("Error al obtener los tours: \n", error)
            })
    },[]);

    return (
        <div className="caja">
            <div className='S1-Imagenes'>
                {/* {result.forEach(imagen => {
                    <Imagen nombre={imagen.nombre} />
                });
                } */}
            </div>

            <div className='S2-Datos'>
                <div className='A1-Info'>
                    <h1>{result.id}</h1>
                    <p>la categoria es: {result.categoria}</p>
                </div>
                <div className='A2-Cantidad'>
                    <h3>{result.descripcion}</h3>
                    <h3>Fechas</h3>
                    <h3>USD</h3>
                </div>
            </div>
            <hr />
            <div className='S3-Itinerario'>
                <h2>Itinerario</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolor placeat vero eos, nostrum excepturi cumque quod velit hic dolorem, nesciunt accusamus, architecto perferendis a quibusdam esse nisi magnam mollitia.</p>
            </div>
        </div>
    )
}