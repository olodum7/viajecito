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
  const formattedDates =
    ("0" + new Date(startDate).getDate()).slice(-2) +
    " al " +
    format(new Date(endDate), "dd 'de' MMMM 'del' yyyy", { locale: esLocale });
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
              "¡" + nombre + " " + apellido + " tu reserva fue realizada con éxito!",
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
            <div className="col-lg-6">
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
                    className="icon icon-tabler icon-tabler-clock-hour-4"
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
            <div className="col-lg-5">
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
                    <strong>Acompañantes:</strong> {numberOfAdults}{" "}
                    {numberOfAdults > 1 ? "Adultos" : "Adulto"}{" "}
                    {numberOfChildren > 0 ? (
                      <>
                        - {numberOfChildren}{" "}
                        {numberOfChildren > 1 ? "Menores" : "Menor"}{" "}
                      </>
                    ) : null}
                  </p>
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

      <section className="policy-section">
        <div className="container">
          <h2 className="text-center">Políticas del Producto</h2>
          <div className="row">
            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-plane-departure"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727z" />
                    <path d="M3 21h18" />
                  </svg>
                </div>
                <h5 className="mt-3">
                  Política de Reserva de Vuelos y Alojamiento
                </h5>
                <p>
                  Nuestros servicios incluyen la reserva de vuelos y
                  alojamientos a precios competitivos. Nos esforzamos por
                  ofrecer opciones que se ajusten a tus necesidades y
                  presupuesto, manteniendo acuerdos con aerolíneas y hoteles de
                  renombre para asegurar calidad y confort.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-pig-money"
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
                    <path d="M15 11v.01" />
                    <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
                    <path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" />
                  </svg>
                </div>
                <h5 className="mt-3">Política de Gastos y Reembolsos</h5>
                <p>
                  Cubrimos gastos de viaje esenciales, incluyendo transporte,
                  alojamiento y comidas básicas. Los reembolsos se procesan tras
                  la presentación de recibos válidos. No se reembolsan gastos
                  personales o adicionales no relacionados con el viaje de
                  negocios.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-lock"
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
                    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                    <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                  </svg>
                </div>
                <h5 className="mt-3">Seguridad y Bienestar del Viajero</h5>
                <p>
                  La seguridad y bienestar de nuestros clientes es primordial.
                  Ofrecemos asistencia las 24 horas y aseguramos que todos los
                  servicios cumplen con las normas de seguridad. Además,
                  proporcionamos información y recomendaciones para garantizar
                  un viaje seguro.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-notebook"
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
                    <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                    <path d="M13 8l2 0" />
                    <path d="M13 12l2 0" />
                  </svg>
                </div>
                <h5 className="mt-3">Código de Conducta del Viajero</h5>
                <p>
                  Esperamos que nuestros viajeros respeten las culturas y normas
                  locales de los destinos que visitan. Promovemos un
                  comportamiento responsable y respetuoso, tanto hacia las
                  comunidades locales como hacia otros viajeros.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-alert-triangle"
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
                    <path d="M12 9v4" />
                    <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
                    <path d="M12 16h.01" />
                  </svg>
                </div>
                <h5 className="mt-3">Políticas de Gestión de Riesgos</h5>
                <p>
                  Evaluamos constantemente los riesgos asociados a los viajes
                  para minimizar cualquier impacto negativo. Esto incluye el
                  seguimiento de situaciones políticas, climáticas y de salud en
                  los destinos, así como la preparación para responder
                  eficazmente a emergencias.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-gavel"
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
                    <path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" />
                    <path d="M6 9l4 4" />
                    <path d="M13 10l-4 -4" />
                    <path d="M3 21h7" />
                    <path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" />
                  </svg>
                </div>
                <h5 className="mt-3">Aspectos Legales y Contractuales</h5>
                <p>
                  Todos nuestros servicios se rigen por términos y condiciones
                  claros para proteger tanto a los clientes como a la empresa.
                  Esto incluye políticas de cancelación, cambios en reservas y
                  otras circunstancias especiales.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-caravan"
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
                    <path d="M7 18a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M11 18h7a2 2 0 0 0 2 -2v-7a2 2 0 0 0 -2 -2h-9.5a5.5 5.5 0 0 0 -5.5 5.5v3.5a2 2 0 0 0 2 2h2" />
                    <path d="M8 7l7 -3l1 3" />
                    <path d="M13 11m0 .5a.5 .5 0 0 1 .5 -.5h2a.5 .5 0 0 1 .5 .5v2a.5 .5 0 0 1 -.5 .5h-2a.5 .5 0 0 1 -.5 -.5z" />
                    <path d="M20 16h2" />
                  </svg>
                </div>
                <h5 className="mt-3">
                  Política de Transporte Terrestre y Otros Servicios
                </h5>
                <p>
                  Ofrecemos una gama de opciones de transporte terrestre, desde
                  alquiler de coches hasta traslados en taxi y uso de transporte
                  público. Estas opciones se seleccionan para ofrecer la mejor
                  combinación de comodidad, eficiencia y valor.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 mt-3">
              <div className="policy">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-cheese"
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
                    <path d="M4.519 20.008l16.481 -.008v-3.5a2 2 0 1 1 0 -4v-3.5h-16.722" />
                    <path d="M21 9l-9.385 -4.992c-2.512 .12 -4.758 1.42 -6.327 3.425c-1.423 1.82 -2.288 4.221 -2.288 6.854c0 2.117 .56 4.085 1.519 5.721" />
                    <path d="M15 13v.01" />
                    <path d="M8 13v.01" />
                    <path d="M11 16v.01" />
                  </svg>
                </div>
                <h5 className="mt-3">Política de Entretenimiento y Comidas</h5>
                <p>
                  Establecemos límites de gasto razonables para comidas y
                  entretenimiento durante el viaje. Esto incluye directrices
                  sobre el tipo de restaurantes y actividades de ocio que son
                  aceptables, promoviendo un equilibrio entre la experiencia del
                  viaje y la responsabilidad de gasto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Reserve;
