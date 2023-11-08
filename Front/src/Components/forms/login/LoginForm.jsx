import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonXL from "./../../buttons/button-xl/ButtonXL";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const { username, password } = formData;
    const newErrors = {};

    if (!username) {
      newErrors.username = "El email es obligatorio";
    } else if (!isEmailValid(username)) {
      newErrors.username = "El email no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    validateForm();

    if (Object.keys(errors).length === 0) {
      // Agregar solicitud al backend
    } else {
      console.error("El formulario no es válido. Por favor, corrige los errores.");
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
                    <label htmlFor="username" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className={`form-control ${submit && errors.username ? "is-invalid" : ""}`}
                      id="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    {submit && errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control ${submit && errors.password ? "is-invalid" : ""}`}
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {submit && errors.password && (
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
                    <Link className="nav-item nav-link" to="/create">
                      Crear cuenta
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
