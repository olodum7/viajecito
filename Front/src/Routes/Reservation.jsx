import React from "react";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import Button from "../Components/buttons/Button";
import Banner from "../Components/ui-components/banner/Banner";

const Reservation = () => {
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
            <h1 className="mb-5">No tienes ninguna reserva.</h1>
            <Button url="/" buttonName="Volver al inicio" />
          </div>
          </div>
        </section>
      </div>
      <Banner />
    </main>
  );
};

export default Reservation;
