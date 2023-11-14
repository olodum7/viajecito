import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gallery from "./../Components/gallery/Gallery";
import Image from "./../Components/image/Image.jsx";
import Breadcrumb from "./../Components/breadcrumb/Breadcrumb.jsx";
import Banner from "../Components/ui-components/banner/Banner";
import Itinerary from "../Components/itinerary/Itinerary.jsx";

const Detail = () => {
  const { id } = useParams();
  const [result, setResult] = useState({});
  const [lodging, setLodging] = useState({});

  /* Obtengo el tour */
  useEffect(() => {
    fetch(`http://localhost:8089/tour/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error("Error al obtener el detalle: \n", error);
      });
  }, [id]);

  /* Obtengo el alojamiento */
  useEffect(() => {
    if (result.alojamiento) {
      fetch(`http://localhost:8089/alojamiento/${result.alojamiento}`)
        .then((response) => response.json())
        .then((data) => {
          setLodging(data);
        })
        .catch((error) => {
          console.error("Error al obtener el alojamiento: \n", error);
        });
    }
  }, [result.alojamiento]);

  console.log(lodging.imagenes);

  return (
    <>
      <main>
        <Breadcrumb tourName={result.titulo} />
        {result.imagenes && result.imagenes.length > 0 && (
          <Gallery imagenes={result.imagenes}/>
        )}
        <section className="container" id="detail">
          <div className="row">
            <h1>{result.titulo}</h1>
            <h2> {result.subtitulo} </h2>
          </div>
          <div className="container-details">
            <h3 className="mb-4">Este paquete incluye:</h3>

            {result.pasajes && (
              <div className="row">
                <div className="fly">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-plane-departure"
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
                    <path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727z"></path>
                    <path d="M3 21h18"></path>
                  </svg>
                  Pasajes aéreos
                </div>
              </div>
            )}

            {result.traslado && (
              <div className="row">
                <div className="excursion">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-bus-stop"
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
                    <path d="M3 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
                    <path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M10 5h7c2.761 0 5 3.134 5 7v5h-2"></path>
                    <path d="M16 17h-8"></path>
                    <path d="M16 5l1.5 7h4.5"></path>
                    <path d="M9.5 10h7.5"></path>
                    <path d="M12 5v5"></path>
                    <path d="M5 9v11"></path>
                  </svg>
                  Traslados a las distintas excursiones
                </div>
              </div>
            )}

            {result.entradas && (
              <div className="row">
                <div className="tickets">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-ticket"
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
                    <path d="M15 5l0 2"></path>
                    <path d="M15 11l0 2"></path>
                    <path d="M15 17l0 2"></path>
                    <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path>
                  </svg>
                  {result.entradas}
                </div>
              </div>
            )}

            {result.guia_es && (
              <div className="row">
                <div className="guide">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-language"
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
                    <path d="M4 5h7"></path>
                    <path d="M9 3v2c0 4.418 -2.239 8 -5 8"></path>
                    <path d="M5 9c0 2.144 2.952 3.908 6.7 4"></path>
                    <path d="M12 20l4 -9l4 9"></path>
                    <path d="M19.1 18h-6.2"></path>
                  </svg>
                  Guía en español
                </div>
              </div>
            )}

            <div className="row">
              <div className="hotel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-building-skyscraper"
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
                  <path d="M3 21l18 0"></path>
                  <path d="M5 21v-14l8 -4v18"></path>
                  <path d="M19 21v-10l-6 -4"></path>
                  <path d="M9 9l0 .01"></path>
                  <path d="M9 12l0 .01"></path>
                  <path d="M9 15l0 .01"></path>
                  <path d="M9 18l0 .01"></path>
                </svg>
                Alojamiento en <em>{lodging.nombre}</em>
              </div>
              <div className="hotel-gallery mt-3">
                <div className="row" data-aos="fade-up">
                  {lodging.imagenes &&
                    lodging.imagenes.length > 0 &&
                    lodging.imagenes.slice(0, 3).map((imagen) => (
                      <div className="col-3">
                        <Image key={imagen} id={imagen} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="container-itinerary">
            <h3 className="mb-5">Itinerario</h3>
            <div className="container">
              <div className="row" data-aos="fade-up">
                <Itinerary itineraryText={result.itinerario} />
              </div>
            </div>
          </div>
        </section>
        <Banner />
      </main>
    </>
  );
};

export default Detail;
