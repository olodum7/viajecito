import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const NavUser = ({ logout, action, closeMenu }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setCurrentPage(path);
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const nombre = userData.nombre;
  const apellido = userData.apellido;
  const rol = userData.tipo;
  const [showOptions, setShowOptions] = useState(window.innerWidth < 992);

  const optionsPanelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsPanelRef.current &&
        !optionsPanelRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setShowOptions(true);
      } else {
        setShowOptions(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShowOptions(action);
  }, [action]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = () => {
    closeMenu();
    toggleOptions();
  };

  return (
    <div className="navbar-user">
      <div className="container">
        <div className="row">
          <div className="col navbar-user-greeting">
            <p>Hola {nombre}!</p>
          </div>
          <div className="col-4 navbar-user-button">
            <button onClick={toggleOptions} className="btn btn-primary">
              {apellido && (
                <span>
                  {nombre[0]}
                  {apellido[0]}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {showOptions && (
        <div className="options-panel" ref={optionsPanelRef}>
          { rol == "ROLE_ADMIN" &&
          <Link
            to="/admin"
            onClick={() => {
              handleLinkClick("/admin");
              handleOptionSelect();
            }}
            className={currentPage === "/admin" ? "active-link" : ""}
          >
            <div className="options-panel-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-layout-wtf" viewBox="0 0 16 16">
                <path d="M5 1v8H1V1zM1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm13 2v5H9V2zM9 1a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 13v2H3v-2zm-2-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm12-1v2H9v-2zm-6-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z" />
              </svg>
            </div>
            Administrar
          </Link>
          }

          <Link
            to="/profile"
            onClick={() => {
              handleLinkClick("/profile");
              handleOptionSelect();
            }}
            className={currentPage === "/profile" ? "active-link" : ""}
          >
            <div className="options-panel-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user-circle"
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
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
              </svg>
            </div>
            Mis datos
          </Link>
          <Link
            to="profile/reservation"
            onClick={() => {
              handleLinkClick("profile/reservation");
              handleOptionSelect();
            }}
            className={currentPage === "profile/reservation" ? "active-link" : ""}
          >
            <div className="options-panel-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-ticket"
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
                <path d="M15 5l0 2"></path>
                <path d="M15 11l0 2"></path>
                <path d="M15 17l0 2"></path>
                <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path>
              </svg>
            </div>
            Mis reservas
          </Link>
          <Link
            to="/profile/favs"
            onClick={() => {
              handleLinkClick("/profile/favs");
              handleOptionSelect();
            }}
            className={currentPage === "/profile/favs" ? "active-link" : ""}
          >
            <div className="options-panel-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-heart-filled"
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
                <path
                  d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
                  strokeWidth="0"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            Mis favoritos
          </Link>
          <Link
            to="/"
            onClick={() => {
              logout();
              handleOptionSelect();
            }}
          >
            <div className="options-panel-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-logout-2"
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
                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
                <path d="M15 12h-12l3 -3"></path>
                <path d="M6 15l-3 -3"></path>
              </svg>
            </div>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

NavUser.propTypes = {
  logout: PropTypes.func,
  action: PropTypes.bool,
  closeMenu: PropTypes.func,
}

export default NavUser;