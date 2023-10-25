import React, { useState } from 'react';

const RegistrarTour = () => {
  const [tourData, setTourData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    transporte: '',
    categoria: '',
    alojamiento: '',
    actividad: '',
    imagenes: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let parsedValue = value;

    if (name === 'precio' || name === 'alojamiento' || name === 'actividad') {
      parsedValue = parseFloat(value);
    }

    if (type === 'file') {
      parsedValue = files[0];
    }

    setTourData({ ...tourData, [name]: parsedValue });
  };

  const handleReset = () => {
    setTourData({
      nombre: '',
      descripcion: '',
      precio: '',
      transporte: '',
      categoria: '',
      alojamiento: '',
      actividad: '',
      imagenes: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(tourData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fetch('http://localhost:8089/tour', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Tour agregado con éxito:', data);
        e.target.reset();
      })
      .catch(error => {
        console.error('Error al enviar el tour:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={tourData.nombre}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Descripcion:
        <input
          type="text"
          name="descripcion"
          value={tourData.descripcion}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Precio:
        <input
          type="text"
          name="precio"
          value={tourData.precio}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Transporte:
        <input
          type="text"
          name="transporte"
          value={tourData.transporte}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Categoria:
        <input
          type="text"
          name="categoria"
          value={tourData.categoria}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Alojamiento:
        <input
          type="text"
          name="alojamiento"
          value={tourData.alojamiento}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Actividad:
        <input
          type="text"
          name="actividad"
          value={tourData.actividad}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Imagen:
        <input
          type="file"
          name="imagenes"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="reset" onClick={handleReset}>Resetear Formulario</button>
      <button type="submit">Agregar Tour</button>
    </form>
  );
};

export default RegistrarTour;