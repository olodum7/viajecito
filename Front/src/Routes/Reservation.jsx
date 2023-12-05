import React from "react";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import Button from "../Components/buttons/Button";
import Banner from "../Components/ui-components/banner/Banner";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

const Reservation = () => {

  const {id} = useParams();
  const [reserva,setReserva] = useState({});

  const getReserva = async()=>{
    const response = await fetch(`http://localhost:8089/tour/${id}`);
    const data = await response.json();
    setReserva(data);
  }

  useEffect(() => {
    getReserva()
  })







  return (
    <main>
      <section className="profile-header">
        <div className="container-xl">
          <div className="row">
            <h1>Mis reservas</h1>
          </div>
        </div>
      </section>
      <Breadcrumb tourName="Mis reservas" />
      <div className="container-xl">
        <section className="content-wrapper">
          <div className="row justify-content-md-center gap-4">
          <div className="text-center">
            {/*<h1 className="mb-5">No tienes ninguna reserva.</h1>
            <Button url="/" buttonName="Volver al inicio" />*/}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Duracion</th>
                <th scope="col">Salidas</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/*<th scope="row">1</th>*/}
                <td>{reserva.id}</td>
                <td>{reserva.titulo}</td>
                <td>{reserva.duracion}</td>
                <td>{reserva.dias}</td>
                <td>button</td>
              </tr>
            </tbody>
          </table>
          </div>
        </section>
      </div>
      <Banner />
    </main>
  );
};

export default Reservation;
