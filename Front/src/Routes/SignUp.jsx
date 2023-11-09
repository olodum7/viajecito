import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [confirmaContrasenia, setConfirmaContrasenia] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedNombre = nombre.trim();
        const trimmedApellido = apellido.trim();
        const trimmedEmail = email.trim();
        const trimmedContrasenia = contrasenia.trim();
        const trimmedConfContrasenia = confirmaContrasenia.trim();

        const textError = () => {
            const regNombre = new RegExp("([a-zA-ZÀ-ÖØ-öø-ÿ]+.?([a-zA-ZÀ-ÖØ-öø-ÿ]+.?){2,})+.?([[:blank:]])*");
            const regEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$");

            if (regNombre.exec(trimmedNombre) == null) {
                return "Validando Nombre: Mínimo de 3 caracteres";
            }

            if (regNombre.exec(trimmedApellido) == null) {
                return "Validando Apellido: Mínimo de 3 caracteres";
            }

            if (regEmail.exec(trimmedEmail) == null) {
                return "Validando Email: Ingrese un email válido";
            }

            if (trimmedContrasenia != trimmedConfContrasenia) {
                return "Validando Contraseñas: Las mismas no coinciden, verifique"
            }
            return "";
        };

        const error = textError();

        if (error !== "") {
            setMensaje({ tipo: "error", texto: error });
        } else {
            // Si los valores son validos
            const formData = new FormData();
            formData.append('nombre', trimmedNombre);
            formData.append('apellido', trimmedApellido);
            formData.append('email', trimmedEmail);
            formData.append('password', trimmedContrasenia);

            fetch("http://localhost:8089/usuario", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setMensaje({ tipo: data.tipo, texto: data.mensaje });
                    setNombre("");
                    setApellido("");
                    setEmail("");
                    setContrasenia("");
                    setConfirmaContrasenia("");
                })
                .catch((error) => {
                    console.error("Error en el registro de usuario:", error);
                });
        }
    }

    return (
        <div className="d-flex justify-content-end form-container form-login">
            <form className="form" >
                <div className="row">
                    <div className="col">
                        <p>Únete a la comunidad de Viajecito</p>
                        <p>¡Crea tu cuenta y comienza tu aventura!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <small>Nombre</small>
                            <input className="form-control" type="text" placeholder="Juan" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group mb-3">
                            <small>Apellido</small>
                            <input className="form-control" type="text" placeholder="Pérez" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <small>Email</small>
                            <input className="form-control" type="email" placeholder="viajecito@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <small>Contraseña</small>
                            <input className="form-control" type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <small>Confirmar contraseña</small>
                            <input className="form-control" type="password" value={confirmaContrasenia} onChange={(e) => setConfirmaContrasenia(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn" type="button" onClick={handleSubmit}>Crear cuenta</button>
                    </div>
                    <p className="signIn"> ¿Ya tienes una cuenta? <Link to="#"> Iniciar sesión  </Link> </p>

                    {mensaje &&
                        <div className={`div-${mensaje.tipo}`}>
                            <p> {mensaje.texto} </p>
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default SignUp;
