import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Gallery from "./../Components/gallery/Gallery";
import Image from "./../Components/image/Image.jsx";
import Breadcrumb from "./../Components/breadcrumb/Breadcrumb.jsx";
import Banner from "../Components/ui-components/banner/Banner";
import Itinerary from "../Components/itinerary/Itinerary.jsx";
import Counter from "../Components/buttons/Counter.jsx";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

const Detail = () => {
  const { id } = useParams();
  const [result, setResult] = useState({});
  const [lodging, setLodging] = useState({});
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [stateDate, setStateDate] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }]);
  const [fechaSalidaDesde, setFechaSalidaDesde] = useState(new Date());
  const [fechaSalidaHasta, setFechaSalidaHasta] = useState(new Date());
  const [days, setDays] = useState([]);
  // const dataReserve = {};

  /* Obtengo el tour */
  useEffect(() => {
    fetch(`http://localhost:8089/tour/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setDays(data.salidaDTO.dias.split(',').map(Number));
        const fechaSalidaDesdeArray = data.salidaDTO.fechaSalidaDesde;
        const fechaSalidaHastaArray = data.salidaDTO.fechaSalidaHasta;
        setFechaSalidaDesde(new Date(fechaSalidaDesdeArray[0], fechaSalidaDesdeArray[1] - 1, fechaSalidaDesdeArray[2]));
        setFechaSalidaHasta(new Date(fechaSalidaHastaArray[0], fechaSalidaHastaArray[1] - 1, fechaSalidaHastaArray[2]));
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

    // Define isDayDisabled como un callback
    const isDayDisabled = useCallback((date) => {
      const dayOfWeek = date.getDay();
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      return days[dayIndex] !== 1;
    }, [days]);

  /* Fecha inicial */
  useEffect(() => {
    setStateDate((prevState) => {
      const newStartDate = fechaSalidaDesde > new Date() ? fechaSalidaDesde : new Date();
      const isStartDateDisabled = isDayDisabled(newStartDate);
  
      return [
        {
          ...prevState[0],
          startDate: isStartDateDisabled ? prevState[0].startDate : newStartDate,
          endDate: addDays(newStartDate, result.duracion - 1),
        },
      ];
    });
  }, [fechaSalidaDesde, result.duracion, isDayDisabled]);

  const onChangeRange = (item) => {
    let startDate = item.selection.startDate;

    // Inicio es un día deshabilitado?
    if (isDayDisabled(startDate)) {
      // Falso, encontrar el próximo
      let nextEnabledDate = startDate;
      while (isDayDisabled(nextEnabledDate)) {
        nextEnabledDate = addDays(nextEnabledDate, 1);
      }
      startDate = nextEnabledDate;
    }

    // Actualizo estado 
    setStateDate([{
      startDate,
      endDate: addDays(startDate, result.duracion - 1),
      key: 'selection'
    }]);
  }

  const onClickReserve = () => {
  //   dataReserve.id = id
  //   dataReserve.titulo = result.titulo
  //   dataReserve.subtitulo = result.subtitulo
  //   dataReserve.precioFinal = result.precioBase + (result.precioAdulto * (numberOfAdults - 1)) + (result.precioMenor * numberOfChildren)
  //   dataReserve.categoria = result.categoria
  //   dataReserve.duracion = result.duracion
  //   dataReserve.dificultad = result.dificultad
  //   dataReserve.fechaSalida = ''
  //   dataReserve.imagen = result.imagenes[0]
  //   dataReserve.mayores = numberOfAdults
  //   dataReserve.menores = numberOfChildren

  //   // localStorage.setItem('datosReserva', JSON.stringify(dataReserve));
   window.location.href = '/detailReservation';
   };

  return (
    <main>
      <Breadcrumb tourName={result.titulo} />
      {result.imagenes && result.imagenes.length > 0 && (
        <Gallery imagenes={result.imagenes} />
      )}
      <section className="container" id="detail">
        <div className="row">
          <h1>{result.titulo}</h1>
          <h2> {result.subtitulo} </h2>
        </div>

        <div className="container-all">
          <div className="container-details">
            <h3 className="mb-4">Este paquete incluye:</h3>

            {result.transporte && (
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
                  {result.transporte}
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
                      <div key={imagen} className="col-4">
                        <Image id={imagen} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="container-filters">
            <div className="row">
              <h2>Personas</h2>
              <div className="container-counter">
                <Counter data={{ type: "adults", text: "Adultos", minCount: 1 }} onChange={(value) => setNumberOfAdults(value)} />
                <Counter data={{ type: "children", text: "Niños", minCount: 0 }} onChange={(value) => setNumberOfChildren(value)} />
              </div>
            </div>
            <div className="row">
              <h2>Fechas de salida</h2>

              <DateRange
                minDate={fechaSalidaDesde && fechaSalidaDesde > new Date() ? fechaSalidaDesde : new Date()}
                maxDate={fechaSalidaHasta}
                disabledDay={isDayDisabled}
                editableDateInputs={true}
                onChange={onChangeRange}
                moveRangeOnFirstSelection={false}
                ranges={stateDate}
              />

              <p> Duración del Tour: {result.duracion} días</p>
            </div>
            <div className="row">
              <p>Precio por adulto: USD {result.precioAdulto}</p>
              <p>Precio por menor: USD {result.precioMenor}</p>
              <p><strong>USD {result.precioBase + (result.precioAdulto * (numberOfAdults - 1)) + (result.precioMenor * numberOfChildren)}</strong></p>
              <p>({result.traslado == true ? "Traslado" : "" + result.transporte?.length > 0 ? "Transporte" : ""})</p>
            </div>
            <div className="row">
              {<button className="btn" type="button" onClick={onClickReserve}>Completar reserva</button>}
              {/* <button className="btn" type="button">Completar reserva</button> */}
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
  );
};

export default Detail;