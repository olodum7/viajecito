import React, { useState } from 'react';

const RegistrarTour = () => {
  const [tourData, setTourData] = useState({
    nombre: '',
    subtitulo: '',
    precio: '',
    rating: '',
    duiracion: '',
    dificultad: '',
    fecha_de_salida: '',
    itinerario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleReset = () => {
    setTourData({
      nombre: '',
      subtitulo: '',
      precio: '',
      rating: '',
      duracion: '',
      dificultad: '',
      fecha_de_salida: '',
      itinerario: ''
    });
  };

  return (
    <form>
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
        Subtítulo:
        <input
          type="text"
          name="subtitulo"
          value={tourData.subtitulo}
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
        Rating:
        <input
          type="text"
          name="rating"
          value={tourData.rating}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Duración:
        <input
          type="text"
          name="duracion"
          value={tourData.duracion}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Dificultad:
        <input
          type="text"
          name="dificultad"
          value={tourData.dificultad}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Fecha de Salida:
        <input
          type="text"
          name="fecha_de_salida"
          value={tourData.fecha_de_salida}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Itinerario:
        <input
          type="text"
          name="itinerario"
          value={tourData.itinerario}
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