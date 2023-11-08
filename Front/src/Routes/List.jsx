import React, { useState, useEffect } from "react";

const ListarTours = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [newCategoria, setNewCategoria] = useState("");

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
  };

  const handleSaveCategoria = (id) => {
    
    fetch(`http://localhost:8089/tour/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoria: newCategoria }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        setTours((prevTours) =>
          prevTours.map((tour) =>
            tour.id === id ? { ...tour, categoria: newCategoria } : tour
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
            {tour.nombre} - {tour.categoria}
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