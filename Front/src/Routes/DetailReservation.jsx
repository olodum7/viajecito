
import Gallery from "../Components/gallery/Gallery";
import Banner from "../Components/ui-components/banner/Banner";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useContextGlobal } from "../Components/utils/global.context";
import "../Styles/detailReservation.css"
import Image from "../Components/image/Image";
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import Counter from "../Components/buttons/Counter.jsx";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Button from "../Components/buttons/Button.jsx";



const DetailReservation = () => {
   
   const [result, setResult] = useState({});
   const { id } = useParams();
   const [lodging, setLodging] = useState({});
   const { toursState, dispatch } = useContextGlobal();
   const { ids, nombre, apellido, email, tipo } = toursState.userData || {};
   //const { imagenes } = props.data;
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

  
  //Obtengo el alojamiento 
  
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
  /********************************************************************************** */
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


  //Obtengo datos
    return(
        <main className="mainRes">
          <div className="container">

          
            <Breadcrumb tourName={result.titulo} />
            <div className="row hij arriba">
              <div className="col-md-6 imagen">
                  {/*<Image key={imagenes[0]} id={imagenes[0]} />*/}
                  IMAGEN
                  
                  
              </div>
              <div className="col-md-6">
                <div className="row">
                  <strong>{result.titulo}</strong>
                  <h1>Del  al </h1>
                  
                  {/*
                  <DateRange
                    minDate={fechaSalidaDesde && fechaSalidaDesde > new Date() ? fechaSalidaDesde : new Date()}
                    maxDate={fechaSalidaHasta}
                   
                    editableDateInputs={true}
                    onChange={onChangeRange}
                    
                    ranges={stateDate}
                  />*/}
                </div>
                <div className="row iconos">
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
                      </svg> Alojamiento en <em>{lodging.nombre}</em>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row hij abajo">
              <div className="col-md-6">
                <h1>Datos personales</h1>
                <p><strong>Nombre:  </strong>{nombre} </p>
                <p><strong>Apellido:  </strong>{apellido}</p>
                <p><strong>Email:  </strong>{email}</p>
              </div>
              <div className="col-md-6 buttonn">
                <Button buttonName="Confirmar reserva" />
              </div>
              
            </div>
            </div>
          <Banner/>
        </main>
    )
};

DetailReservation.propTypes = {
  imagenes: PropTypes.array
};
export default DetailReservation;