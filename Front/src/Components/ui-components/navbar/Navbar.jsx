import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mainLogo from "/logo.svg";
import Button from "/src/Components/buttons/Button.jsx";
import NavUser from "./user/NavUser";

const Navbar = () => {
  const location = useLocation();
  const [toggleIcon, setToggleIcon] = useState(false);

  // Verificar si el usuario está logueado
  const userDataJson = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJson);
  const isLogged = userData && userData["isLoggedIn"] === "true";  

  const handleLogout = () => {
    localStorage.removeItem("userData");
  };


  return (
    <header>
      <nav className="navbar navbar-expand-lg px-0 py-3 fixed-top">
        <div className="container-xl">
          <Link className="navbar-brand" to="/">
            <img src={mainLogo} className="h-8" alt="..." />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setToggleIcon(!toggleIcon)}
          >
            <span className="navbar-toggler-icon">
              {!toggleIcon ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 6l16 0"></path>
                  <path d="M4 12l16 0"></path>
                  <path d="M4 18l16 0"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              )}
            </span>
          </button>

          <div className="collapse navbar-collapse gap-3" id="navbarCollapse">
            {!isLogged && location.pathname !== "/login" && (
              <div className="navbar-nav ms-lg-4">
                <Link className="nav-item nav-link" to="/login">
                  Iniciar sesión
                </Link>
              </div>
            )}

            {!isLogged && location.pathname !== "/sign-up" && (
              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Button url={"sign-up"} buttonName="Crear cuenta" />
              </div>
            )}

            {isLogged && (
              // Mostrar el componente NavUser si el usuario está logueado
              <NavUser data={userData} logout={handleLogout} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
