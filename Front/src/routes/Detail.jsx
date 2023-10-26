import React, {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'

import {ImageGallery} from './ImageGallery';

import '../style/Detail.css';


//las importé así porque no sabía cómo usar la API:
import image1 from './imagenesPrueba/1.jpg';
import image2 from './imagenesPrueba/2.jpg';
import image3 from './imagenesPrueba/3.jpg';
import image4 from './imagenesPrueba/4.jpg';
import image5 from './imagenesPrueba/5.jpg';
//la carpeta de estas imágenes provisorias está dentro de "routes"


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
        <div>
            <div className='S1-galeria-imagenes'>
                
                <div className="parte-superior-galeria">
                    <div className="image-container">
                        <img src={image1} alt="Imagen principal" />
                    </div>

                    <div className="image-grid">
                        <img src={image2} alt="Imagen 2" />
                        <img src={image3} alt="Imagen 3" />
                        <img src={image4} alt="Imagen 4" />
                        <img src={image5} alt="Imagen 5" />
                    </div>
                </div>
                

                <div className="parte-inferior-galeria">
                    <div className="ver-mas-button">
                        <Link to="/image-gallery">
                            Ver más
                        </Link>
                    </div>
                </div>

            </div>{/* endS1-galeria-imagenes */}



            <div className='S2-Datos'>
                <div className='A1-Info'>
                    <h1>iNFO</h1>
                    <p>la categoria es: {tour.categoria}</p>
                </div>
                <div className='A2-Cantidad'>
                    <h1>CANTIDAD</h1>
                </div>
            </div>



            <div className='S3-Itinerario'>
                <h1>ITINERARIO</h1>
            </div>
        </div>                        
    )

}