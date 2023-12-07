import { useState, useEffect } from "react";
import { format } from 'date-fns';
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import Banner from "../Components/ui-components/banner/Banner";
import Pagination from "../Components/ui-components/pagination/Pagination";

const Reservation = () => {
  const [mensaje, setMensaje] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const email = JSON.parse(localStorage.getItem("userData")).email;

  useEffect(() => {
    const formDataToSend = new FormData();
    formDataToSend.append("email", email);

    fetch("http://localhost:8089/reserva/reservations", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((reservations) => {
        const combinedReservations = reservations.map((reservation) => {
          return obtenerTours(reservation.tourId)
          .then((tourData) => ({
            ...reservation,
            tourData,
          }));
        });

        Promise.all(combinedReservations)
        .then((combinedResults) => {
          setCombinedData(combinedResults);
        });
      })
      .catch((error) => {
        setMensaje({ tipo: "error", texto: error });
      });
  }, [email]);

  const obtenerTours = (idTour) => {
    return fetch(`http://localhost:8089/tour/${idTour}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al obtener el detalle: \n", error);
      });
  };

  const lastTourIndex = currentPage * perPage;
  const firstTourIndex = lastTourIndex - perPage;
  const currentReserve = combinedData.slice(firstTourIndex, lastTourIndex) || 0;

  return (
    <main>
      <section className="profile-header">
        <div className="container-xl">
          <div className="row">
            <h1>Mis reservas</h1>
          </div>
        </div>
      </section>
      <section>
        <Breadcrumb tourName="Mis reservas" />
        {combinedData.length > 0 ? (
          <>
            <div className="d-flex justify-content-between">
              <div className="table-pagination">
                <Pagination
                  total={currentReserve.length}
                  perPage={perPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage} />
              </div>
            </div>
            <table className="table-data">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Fecha de salida</th>
                  <th scope="col">Titulo del tour</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Mayores</th>
                  <th scope="col">Menores</th>
                  <th scope="col">Precio Total </th>
                </tr>
              </thead>
              <tbody>
                {combinedData.map((combinedData) => (
                  <tr key={combinedData.idReserva}>
                    <td>{format(new Date(combinedData.fechaSalida), 'dd/MM/yyyy')}</td>
                    <td>{combinedData.tourData.titulo}</td>
                    <td>{combinedData.tourData.categoria}</td>
                    <td>{combinedData.acompaniantes_mayores} </td>
                    <td>{combinedData.acompaniantes_menores}</td>
                    <td>{((combinedData.tourData.precioBase)+
                    (combinedData.tourData.precioAdulto * combinedData.acompaniantes_mayores)+
                    (combinedData.tourData.precioMenor * combinedData.acompaniantes_menores))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No se han realizado reservas.</p>
        )}
      </section >

      {mensaje && (
        <div className={`mt-3 alert alert-${mensaje.tipo === "error" ? "danger" : "success"}`} >
          {mensaje.texto}
        </div>
      )}

      <Banner />
    </main >
  );
};

export default Reservation;
