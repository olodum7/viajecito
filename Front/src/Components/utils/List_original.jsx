import React, { useState, useEffect } from "react";
import Categoria from "../Components/Category/CategoryTour";

const List = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [newCategoria, setNewCategoria] = useState("");
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8089/tour")
      .then((response) => response.json())
      .then((data) => {
        setTours(data);
      })
      .catch((error) => {
        console.error("Error al obtener los tours: \n", error);
      });
  }, []);

  const handleEditCategoria = (tour) => {
    setEditingTour(tour);
    setNewCategoria(tour.categoria);

    fetch(`http://localhost:8089/tour/${tour.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTourDetails(data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del tour: \n", error);
      });
  };

  const handleSaveCategoria = () => {
    const formData = new FormData();
  
    Object.entries(tourDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Agregar la nueva categoría
    formData.append('categoria', parseInt(newCategoria));

    console.log(formData);
  
    fetch(`http://localhost:8089/tour`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        setTours((prevTours) =>
          prevTours.map((tour) =>
            tour.id === tourDetails.id ? { ...tour, categoria: newCategoria } : tour
          )
        );
        setEditingTour(null);
        setNewCategoria("");
      })
      .catch((error) => {
        console.error("Error al guardar la nueva categoría: \n", error);
      });
  };

  const handleDeleteTour = (id) => {
    fetch(`http://localhost:8089/tour/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setTours((prevTours) =>
          prevTours.filter((tour) => tour.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el tour: \n", error);
      });
  };

  return (
    <div>
        <h1>dgf</h1>
        <h1>dgf</h1>
        <h1>dgf</h1>
        <h1>dgf</h1>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            {tour.titulo} - {tour.categoria}
            {editingTour === tour ? (
              <div className="row" id="categoria">
                <Categoria
                  tourData={{ categoria: parseInt(tour.categoria) }}
                  handleChange={(e) => setNewCategoria(e.target.value)}
                />
                
                <button onClick={handleSaveCategoria}>
                  Guardar Categoría
                </button>
                </div>
            ) : (
              <div>
                <button onClick={() => handleEditCategoria(tour)}>
                  Editar Categoría
                </button>
                <button onClick={() => handleDeleteTour(tour.id)}>
                  Eliminar Tour
                </button>
                </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;