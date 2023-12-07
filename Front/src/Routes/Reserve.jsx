import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es as esLocale } from "date-fns/locale";
import Image from "../Components/image/Image";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import ButtonXL from "../Components/buttons/ButtonXL";

const Reserve = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tourData, hotelData, userData, reserveData } = location.state || {};
  const { stateDate, numberOfAdults, numberOfChildren } = reserveData;
  const { startDate, endDate } = stateDate;
  const formattedDates = ("0" + new Date(startDate).getDate()).slice(-2) + " al " + format(new Date(endDate), "dd 'de' MMMM 'del' yyyy", { locale: esLocale });
  const { nombre, apellido, email } = userData;
  const [mensaje, setMensaje] = useState(null);

  const renderImages = () => {
    let images = [];
    for (let i = 0; i < Math.min(tourData.imagenes.length, 4); i++) {
      images.push(
        <div className="col reserve-confirm" key={i}>
          <Image key={tourData.imagenes[i]} id={tourData.imagenes[i]} />
        </div>
      );
    }
    return images;
  };

  const handleReserveSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      "fechaSalida",
      format(new Date(startDate), "dd/MM/yyyy")
    );
    formDataToSend.append("username", email);
    formDataToSend.append("mayores", numberOfAdults);
    formDataToSend.append("menores", numberOfChildren);
    formDataToSend.append("tour", tourData.id);

    fetch("http://34.207.134.182:8089/reserva", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tipo === "ok") {
          // Éxito en el registro
          Swal.fire({
            title: tourData.titulo,
            text:
              "¡ " + nombre + apellido + " tu reserva fue realizada con éxito!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/profile/reservation");
            }
          });
        } else {
          setMensaje({ tipo: data.tipo, texto: data.mensaje });
        }
      })
      .catch((error) => {
        console.error("Error al enviar el tour:", error);
      });
  };

  return (
    <main>
      <section className="profile-header">
        <div className="container-xl">
          <div className="row">
            <h1>Finalizar reserva</h1>
          </div>
        </div>
      </section>

      <Breadcrumb pageName={"Reserva del tour: " + tourData.titulo} />
      <section id="reserve">
        <div className="container">
          <div className="row">{renderImages()}</div>

          <div className="row justify-content-md-between mt-5">
            <div className="col-lg-7">
              <h6>{tourData.titulo}</h6>
              <h4> {formattedDates}</h4>
              <div className="detalles-reserva">
                {tourData.transporte && (
                  <div className="row my-2">
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
                    </svg>{" "}
                    {tourData.transporte}
                  </div>
                )}

                {tourData.traslado && (
                  <div className="row my-2">
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
                    </svg>{" "}
                    Traslados a las distintas excursiones
                  </div>
                )}

                {tourData.entradas && (
                  <div className="row my-2">
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
                    {tourData.entradas}
                  </div>
                )}

                {tourData.guia && (
                  <div className="row my-2">
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
                )}

                <div className="row my-2">
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
                  {hotelData.nombre}
                </div>

                <div className="row my-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-clock-hour-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 12l3 2" />
                    <path d="M12 7v5" />
                  </svg>
                  Duración: {tourData.duracion} días
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info-user-reserva">
                <h3 className="mb-4">Información del usuario: </h3>
                <form className="form-normal" onSubmit={handleReserveSubmit}>
                  <p>
                    <strong>Nombre:</strong> {nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {apellido}
                  </p>
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                  <p className="mb-5">
                    {" "}
                    <strong>Acompañantes:</strong> {numberOfAdults}{" "}
                    {numberOfAdults > 1 ? "Adultos" : "Adulto"}
                  </p>
                  {numberOfChildren > 0 && (
                    <p>
                      {" "}
                      - {numberOfChildren}{" "}
                      {numberOfChildren > 1 ? "Menores" : "Menor"}
                    </p>
                  )}
                  <ButtonXL
                    url=""
                    buttonName="Confirmar reserva"
                    isSubmit={true}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mensaje && (
        <div
          className={`mt-3 alert alert-${
            mensaje.tipo === "error" ? "danger" : "success"
          }`}
        >
          {mensaje.texto}
        </div>
      )}
    </main>
  );
};
export default Reserve;
