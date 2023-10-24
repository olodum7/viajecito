import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'

const Detail = () => {
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
        <div>
            <div className='S1-Imagenes'>
                <h1>Imagenes</h1>
            </div>

            <div className='S2-Datos'>
                <div className='A1-Info'>
                    <h1>iNFO</h1>
                </div>
                <div className='A2-Cantidad'>
                    <h1>CANTIDAD</h1>
                </div>
            </div>

            <div className='S3-Itinerario'>
                <h1>ITINERARIO</h1>
            </div>
            
            {/*tour.name - tour.img....*/}
            
        </div>
    )

}
export default Detail