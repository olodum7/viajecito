import React, {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import '../style/Detail.css'

export function Detail () {
    const { id } = useParams();
    const [tour, setTour] = useState({}); 

    
    const getTour = async () => {
    const response = await fetch(`https://localhost:8089/tour/${id}`);
    const data = await response.json();
    setTour(data);
  }

  useEffect(() => {
    getTour()
  })


    return (
        <div className="caja">
            <div className='S1-Imagenes'>
                <h3 className="Imagen">img</h3>
                <div className="Imagen">img</div>
            </div>

            <div className='S2-Datos'>
                <div className='A1-Info'>
                    <h1>Titulo</h1>
                    <hr />
                    <h3>El paquete incluye:</h3>
                    <ul>
                        <li>Desayuno</li>
                        <li>Pasaje</li>
                    </ul>
                    <hr />
                    <h3>Opcionales</h3>
                    
                    {/* <p>la categoria es: {tour.categoria}</p>*/}
                </div>

                <div className='A2-Cantidad'>
                    <h3>Cantidad</h3>
                    <h3>Fechas</h3>
                    <h3>USD</h3>
                </div>
            </div>

            <hr />

            <div className='S3-Itinerario'>
                <h2>Itinerario</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolor placeat vero eos, nostrum excepturi cumque quod velit hic dolorem, nesciunt accusamus, architecto perferendis a quibusdam esse nisi magnam mollitia.</p>
                    
            </div>

            {/*tour.name - tour.img....*/}
            
        </div>
    )

}