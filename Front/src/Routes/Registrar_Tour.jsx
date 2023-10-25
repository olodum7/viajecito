import React, { useState } from "react";
import "./../form.css";

const RegistrarTour = () => {
  const [tourData, setTourData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    transporte: "",
    categoria: "",
    alojamiento: "",
    actividad: "",
    imagenes: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let parsedValue = value;

    if (name === "precio" || name === "alojamiento" || name === "actividad") {
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
      transporte: "",
      categoria: "",
      alojamiento: "",
      actividad: "",
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
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-5">
              <label for="nombre" class="form-label">
                Nombre*
              </label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                name="nombre"
                value={tourData.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-5">
              <label for="descripcion" class="form-label">
                Descripción*
              </label>
              <input
                type="text"
                class="form-control"
                id="descripcion"
                name="descripcion"
                value={tourData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-5">
              <label for="precio" class="form-label">
                Precio*
              </label>
              <input
                type="number"
                class="form-control"
                id="precio"
                name="precio"
                value={tourData.precio}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-5">
              <label for="categoria" class="form-label">
                Categoría*
              </label>
              <select
                class="form-control"
                id="categoria"
                name="categoria"
                value={tourData.categoria}
                onChange={handleChange}
                required
              >
                <option value="Playas">Playas</option>
                <option value="Nieve">Nieve</option>
                <option value="Naturales">Naturales</option>
                <option value="Desafiantes">Desafiantes</option>
                <option value="Gastronómicas">Gastronómicas</option>
                <option value="Exóticas">Exóticas</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group mb-5">
          <label for="imagenes" class="form-label">
            Imágenes*
          </label>
          <input
            type="file"
            class="form-control"
            id="imagenes"
            name="imagenes"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button type="reset" class="btn btn-secondary" onClick={handleReset}>
          Resetear Formulario
        </button>
        <button type="submit" class="btn btn-primary">
          Agregar Tour
        </button>
      </form>
    </div>
  );
};

export default RegistrarTour;
