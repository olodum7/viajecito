import { useState, useEffect } from "react";
import Categoria from "../Components/category/CategoryTour";
import PropTypes from 'prop-types';

const List = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [newCategoria, setNewCategoria] = useState("");
  const [categories, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8089/tour")
      .then((response) => response.json())
      .then((data) => {
        setTours(data);
      })
      .catch((error) => {
        console.error("Error al obtener los tours: \n", error);
      });

      fetch("http://localhost:8089/categoria")
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías: \n", error);
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
          tour.id === editingTour.id ? { ...tour, categoria: findCategoriaName(newCategoria) } : tour
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
    //   .then((response) => response.json())
      .then(() => {
        setTours((prevTours) =>
          prevTours.filter((tour) => tour.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el tour: \n", error);
      });
  };

  const findCategoriaName = (categoriaId) => {
    const categoria = categories.find((cat) => cat.id === Number(categoriaId));
    return categoria ? categoria.nombre : categoriaId; // Retorna el nombre si se encuentra, de lo contrario el ID
  };

  return (
    <table className="tableList">
      <thead>
        <tr>
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
                  categories={categories}
                />
                <td><button onClick={handleSaveCategoria}>
                  Guardar Categoría
                </button></td>
              </div>
            ) : (
              <td>
                <button type="button" className="btn btn-warning" onClick={() => handleEditCategoria(tour)}>
                  Editar Categoría
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteTour(tour.id)}>
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