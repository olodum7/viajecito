import { useState, useEffect } from "react";
import Categoria from "./../Components/category/CategoryTour";

const List = () => {
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
  };

  const handleSaveCategoria = () => {

    const formData = new FormData();

    Object.entries(editingTour).forEach(([key, value]) => {

      if (key === "categoria") {
        const categoriaId = Number(newCategoria);
        console.log(categoriaId);
        formData.append("categoria", categoriaId);
      } else if (key === "dificultad") {
        formData.append("dificultad", value.toUpperCase());
      } else {
        formData.append(key, value);
        console.log(
          "key: " + key + " value: " + value
        );
      }
    });

    
    setEditingTour(formData);
    console.log(editingTour);
    console.log(newCategoria);
    console.log(editingTour.id);

    fetch(`http://localhost:8089/tour`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        setTours((prevTours) =>
          prevTours.map((tour) =>
            tour.id === editingTour.id ? { ...tour, categoria: newCategoria} : tour
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
    console.log();
    fetch(`http://localhost:8089/tour/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTours((prevTours) =>
          prevTours.filter((tour) => tour.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el tour: \n", error);
      });
  };

  return (
    <table class="table">
      <thead><tr>
        <th>Nombre del Tour</th><th>Acciones</th>
      </tr>
      </thead>
      <tbody>
        {tours.map((tour) => (
          <tr key={tour.id}>
            <td>{tour.titulo} - {tour.categoria}</td>
            {editingTour === tour ? (
              <div className="row" id="categoria">
                <Categoria
                  tourData={{ categoria: parseInt(newCategoria)}}
                  handleChange={(e) => setNewCategoria(e.target.value)}
                />
                <td><button onClick={handleSaveCategoria}>
                  Guardar Categoría
                </button></td>
              </div>
            ) : (
              <td>
                <button type="button" class="btn btn-warning" onClick={() => handleEditCategoria(tour)}>
                  Editar Categoría
                </button>
                <button type="button" class="btn btn-danger" onClick={() => handleDeleteTour(tour.id)}>
                  Eliminar Tour
                </button>
              </td>

            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;