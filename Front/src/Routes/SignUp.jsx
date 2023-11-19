import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonXL from "./../Components/buttons/ButtonXL";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const validateForm = () => {
      const { firstName, lastName, email, password, confirmPassword } =
        formData;
      const newErrors = {};

      if (!firstName) newErrors.firstName = "El nombre es obligatorio";
      else if (firstName.length < 3)
        newErrors.firstName = "El nombre debe tener al menos 3 caracteres";

      if (!lastName) newErrors.lastName = "El apellido es obligatorio";
      else if (lastName.length < 3)
        newErrors.lastName = "El apellido debe tener al menos 3 caracteres";

      if (!email) newErrors.email = "El email es obligatorio";
      else if (!isEmailValid(email)) newErrors.email = "El email no es válido";

      if (!password) newErrors.password = "La contraseña es obligatoria";
      else if (password.length < 6)
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";

      if (password !== confirmPassword)
        newErrors.confirmPassword = "Las contraseñas no coinciden";

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (mensaje) {
      setMensaje(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (isFormValid) {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.firstName);
      formDataToSend.append("apellido", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      fetch("http://localhost:8089/usuario", {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json())
        .then((data) => {
          //  setMensaje({ tipo: data.tipo, texto: data.mensaje });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
          setAttemptedSubmit(false);
          console.log(data);
          if (data.tipo === "ok") {
            // Éxito en el registro
            Swal.fire({
              title: "Te damos la bienvenida " + formData.firstName + "",
              text: "El registro fue exitoso.",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          } else {
            // Error en el registro
            setMensaje({ tipo: data.tipo, texto: data.mensaje });
          }
        })
        .catch((error) => {
          // Error en la solicitud
          console.error("Error en el registro de usuario:", error);
          setMensaje({ tipo: data.tipo, texto: data.mensaje });
        });
    } else {
      console.error(
        "El formulario no es válido. Por favor, corrige los errores."
      );
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
                <p className="mt-3 mb-5">
                  ¡Crea tu cuenta y comienza tu aventura!
                </p>
              </div>
              <div className="card-body">
                <form className="form-normal" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        Nombre*
                      </label>
                      <input
                        type="text"
                        className={`form-control ${attemptedSubmit && errors.firstName
                            ? "is-invalid"
                            : ""
                          }`}
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {attemptedSubmit && errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Apellido*
                      </label>
                      <input
                        type="text"
                        className={`form-control ${attemptedSubmit && errors.lastName ? "is-invalid" : ""
                          }`}
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {attemptedSubmit && errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email*
                    </label>
                    <input
                      type="email"
                      className={`form-control ${attemptedSubmit && errors.email ? "is-invalid" : ""
                        }`}
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {attemptedSubmit && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña*
                    </label>
                    <input
                      type="password"
                      className={`form-control ${attemptedSubmit && errors.password ? "is-invalid" : ""
                        }`}
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {attemptedSubmit && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar contraseña*
                    </label>
                    <input
                      type="password"
                      className={`form-control ${attemptedSubmit && errors.confirmPassword
                          ? "is-invalid"
                          : ""
                        }`}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {attemptedSubmit && errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                  <ButtonXL
                    url="#"
                    buttonName="Crear cuenta"
                    isSubmit={true}
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                  />
                  <p className="text-center mt-4 mb-0">
                    ¿Ya tienes una cuenta?
                    <Link className="nav-item nav-link" to="/login">
                      Iniciar sesión
                    </Link>
                  </p>
                  {mensaje && (
                  <div className={`mt-3 alert alert-${mensaje.tipo === "error" ? "danger" : "success"}`}  >
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

export default SignUp;
