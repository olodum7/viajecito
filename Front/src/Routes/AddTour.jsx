import { useState, useRef } from "react";
import Categoria from "./../Components/category/CategoryTour";
import Hotel from "../Components/hotel/Hotel";
import { parse } from "date-fns";

const AddTour = () => {
  const [mensaje, setMensaje] = useState("");
  const [tourData, setTourData] = useState({
    titulo: "",
    subtitulo: "",
    precioBase: 0,
    precioAdulto: 0,
    precioMenor: 0,
    categoria: 0,
    rating: "",
    duracion: 0,
    dificultad: "",
    salidas: [],
    pasajes: false,
    transporte: "",
    traslado: false,
    entradas: "",
    guia: false,
    itinerario: "",
    alojamiento: 0,
    imagenes: FileList,
  });

  const entradasRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const timer = setTimeout(() => {
    setMensaje("");
  }, 70000);

  /* Validaciones y conversion de datos */
  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;
    let parsedValue = value;
    let newName = name;

    if (name === "precio" && isNaN(value)) {
      parsedValue = parseInt(value);
    }

    if ((name === "rating" || name === "transporte" || name === "itinerario") && value != "") {
      parsedValue = value;
    }

    if (name === "salidas") {
      parsedValue = value;
    }

    if (name === "categoria" && isNaN(value)) {
      parsedValue = parseInt(value);
    }

    if (name == "duracion" && isNaN(value)) {
      parsedValue = parseInt(value);
    }

    if (name === "pasajes" || name === "traslado" || name === "guia") {
      parsedValue = checked;
    }

    if (name === "checkEntradas" && checked) {
      document.getElementById("cont-input-entradas").style.display = "block";
      parsedValue = entradasRef.current.value;
      newName = "entradas";
    } else if (name === "checkEntradas" && !checked) {
      document.getElementById("cont-input-entradas").style.display = "none";
    }

    if (name === "alojamiento" && isNaN(value)) {
      parsedValue = parseInt(value);
    }

    if (name === "imagenes" && files.length > 5) {
      const fileList = Array.from(files);
      setSelectedFiles(fileList);
    } else if (name === "imagenes") {
      console.log("No se seleccionaron archivos válidos o no se cumple con el minimo de 5 imagenes");
    }

    setTourData({ ...tourData, [newName]: parsedValue });
  };

  /* Reseteo de valores */
  const handleReset = () => {
    setTourData({
      titulo: "",
      subtitulo: "",
      precioBase: 0,
      precioAdulto: 0,
      precioMenor: 0,
      categoria: 0,
      rating: "",
      duracion: 0,
      dificultad: "",
      salidas: [],
      pasajes: false,
      transporte: "",
      traslado: false,
      entradas: "",
      guia: false,
      alojamiento: 0,
      itinerario: "",
      imagenes: FileList,
    });
    setSelectedFiles([]);
    clearTimeout(timer);
    document.getElementById("cont-input-entradas").style.display = "none";
    document.getElementById("cont-input-entradas").value = "";
  };

  /* Carga de datos */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(tourData).forEach(([key, value]) => {
      if (key === "imagenes") {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("imagenes", selectedFiles[i])
        }
      } else {
        formData.append(key, value);
      }
    });

    console.log(formData)

    fetch("http://localhost:8089/tour", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        setMensaje({ tipo: data.tipo, texto: data.mensaje });
        if (data.tipo == 'ok')
          handleReset();
      })
      .catch((error) => {
        console.error("Error al enviar el tour:", error);
      });
  };

  return (
    <div className="d-flex justify-content-end form-container form-tour">
      <form className="form" >
        <div className="row">
          <div className="col">
            <h2>Datos base</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group mb-3">
              <small>Titulo*</small>
              <input className="form-control" name="titulo" type="text" value={tourData.titulo} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group mb-3">
              <small>Subtitulo*</small>
              <input className="form-control" name="subtitulo" type="text" value={tourData.subtitulo} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group mb-3">
              <small>Precio Base*</small>
              <input className="form-control" name="precioBase" type="number" value={tourData.precioBase} onChange={handleChange} />
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <small>Precio por adulto*</small>
              <input className="form-control" name="precioAdulto" type="number" value={tourData.precioAdulto} onChange={handleChange} />
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <small>Precio por menores*</small>
              <input className="form-control" name="precioMenor" type="number" value={tourData.precioMenor} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group mb-3">
              <small>Rating*</small>
              <input className="form-control" name="rating" type="text" value={tourData.rating} onChange={handleChange} />
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <small>Rating*</small>
              <input className="form-control" name="rating" type="text" value={tourData.rating} onChange={handleChange} />
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <small>Duración en días*</small>
              <input className="form-control" name="duracion" type="number" value={tourData.duracion} onChange={handleChange} />
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <small>Dificultad*</small>
              <select className="form-control" name="dificultad" type="number" value={tourData.dificultad} onChange={handleChange} required>
                <option>Seleccione...</option>
                <option value="ALTA">Alta</option>
                <option value="MEDIA_ALTA">Media-Alta</option>
                <option value="MEDIA">Media</option>
                <option value="MEDIA_BAJA">Media-Baja</option>
                <option value="BAJA">Baja</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row" id="categoria">
          <div className="col">
            <div className="form-group mb-3">
              <small>Salida (ID separados por coma) *</small>
              <input className="form-control" name="salidas" type="text" value={tourData.salidas} onChange={handleChange} />
            </div>
          </div>
          <Categoria tourData={{ categoria: parseInt(tourData.categoria) }} handleChange={handleChange} />
        </div>
        <div className="row" id="itinerario">
          <div className="col">
            <div className="form-group mb-3">
              <small>Transporte*</small>
              <input className="form-control" name="transporte" type="text" value={tourData.transporte} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row" id="itinerario">
          <div className="col">
            <div className="form-group mb-3">
              <small>Itinerario*</small>
              <textarea className="form-control" name="itinerario" type="text" value={tourData.itinerario} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <small>Imagenes*</small>
          <div className="div-imagenes">
            <input className="btn btn-secondary" type="file" multiple name="imagenes" accept=".jpg, .jpeg, .png" onChange={handleChange} required />
          </div>
          <p className="p-img">Se requiere cargar al menos 5 imágenes. La primera será la imagen destacada de la experiencia.</p>
        </div>
        <div className="row">
          <div className="col">
            <h2>Detalles del paquete</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group mb-3">
              <label className="label-checkbox">
                <input className="form-check-input" name="pasajes" type="checkbox" checked={tourData.pasajes} onChange={handleChange} />
                ¿Incluye pasajes?</label>
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <label className="label-checkbox">
                <input className="form-check-input" name="traslado" type="checkbox" checked={tourData.traslado} onChange={handleChange} />
                ¿Incluye traslados?</label>
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <label className="label-checkbox">
                <input className="form-check-input" name="guia" type="checkbox" checked={tourData.guia} onChange={handleChange} />
                ¿Incluye guia?</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group mb-3">
              <label className="label-checkbox">
                <input className="form-check-input" id="checkEntradas" name="checkEntradas" type="checkbox" value={tourData.entradas} onChange={handleChange} />
                ¿Incluye entradas?</label>
            </div>
          </div>
          <div className="col" id="cont-input-entradas">
            <div className="form-group mb-3">
              <input className="form-control" type="text" placeholder="¿Cuáles?" ref={entradasRef} />
            </div>
          </div>
        </div>
        <div className="row">
          <Hotel tourData={{ alojamiento: parseInt(tourData.alojamiento) }} handleChange={handleChange} />
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-secondary" type="button" onClick={handleReset}>Resetear Formulario</button>
            <button className="btn" type="button" onClick={handleSubmit}>Agregar</button>
          </div>

          {mensaje && (
            <div className={`mt-3 alert alert-${mensaje.tipo === "error" ? "danger" : "success"}`} >
              {mensaje.texto}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTour;