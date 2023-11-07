//import { Link } from "react-router-dom";
//import Image from './Image';
import React from "react";
import Category_pills from "./../category/CategoryPills";
import Button from "../buttons/button/Button";
import FavButton from "./../favs/FavButton";

{
  /*const Card = ({ id, nombre, descripcion, imagenes }) => { */
}
const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="img-wrapper">
        <img src={data.image} />
        <Category_pills url="#" categoryName="Categoría"/>
        <FavButton/>
      </div>
      <div className="card-body">
        <div className="card-headers">
          <h2 className="card-h2">{data.title}</h2>
          <h3 className="mt-2 mb-5">{data.subtitle}</h3>
        </div>
        <div className="card-details">
          <div className="row card-price">
            <div className="col">
              <p className="d-flex align-items-center">
                Desde <strong>USD {data.price}</strong>
              </p>
            </div>
            <div className="col-12 col-md-6 btn-container">
              <Button url={`tour/${data.id}`} buttonName="Reservar"/>
            </div>
          </div>
          <div className="card-footer">
            <div className="rating">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-star-filled"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                  strokeWidth="0"
                  fill="currentColor"
                ></path>
              </svg>
              {data.rating}
            </div>
            <div className="duration">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-clock-hour-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 12l2 3"></path>
                <path d="M12 7v5"></path>
              </svg>
              {data.duration}
            </div>
            <div className="difficulty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trekking"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M7 21l2 -4"></path>
                <path d="M13 21v-4l-3 -3l1 -6l3 4l3 2"></path>
                <path d="M10 14l-1.827 -1.218a2 2 0 0 1 -.831 -2.15l.28 -1.117a2 2 0 0 1 1.939 -1.515h1.439l4 1l3 -2"></path>
                <path d="M17 12v9"></path>
                <path d="M16 20h2"></path>
              </svg>
              {data.difficulty}
            </div>
            <div className="releases">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-calendar-plus"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
                <path d="M16 3v4"></path>
                <path d="M8 3v4"></path>
                <path d="M4 11h16"></path>
                <path d="M16 19h6"></path>
                <path d="M19 16v6"></path>
              </svg>
              {data.releases}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

{
  /*
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
    </div> */
}
