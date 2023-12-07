import { useState, useEffect } from "react";
import { format } from 'date-fns';
import Salida from "../Components/salida/SalidaTour";
import Categoria from "./../Components/category/CategoryTour";
import Hotel from "../Components/hotel/Hotel";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import ButtonXL from "../Components/buttons/ButtonXL";

const AddTour = () => {
  const [salidaData, setSalidaData] = useState({
    dias: "",
    fechaDesde: "",
    fechaHasta: ""
  });

  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    precioBase: 0,
    precioAdulto: 0,
    precioMenor: 0,
    categoria: 0,
    rating: "",
    duracion: 2,
    dificultad: "",
    salida: salidaData,
    pasajes: false,
    transporte: "",
    traslado: false,
    entradas: "",
    guia: false,
    itinerario: "",
    alojamiento: 0,
    imagenes: FileList,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Actualizo datos de la salida en base a los cambios 
  const handleSalidaDataChange = (updatedSalidaData) => {
    setSalidaData((prevSalidaData) => ({
      ...prevSalidaData,
      ...updatedSalidaData
    }));
  };

  useEffect(() => {
    const validateForm = () => {
      const { titulo, subtitulo, precioBase, precioAdulto, precioMenor, categoria, rating,
        duracion, dificultad, pasajes, transporte, traslado, guia, itinerario, alojamiento, imagenes } = formData;
      const newErrors = {};

      if (!titulo || titulo.length < 8) {
        newErrors.titulo = "El titulo debe tener al menos 8 caracteres";
      }

      if (!subtitulo || subtitulo.length < 8)
        newErrors.subtitulo = "El subtitulo debe tener al menos 8 caracteres";

      if (!precioBase || precioBase == 0)
        newErrors.precioBase = "El precio base no puede ser 0";

      if (!precioAdulto && precioAdulto >= precioBase)
        newErrors.precioAdulto = "El precio por adulto debe ser mayor a cero y menor al precio base";

      if (!precioMenor && precioMenor >= precioBase)
        newErrors.precioMenor = "El precio por menor debe ser menor al precio base";

      if (!rating || rating == "")
        newErrors.rating = "El rating es obligatorio";

      if (!duracion || duracion < 2)
        newErrors.duracion = "La duración debe ser mayor  a 2 días";

      if (!dificultad || dificultad.length == 0)
        newErrors.dificultad = "Debe seleccionar la dificultad del tour";

      if (!categoria || categoria == 0)
        newErrors.categoria = "Debe seleccionar una categoria";

      if (!transporte) newErrors.transporte = "Transporte es obligatorio";
      if (!itinerario || itinerario.length < 20)
        newErrors.itinerario = "El itinerario no puede contener un texto con menos de 50 caracteres";

      if (!imagenes || imagenes.length < 5) newErrors.imagenes = "Debe seleccionar al menos 5 imagenes";

      if (!alojamiento) newErrors.alojamiento = "El alojamiento es obligatorio";

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  const handleCheckEntradasChange = (e) => {
    if (e.target.checked) {
      document.getElementById("cont-input-entradas").style.display = "block";
    } else {
      document.getElementById("cont-input-entradas").style.display = "none";
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (isFormValid) {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {

        if (key === "imagenes") {
          for (let i = 0; i < value.length; i++) {
            formDataToSend.append("imagenes", value[i])
          }
        } else if (key === "salida") {
          formDataToSend.append("salida[dias]", salidaData.dias);
          formDataToSend.append("salida[fechaDesde]", format(new Date(salidaData.fechaDesde), 'dd/MM/yyyy'));
          formDataToSend.append("salida[fechaHasta]", format(new Date(salidaData.fechaHasta), 'dd/MM/yyyy'));
        } else {
          formDataToSend.append(key, value);
        }
      });
      
      fetch("http://34.207.134.182:8089/tour", {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.tipo === "ok") {
            // Éxito en el registro
            Swal.fire({
              title: "Nuevo registro de producto",
              text: "Registro agregado con éxito: " + formData.titulo,
              icon: "success",
            })
            handleReset();
          } else {
            setMensaje({ tipo: data.tipo, texto: data.mensaje });
          }
          setErrors({});
          setAttemptedSubmit(false);
        })
        .catch((error) => {
          // Error en la solicitud
          setMensaje({ tipo: error.tipo, texto: error.mensaje + " - " + error});
        });
    } else {
      setMensaje({ tipo: "error", texto: "El formulario no es válido. Por favor, corrige los errores." });
    }
  };

  /* Reseteo de valores */
  const handleReset = () => {
    setMensaje({ 
      tipo: "", 
      texto: ""
    });

    setSalidaData({
      dias: "",
      fechaDesde: "",
      fechaHasta: ""
    });

    setFormData({
      titulo: "",
      subtitulo: "",
      precioBase: 0,
      precioAdulto: 0,
      precioMenor: 0,
      categoria: 0,
      rating: "",
      duracion: 0,
      dificultad: "",
      salidas: salidaData,
      pasajes: false,
      transporte: "",
      traslado: false,
      entradas: "",
      guia: false,
      alojamiento: 0,
      itinerario: "",
      imagenes: FileList,
    });
    document.getElementById("cont-input-entradas").style.display = "none";
    document.getElementById("cont-input-entradas").value = "";
  };

  return (
    <section className="content-wrapper content-section">
      <Breadcrumb tourName={"Agregar tour"} />
      <div className="d-flex justify-content-end form-container form-tour">
        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h2>Datos base</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <small>Titulo*</small>

                <input type="text" className={`form-control ${attemptedSubmit && errors.titulo ? "is-invalid" : ""}`}
                  id="titulo" value={formData.titulo} onChange={handleInputChange} />
                {attemptedSubmit && errors.titulo && (<div className="invalid-feedback"> {errors.titulo}</div>)}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <small>Subtitulo*</small>
                <input type="text" className={`form-control ${attemptedSubmit && errors.subtitulo ? "is-invalid" : ""}`}
                  id="subtitulo" value={formData.subtitulo} onChange={handleInputChange} />
                {attemptedSubmit && errors.subtitulo && (<div className="invalid-feedback"> {errors.subtitulo}</div>)}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <small>Precio Base*</small>
                <input type="number" className={`form-control ${attemptedSubmit && errors.precioBase ? "is-invalid" : ""}`}
                  id="precioBase" value={formData.precioBase} onChange={handleInputChange} />
                {attemptedSubmit && errors.precioBase && (<div className="invalid-feedback"> {errors.precioBase}</div>)}
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-3">
                <small>Precio por adulto*</small>
                <input type="number" className={`form-control ${attemptedSubmit && errors.precioAdulto ? "is-invalid" : ""}`}
                  id="precioAdulto" value={formData.precioAdulto} onChange={handleInputChange} />
                {attemptedSubmit && errors.precioAdulto && (<div className="invalid-feedback"> {errors.precioAdulto}</div>)}
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-3">
                <small>Precio por menores*</small>
                <input type="number" className={`form-control ${attemptedSubmit && errors.precioMenor ? "is-invalid" : ""}`}
                  id="precioMenor" value={formData.precioMenor} onChange={handleInputChange} />
                {attemptedSubmit && errors.precioMenor && (<div className="invalid-feedback"> {errors.precioMenor}</div>)}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <small>Rating*</small>
                <input type="text" className={`form-control ${attemptedSubmit && errors.rating ? "is-invalid" : ""}`}
                  id="rating" value={formData.rating} onChange={handleInputChange} />
                {attemptedSubmit && errors.rating && (<div className="invalid-feedback"> {errors.rating}</div>)}
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-3">
                <small>Duración en días*</small>
                <input type="text" className={`form-control ${attemptedSubmit && errors.duracion ? "is-invalid" : ""}`}
                  id="duracion" value={formData.duracion} onChange={handleInputChange} />
                {attemptedSubmit && errors.duracion && (<div className="invalid-feedback"> {errors.duracion}</div>)}
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-3">
                <small>Dificultad*</small>
                <select type="number" className={`form-control ${attemptedSubmit && errors.dificultad ? "is-invalid" : ""}`}
                  id="dificultad" value={formData.dificultad} onChange={handleInputChange}>
                  <option value=''>Seleccione...</option>
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA_ALTA">Media-Alta</option>
                  <option value="MEDIA">Media</option>
                  <option value="MEDIA_BAJA">Media-Baja</option>
                  <option value="BAJA">Baja</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <Categoria tourData={{ categoria: parseInt(formData.categoria), categoriaNom: "" }} handleChange={handleInputChange}
              className={`form-control ${attemptedSubmit && errors.categoria ? "is-invalid" : ""}`} />
            {attemptedSubmit && errors.categoria && (<div className="invalid-feedback"> {errors.categoria}</div>)}
          </div>

          <div className="row">
            <Salida salidaData={salidaData} onSalidaDataChange={handleSalidaDataChange} />
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <small>Transporte*</small>
                <input type="text" className={`form-control ${attemptedSubmit && errors.transporte ? "is-invalid" : ""}`}
                  id="transporte" value={formData.transporte} onChange={handleInputChange} />
                {attemptedSubmit && errors.transporte && (<div className="invalid-feedback"> {errors.transporte}</div>)}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <small>Itinerario*</small>
                <textarea type="text" className={`form-control ${attemptedSubmit && errors.itinerario ? "is-invalid" : ""}`}
                  id="itinerario" value={formData.itinerario} onChange={handleInputChange} />
                {attemptedSubmit && errors.itinerario && (<div className="invalid-feedback"> {errors.itinerario}</div>)}
              </div>
            </div>
          </div>

          <div className="row">
            <small>Imagenes*</small>
            <div className="div-imagenes">
              <input type="file" multiple className={`form-control ${attemptedSubmit && errors.imagenes ? "is-invalid" : ""}`}
                id="imagenes" onChange={(e) => handleInputChange({ target: { id: "imagenes", value: Array.from(e.target.files) } })} accept=".jpg, .jpeg, .png" />
              {attemptedSubmit && errors.imagenes && (<div className="invalid-feedback"> {errors.imagenes}</div>)}
            </div>
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
                  <input className="form-check-input" name="pasajes" type="checkbox" value={formData.pasajes} onChange={handleInputChange} />
                  ¿Incluye pasajes?</label>
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-3">
                <label className="label-checkbox">
                  <input className="form-check-input" name="traslado" type="checkbox" value={formData.traslado} onChange={handleInputChange} />
                  ¿Incluye traslados?</label>
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-3">
                <label className="label-checkbox">
                  <input className="form-check-input" name="guia" type="checkbox" value={formData.guia} onChange={handleInputChange} />
                  ¿Incluye guia?</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <label className="label-checkbox">
                  <input className="form-check-input" id="checkEntradas" name="checkEntradas" type="checkbox" onChange={handleCheckEntradasChange} />
                  ¿Incluye entradas?</label>
              </div>
            </div>
            <div className="col" id="cont-input-entradas">
              <div className="form-group mb-3">
                <input type="text" placeholder="¿Cuáles?" className={`form-control ${attemptedSubmit && errors.entradas ? "is-invalid" : ""}`}
                  id="entradas" value={formData.entradas} onChange={handleInputChange} accept=".jpg, .jpeg, .png" />
                {attemptedSubmit && errors.entradas && (<div className="invalid-feedback"> {errors.entradas}</div>)}
              </div>
            </div>
          </div>

          <div className="row">
            <Hotel tourData={{ alojamiento: parseInt(formData.alojamiento) }} handleChange={handleInputChange}
              className={`form-control ${attemptedSubmit && errors.alojamiento ? "is-invalid" : ""}`} />
            {attemptedSubmit && errors.alojamiento && (<div className="invalid-feedback"> {errors.alojamiento}</div>)}
          </div>

          <div className="row">
            <div className="col col-buttons">
              <ButtonXL url="" buttonName="Resetear Formulario" isSubmit={false} />
              <ButtonXL url="" buttonName="Agregar" isSubmit={true} disabled={Object.keys(errors).length > 0} />
            </div>

            {mensaje && (
              <div className={`mt-3 alert alert-${mensaje.tipo === "error" ? "danger" : "success"}`} >
                {mensaje.texto}
              </div>
            )}

          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTour;