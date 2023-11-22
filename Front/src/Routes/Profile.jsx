import React from "react";
import { useContextGlobal } from "../Components/utils/global.context";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import Banner from "../Components/ui-components/banner/Banner";
import Button from "../Components/buttons/Button";
import showToastMessage from "./../Components/utils/toast.notifications";

const Profile = () => {
  const navigate = useNavigate();
  const { toursState, dispatch } = useContextGlobal();
  const { id, nombre, apellido, email, tipo } = toursState.userData || {};

  const deleteAccount = async () => {
    const result = await Swal.fire({
      title: "¿Quieres borrar tu cuenta?",
      text: "Esta acción es irreversible y borrará tu cuenta permanentemente.",
      icon: "warning",
      customClass: "modal-delete",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "F1406B",
      confirmButtonText: "Borrar cuenta",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8089/usuario/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          localStorage.removeItem("userData");
          dispatch({ type: "LOGOUT" });
          navigate("/");
          showToastMessage("deleteUser");
        } else {
          console.error("Error al borrar la cuenta");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  return (
    <main id="profile-user">
      <section className="profile-header">
        <div className="container-xl">
          <div className="row">
            <h1>Datos de perfil</h1>
          </div>
        </div>
      </section>
      <Breadcrumb tourName="Mis datos" />
      <div className="container-xl">
        <section className="content-wrapper">
          <div className="row justify-content-md-center gap-4">
            <div className="col-2 col-md-2">
              <img
                src="./avatar.png"
                alt="Imagen de perfil"
                className="img-fluid rounded-circle"
              />
            </div>

            <div className="col-md-4">
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Nombre:</strong> {nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {apellido}
              </p>
              <p className="mb-4">
                <strong>Privilegios:</strong> {tipo}
              </p>

              <Button
                url=""
                buttonName="Borrar cuenta"
                action={deleteAccount}
                customClass="delete-btn"
              />
            </div>
          </div>
        </section>
      </div>
      <Banner />
    </main>
  );
};

export default Profile;
