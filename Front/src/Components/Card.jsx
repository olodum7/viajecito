import React from 'react';
import '../index.css'
import '../style/Card.css'
import { Link } from "react-router-dom";
import Imagen from './Imagen';

const Card = ({ id, nombre, descripcion, precio, categoria, imagenes }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="img">
                    <Imagen nombre={imagenes[0].nombre} />
                </div>
                <p>{categoria}</p>
            </div>

            <div className="card-body">
                <h2 className='card-h2'>{nombre}</h2>
                <h3 className='card-h3'>{descripcion}</h3>
                <p>Desde: ${precio}</p>
            </div>

            <div className="card-footer">
                <Link to={`/tour/${id}`}><p> Ver detalle </p></Link>
            </div>
        </div>
    )
}

export default Card;