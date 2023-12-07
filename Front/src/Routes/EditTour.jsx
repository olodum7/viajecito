import { useState, useEffect } from "react";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import Pagination from "../Components/ui-components/pagination/Pagination";
import ModalEditTour from "../Components/ui-components/modal/ModalEditTour";
import ModalCommon from "../Components/ui-components/modal/ModalCommon";
import showToastMessage from "../Components/utils/toastMessage";
import Button from "../Components/buttons/Button";

const EditTour = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 10;
  const [editingTours, setEditingTours] = useState(true);

  useEffect(() => {
    if (editingTours) {
      fetch("http://localhost:8089/tour")
        .then((response) => response.json())
        .then((data) => {
          setTours(data);
          setEditingTours(false);
        })
        .catch((error) => {
          console.error("Error al obtener los tours: \n", error);
        });
    }
  }, [editingTours]);

  const handleCategoryChange = (tourDataModified) => {
    const formData = new FormData();
    Object.entries(tourDataModified).forEach(([key, value]) => {
      formData.append(key, value);
    });

    /* Confirmo los datos a la BD */
    fetch(`http://localhost:8089/tour`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        showToastMessage("success", "¡Tour modficado con éxito!");
        setEditingTours(true);
      })
      .catch((error) => {
        console.error("Error al guardar la nueva categoría: \n", error);
      });
  };

  const lastTourIndex = currentPage * toursPerPage;
  const firstTourIndex = lastTourIndex - toursPerPage;
  const currentTours = tours.slice(firstTourIndex, lastTourIndex);

  const handleTourDelete = (id) => {
    fetch(`http://localhost:8089/tour/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        showToastMessage("success", "¡Tour eliminado con éxito!");
        setEditingTours(true);
      })
      .catch((error) => {
        showToastMessage("error", error);
        console.error("Error al eliminar el tour: \n", error);
      });
  };

  return (
    <section className="content-wrapper content-section">
      <Breadcrumb tourName={"Editar tour"} />
      <div className="d-flex justify-content-end container-table">
        <div className="div-table" >

          <div className="d-flex justify-content-between">
            <div className="table-pagination">
              <Pagination
                total={tours.length}
                perPage={toursPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
            </div>
            <Button url="/admin/tour/add" buttonName="+" customClass="bttn-add" />
          </div>
          <table className="table-data">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Titulo</th>
                <th scope="col">Categoria</th>
                <th scope="col">Precio Base</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentTours.map((tour) => (
                <tr key={tour.id}>
                  <th scope="row">{tour.id}</th>
                  <td>{tour.titulo}</td>
                  <td>{tour.categoria}</td>
                  <td>{tour.precioBase}</td>
                  <td>
                    <ModalEditTour tourData={tour} handleSave={handleCategoryChange} />
                    <ModalCommon data={{ tituloModal: "Eliminar tour", actionModal: "eliminar", id: tour.id, name: tour.titulo }} handleSave={handleTourDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default EditTour;