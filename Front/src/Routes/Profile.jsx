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
  const { id, nombre, apellido, email, tipo, imagenPerfil } = toursState.userData || {};

  const deleteAccount = async () => {
    const result = await Swal.fire({
      title: "¿Quieres borrar tu cuenta?",
      text: "Esta acción es irreversible y borrará tu cuenta permanentemente.",
      icon: "warning",
      customClass: 'modal-delete',
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
    <main>
      <Breadcrumb tourName="Mis datos" />
      <div className="container">
        <section className="row content-wrapper">
          <div className="col-md-4">
            <img
              src={imagenPerfil || "path_to_default_image.jpg"}
              alt="Imagen de perfil"
              className="img-fluid rounded-circle"
            />
          </div>

          <div className="col-md-8">
            <h3>Datos del Usuario</h3>
            <p>Email: {email}</p>
            <p>Nombre: {nombre}</p>
            <p>Apellido: {apellido}</p>
            <p className="mb-3">Privilegios: {tipo}</p>

            <Button
              url=""
              buttonName="Borrar cuenta"
              action={deleteAccount}
              customClass="delete-btn"
            />
          </div>
        </section>
      </div>
      <Banner />
    </main>
  );
};

export default Profile;
