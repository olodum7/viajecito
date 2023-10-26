import React, {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import '../style/ImageGallery.css'


//las importé así porque no sabía cómo usar la API:
import image1 from './imagenesPrueba/1.jpg';
import image2 from './imagenesPrueba/2.jpg';
import image3 from './imagenesPrueba/3.jpg';
import image4 from './imagenesPrueba/4.jpg';
import image5 from './imagenesPrueba/5.jpg';
//la carpeta de estas imágenes provisorias está dentro de "routes"

const images = [image1, image2, image3, image4, image5];

export function ImageGallery(){
    return (
        <div className="image-gallery">
          {images.map((image, index) => (
            <div key={index} className="image-gallery-container">
            <img className="img-2" src={image} alt={`Image ${index}`} />
          </div>
          ))}
        </div>
      );
}