import React, { useState } from "react";
import "../assets/css/form.css";

const RegistrarTour = () => {
  const [tourData, setTourData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagenes: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let parsedValue = value;

    if (name === "precio") {
      parsedValue = parseFloat(value);
    }

    if (type === "file") {
      parsedValue = files[0];
    }

    setTourData({ ...tourData, [name]: parsedValue });
  };

  const handleReset = () => {
    setTourData({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      imagenes: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(tourData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fetch("http://localhost:8089/tour", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tour agregado con éxito:", data);
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error al enviar el tour:", error);
      });
  };

  return (
    <div className="form-container mt-5">
      <form onSubmit={handleSubmit}>
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-5">
              <label htmlFor="nombre" className="form-label"> Nombre* </label>
              <input type="text" className="form-control" id="nombre"
                name="nombre"
                value={tourData.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-5">
              <label htmlFor="descripcion" className="form-label">
                Descripción*
              </label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={tourData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-5">
              <label htmlFor="precio" className="form-label">
                Precio*
              </label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                value={tourData.precio}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-5">
              <label htmlFor="categoria" className="form-label">
                Categoría*
              </label>

              <input
                type="text"
                className="form-control"
                id="categoria"
                name="categoria"
                value={tourData.categoria}
                onChange={handleChange}
                required
              />

              {/* <select class="form-control" id="categoria" name="categoria" value={tourData.categoria} onChange={handleChange} required>
                <option value="PLAYA">Playas</option>
                <option value="NIEVE">Nieve</option>
                <option value="NATURALEZA">Naturales</option>
                <option value="DESAFIANTE">Desafiantes</option>
                <option value="GASTRONOMIA">Gastronómicas</option>
                <option value="EXOTICO">Exóticas</option>
              </select> */}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-5">
                <label htmlFor="imagenes" className="form-label">
                  Imágenes*
                </label>
                <input type="file"
                  className="form-control"
                  id="imagenes"
                  name="imagenes"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
            </div>
          </div>
        </div>

        <button type="reset" className="btn btn-secondary" onClick={handleReset}>
          Resetear Formulario
        </button>
        <button type="submit" className="btn btn-primary">
          Agregar Tour
        </button>
      </form>
    </div>
  );
};

export default RegistrarTour;
