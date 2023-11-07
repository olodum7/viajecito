import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonXL from "./../../buttons/button-xl/ButtonXL";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = "El nombre es obligatorio";
    } else if (firstName.length < 3) {
      newErrors.firstName = "El nombre debe tener al menos 3 caracteres";
    }

    if (!lastName) {
      newErrors.lastName = "El apellido es obligatorio";
    } else if (lastName.length < 3) {
      newErrors.lastName = "El apellido debe tener al menos 3 caracteres";
    }

    if (!email) {
      newErrors.email = "El email es obligatorio";
    } else if (!isEmailValid(email)) {
      newErrors.email = "El email no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
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
    <section id="register">
      <div className="container-fluid">
        <div className="row">
          <div className="register-form-container d-flex justify-content-center justify-content-md-end col-12 col-md-6">
            <div className="card">
              <div className="card-title">
                <h1>Únete a la comunidad de Viajecito</h1>
                <p className="mt-3 mb-5">¡Crea tu cuenta y comienza tu aventura!</p>
              </div>
              <div className="card-body">
                <form className="form-normal" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className={`form-control ${submit && errors.firstName ? "is-invalid" : ""}`}
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {submit && errors.firstName && (
                        <div className="invalid-feedback">{errors.firstName}</div>
                      )}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Apellido
                      </label>
                      <input
                        type="text"
                        className={`form-control ${submit && errors.lastName ? "is-invalid" : ""}`}
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {submit && errors.lastName && (
                        <div className="invalid-feedback">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${submit && errors.email ? "is-invalid" : ""}`}
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {submit && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
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
                  <div className="mb-5">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control ${submit && errors.confirmPassword ? "is-invalid" : ""}`}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {submit && errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>
                  <ButtonXL
                    url="#"
                    buttonName="Crear cuenta"
                    isSubmit={true} 
                    onClick={handleSubmit}
                    disabled={Object.keys(errors).length > 0}
                  />
                  <p className="text-center mt-4 mb-0">
                    ¿Ya tienes una cuenta?
                    <Link className="nav-item nav-link" to="/login">
                      Iniciar sesión
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

export default CreateForm;
