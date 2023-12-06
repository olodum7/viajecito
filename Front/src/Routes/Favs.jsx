import { useState } from "react";
import Card from "./../Components/card/Card";
import Pagination from "./../Components/ui-components/pagination/Pagination";
import { useContextGlobal } from "./../Components/utils/global.context";
import Banner from "./../Components/ui-components/banner/Banner";
import Breadcrumb from "./../Components/breadcrumb/Breadcrumb";
import Button from "./../Components/buttons/Button";

const Favs = () => {
  const { toursState, dispatch } = useContextGlobal();

  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(6);

  const clearFavs = () => {
    Swal.fire({
      title: "¿Quieres borrar tus favoritos?",
      text: "Esta acción es irreversible y borrará tus favoritos permanentemente.",
      icon: "warning",
      customClass: "modal-delete",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "F1406B",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Borrar favoritos",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_FAVS" });
      }
    });
  };

  const lastTourIndex = currentPage * toursPerPage;
  const firstTourIndex = lastTourIndex - toursPerPage;
  const currentFavs = toursState.favs.slice(firstTourIndex, lastTourIndex);

  return (
    <main>
      <section className="profile-header">
        <div className="container-xl">
          <div className="row">
            <h1>Mis favoritos</h1>
          </div>
        </div>
      </section>
      <Breadcrumb tourName="Mis favoritos" />
      <section className="content-wrapper">
        <div className="cards-wrapper">
          {currentFavs.map((fav) => (
            <Card data={fav} key={fav.id} />
          ))}
        </div>
        {toursState.favs.length > 0 ? (
          <div className="text-center mt-5">
            <Button
              url=""
              buttonName="Eliminar todos mis favoritos"
              action={clearFavs}
              customClass="delete-btn"
            />
          </div>
        ) : (
          <div className="text-center">
            <h1 className="mb-5">No tienes ningún favorito guardado.</h1>
            <Button url="/" buttonName="Volver al inicio" />
          </div>
        )}
        {toursState.favs.length < 7 ? (
          ""
        ) : (
          <Pagination
            totalTours={toursState.favs.length}
            toursPerPage={toursPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </section>
      <Banner />
    </main>
  );
};

export default Favs;
