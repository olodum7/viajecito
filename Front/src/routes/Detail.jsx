import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from "../Components/gallery/Gallery";
import Image from "../Components/image/Image.jsx";
// import Breadcrumb from "../Components/breadcrumb/Breadcrumb";

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
        console.error("Error al obtener el detalle: \n", error)
      })
  }, [id])

  /* Obtengo el alojamiento */
  useEffect(() => {
    if (result.alojamiento) {
      fetch(`http://localhost:8089/alojamiento/${result.alojamiento}`)
        .then((response) => response.json())
        .then((data) => {
          setLodging(data);
        })
        .catch((error) => {
          console.error("Error al obtener el alojamiento: \n", error)
        })
    }
  }, [result.alojamiento])

  console.log(lodging.imagenes)

  return (
    <>
      <main className='container'>
        {/* <Breadcrumb tourName={result.titulo} /> */}
        
        {result.imagenes && result.imagenes.length > 0 && (
          <Gallery imagenes={result.imagenes} />
        )}
       
        <div className='row' >
          <div className='col-md-7'>
            <h1>{result.titulo}</h1>
            <h2> {result.subtitulo} </h2>
            <hr />
            <div className="container-details">
              <h3 className="mb-4">Este paquete incluye:</h3>

              {result.pasajes &&
                <div className="row">
                  <div className="fly">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plane-departure" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727z"></path>
                      <path d="M3 21h18"></path>
                    </svg><span>Pasajes aéreos</span>
                    
                  </div>
                </div>
              }

              {result.traslado &&
                <div className="row">
                  <div className="excursion">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bus-stop" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M3 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
                      <path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                      <path d="M10 5h7c2.761 0 5 3.134 5 7v5h-2"></path>
                      <path d="M16 17h-8"></path>
                      <path d="M16 5l1.5 7h4.5"></path>
                      <path d="M9.5 10h7.5"></path>
                      <path d="M12 5v5"></path>
                      <path d="M5 9v11"></path>
                    </svg><span>Traslados a las distintas excursiones</span>
                    
                  </div>
                </div>
              }

              {result.entradas &&
                <div className="row">
                  <div className="tickets">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ticket" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M15 5l0 2"></path>
                      <path d="M15 11l0 2"></path>
                      <path d="M15 17l0 2"></path>
                      <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path>
                    </svg><span>Entradas a Cristo Redentor y Pan de Azúcar</span>
                    
                  </div>
                </div>
              }

              {result.guia_es &&
                <div className="row">
                  <div className="guide">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-language" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 5h7"></path>
                      <path d="M9 3v2c0 4.418 -2.239 8 -5 8"></path>
                      <path d="M5 9c0 2.144 2.952 3.908 6.7 4"></path>
                      <path d="M12 20l4 -9l4 9"></path>
                      <path d="M19.1 18h-6.2"></path>
                    </svg><span>Guía en español</span>
                    
                  </div>
                </div>
              }

              <div className="row">
                <div className="hotel">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-skyscraper" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 21l18 0"></path>
                    <path d="M5 21v-14l8 -4v18"></path>
                    <path d="M19 21v-10l-6 -4"></path>
                    <path d="M9 9l0 .01"></path>
                    <path d="M9 12l0 .01"></path>
                    <path d="M9 15l0 .01"></path>
                    <path d="M9 18l0 .01"></path>
                  </svg>
                  <em>Alojamiento en <a href="#link-alojamiento" id='link-alojamiento'>{lodging.nombre}</a></em>
                </div>

                {/* Imagenes del alojamiento */}
                <a name="link-alojamiento" id="link-alojamiento"></a>
                {lodging.imagenes && lodging.imagenes.length > 0 && lodging.imagenes.slice(0, 3).map((imagen) => (
                  <>
                    <div className='div-img-container'>
                      <Image key={imagen} id={imagen} />
                    </div>
                  </>
                ))}

                </div>
              </div>
          </div>

          <div className='col-md-5'>
            <div className='duracion'>
              
              <h3>Duracion</h3>
              <div className='info-derecha'>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-clock-hour-5 "
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
                {result.duracion} dias
              </div>
            </div>

            <div className='dificultad'>
              <h3>Dificultad</h3>
              <div className='info-derecha'>
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
                {result.dificultad}
              </div>
            </div>
            <div className='precio'>
              <h3>USD  {result.precio}</h3>
              <div>
                ({result.traslado && <span>Traslado + </span>}    
                {result.pasajes && <span>Pasajes + </span>}    
                {result.entradas && <span>Entradas + </span>}    
                {result.guia_es && <span>Guia + </span>}    
                <span>Alojamiento en {lodging.nombre}</span>)

              </div>
              
            </div>
          </div>

          <section className="container" id="detail">
            
            
            

            {/* <div className="container-itinerary">
              <h3 className="mb-5">Itinerario</h3>
              <div className="row">
                <h4>Día 1 - Santa Teresa: El Barrio Bohemio</h4>
                <p>
                  En el primer día de tu viaje, te sumergirás en la pintoresca
                  belleza de Santa Teresa, un barrio lleno de edificios
                  encantadores y vistas panorámicas espectaculares. Este lugar es
                  un refugio para artistas y durante un fin de semana especial,
                  los artistas abren sus puertas para que todos puedan apreciar su
                  creatividad. Santa Teresa combina su tranquilidad con la animada
                  vida de los bares y las calles llenas de personas disfrutando.
                  Además, tendrás la oportunidad de disfrutar de la deliciosa
                  comida en un 'rodizio de pizzas', un restaurante donde te sirven
                  porciones de pizza hasta que estés satisfecho.
                </p>

                <h4>Día 2 - El Cristo Redentor</h4>
                <p>
                  Observando la Ciudad desde lo AltoEn el segundo día, explorarás
                  una de las maravillas de Río: el Cristo Redentor en el Monte
                  Corcovado. Este es un lugar icónico que ofrece una vista
                  espectacular de la ciudad. Te recomendamos tomar un autobús
                  local para llegar a la base del Monte Corcovado y luego hacer
                  una caminata que te llevará a la entrada del monumento. Desde
                  aquí, disfrutarás de vistas inigualables desde el mirador Santa
                  Marta. La subida final al monumento se hace en un microbús.
                  Aunque es concurrido, la vista es simplemente impresionante.
                </p>

                <h4>Día 3 - Parque Natural Tijuca: Aventura en la Selva</h4>
                <p>
                  El tercer día te llevará a una experiencia única en la ciudad:
                  explorar el Parque Natural Tijuca, una selva en pleno corazón de
                  Río. Aquí, podrás pasear entre árboles exuberantes y, si tienes
                  suerte, podrás avistar monos y tucanes. A pesar de la carretera
                  que atraviesa el parque, es un lugar fascinante para explorar.
                  No te pierdas la oportunidad de llegar al mirador llamado Vista
                  Chinesa, donde disfrutarás de una vista panorámica que abarca el
                  Pan de Azúcar y el Cristo Redentor al mismo tiempo.
                </p>

                <h4>Día 4 - La Escalera de Selarón: Arte en Mosaico</h4>
                <p>
                  En el cuarto día, visitarás la famosa Escalera de Selarón, una
                  obra de arte creada por un artista que decoró la escalera con
                  azulejos de colores de diferentes partes del mundo. Esta
                  escalera es un sitio increíble lleno de detalles fascinantes.
                  Puedes pasar horas explorando cada azulejo y disfrutando de la
                  creatividad de este artista.
                </p>

                <h4>Día 5 - El Pan de Azúcar: Vistas de Día y de Noche</h4>
                <p>
                  El quinto día te llevará al icónico Pan de Azúcar, dos colinas
                  que se elevan al lado de la Bahía de Botafogo. Aquí, podrás
                  subir en teleférico y disfrutar de vistas panorámicas
                  impresionantes. Te recomendamos visitar el mirador antes del
                  atardecer para experimentar la ciudad tanto de día como de
                  noche.
                </p>

                <h4>Día 6 - Playas Emblemáticas: Copacabana e Ipanema</h4>
                <p>
                  El sexto día se dedica a disfrutar de las famosas playas de Río
                  de Janeiro, incluyendo Copacabana e Ipanema. Estas playas son
                  conocidas en todo el mundo y ofrecen un ambiente vibrante.
                  Puedes dar un relajante paseo, tomar agua de coco y disfrutar de
                  la animada actividad en la playa.
                </p>

                <h4>Día 7 - Visita a una Favela: La Otra Cara de Río</h4>
                <p>
                  En el último día, tendrás la oportunidad de explorar una favela,
                  lo que te permitirá entender la complejidad de Río de Janeiro.
                  Visitarás una favela pacificada y observarás la vida en este
                  entorno. Esta experiencia ofrecerá una visión única de la ciudad
                  y su diversidad.
                </p>
              </div>
            </div> */}
            </section>
          <section className="container2" id="detail">
            
          </section>
        </div>
      </main>
    </>
  );
};

export default Detail;
