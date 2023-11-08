import React, { useState, useEffect } from "react";

const ListarTours = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [newCategoria, setNewCategoria] = useState("");
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    // Hacer la solicitud al backend para obtener la lista de tours
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

    // Hacer la solicitud al backend para obtener los detalles del tour
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
    // Combinar los detalles del tour con la nueva categoría
    const updatedTour = { ...tourDetails, categoria: newCategoria };

    // Hacer la solicitud al backend para guardar la actualización
    fetch(`http://localhost:8089/tour/${tourDetails.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTour),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de tours después de guardar la nueva categoría
        setTours((prevTours) =>
          prevTours.map((tour) =>
            tour.id === tourDetails.id ? updatedTour : tour
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
      <h1>Listado de Tours</h1>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            {tour.titulo} - {tour.categoria}
            {editingTour === tour ? (
              <>
                <select
                  value={newCategoria}
                  onChange={(e) => setNewCategoria(e.target.value)}
                >
                  <option value="PLAYA">Playas</option>
                  <option value="NIEVE">Nieve</option>
                  <option value="NATURALEZA">Naturales</option>
                  <option value="DESAFIANTE">Desafiantes</option>
                  <option value="GASTRONOMIA">Gastronómicas</option>
                  <option value="EXOTICO">Exóticas</option>
                </select>
                <button onClick={() => handleSaveCategoria(tour.id)}>
                  Guardar Categoría
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditCategoria(tour)}>
                  Editar Categoría
                </button>
                <button onClick={() => handleDeleteTour(tour.id)}>
                  Eliminar Tour
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarTours;