import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ButtonXL from "./../Components/buttons/ButtonXL";

import { useContextGlobal } from "./../Components/utils/global.context";

const Login = () => {
  const { toursState, dispatch } = useContextGlobal();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromProtectedRoute) {
      Swal.fire({
        title: 'Autenticación requerida',
        text: 'Debes estar logueado para ver ese contenido',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }

    if (location.state?.fromReserve) {
      Swal.fire({
        title: 'Autenticación requerida',
        text: 'El login es obligatorio para completar una reserva. Por favor, registrese.',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }

    if (location.state?.fromFavButton) {
      Swal.fire({
        title: 'Autenticación requerida',
        text: 'Debes estar logueado para gestionar tus favoritos',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }
  }, [location]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState(null);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email) {
      newErrors.email = "El email es obligatorio";
    } else if (!isEmailValid(email)) {
      newErrors.email = "El email no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);

    // Devuelve true si no hay errores, de lo contrario, false
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Limpiar mensajes de error cuando se cambian los valores
    if (mensaje) {
      setMensaje(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviarlo
    const isFormValid = validateForm();

    if (isFormValid) {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      fetch("http://34.207.134.182:8089/usuario/login", {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.tipo === "ok") {
            const userData = {
              isLoggedIn: "true",
              id: data.id,
              nombre: data.nombre,
              apellido: data.apellido,
              email: formData.email,
              tipo: data.privilegios[0].authority,
            };

            localStorage.setItem("userData", JSON.stringify(userData));
            dispatch({ type: "LOGIN", payload: userData });

            // Éxito en el inicio de sesión
            setMensaje({
              tipo: "success",
              texto: "Inicio de sesión exitoso.",
            });
            if (location.state?.fromReserve) {
              navigate("/detailReservation");
            } else {
              navigate("/");
            }
          } else {
            // Error en el inicio de sesión
            setMensaje({
              tipo: "error",
              texto: data.mensaje || "Error en el inicio de sesión.",
            });
          }
        })
        .catch((error) => {
          console.error(
            "Hubo un problema con la solicitud de inicio de sesión:",
            error
          );
          setMensaje({
            tipo: "error",
            texto: "Hubo un problema con la solicitud de inicio de sesión.",
          });
        });
    } else {
      // Si el formulario no es válido, no se envía y se muestran errores
      console.error(
        "El formulario no es válido. Por favor, corrige los errores."
      );
    }
  };

  return (
    <section id="login">
      <div className="container-fluid">
        <div className="row">
          <div className="login-form-container d-flex justify-content-center justify-content-md-end col-12 col-md-6">
            <div className="card">
              <div className="card-title">
                <h1>Hola, gracias por volver</h1>
                <p className="mt-3 mb-5">Ingresa para continuar tu viaje</p>
              </div>
              <div className="card-body">
                <form className="form-normal" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email*
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="password" className="form-label">
                      Contraseña*
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <ButtonXL
                    url="#"
                    buttonName="Iniciar sesión"
                    isSubmit={true}
                    disabled={Object.keys(errors).length > 0}
                  />
                  <p className="text-center mt-4 mb-0">
                    ¿Aún no tienes cuenta?
                    <Link className="nav-item nav-link" to="/sign-up">
                      Crear cuenta
                    </Link>
                  </p>
                  {mensaje && (
                    <div
                      className={`mt-3 alert alert-${
                        mensaje.tipo === "error" ? "danger" : "success"
                      }`}
                    >
                      {mensaje.texto}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;