import { Link } from "react-router-dom";
import Image from './Image';

const Card = ({ id, nombre, descripcion, imagenes }) => {
    return (
        <div className="col">
            <div className="card card-product">
                <div className="card-header">
                    <Image nombre={imagenes[0].nombre} />
                </div>
                <div className="card-body">
                    <h4 className="card-title">{nombre}</h4>
                    <h6 className="card-subtitle">{descripcion} </h6>
                    <Link to={`tour/${id}`} className="card-link"> <p> Ver detalle </p> </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;