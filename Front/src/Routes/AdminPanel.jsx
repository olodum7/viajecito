import Button from "../Components/buttons/Button";
import Breadcrumb from "../Components/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <main>
      <section className="profile-header">
        <div className="container-xl">
          <div className="row">
            <h1>Panel de Administración</h1>
          </div>
        </div>
      </section>
      <Breadcrumb tourName={"Panel administrador"} />

      <div className="container panel-admin">
        <div className="row justify-content-center">
          <div className="col-4 btn-admin-container">
            <Link to={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-users"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
              Usuarios
            </Link>
          </div>
          <div className="col-4 btn-admin-container">
            <Link to={"/admin/tour"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-caravan"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 18a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M11 18h7a2 2 0 0 0 2 -2v-7a2 2 0 0 0 -2 -2h-9.5a5.5 5.5 0 0 0 -5.5 5.5v3.5a2 2 0 0 0 2 2h2" />
                <path d="M8 7l7 -3l1 3" />
                <path d="M13 11m0 .5a.5 .5 0 0 1 .5 -.5h2a.5 .5 0 0 1 .5 .5v2a.5 .5 0 0 1 -.5 .5h-2a.5 .5 0 0 1 -.5 -.5z" />
                <path d="M20 16h2" />
              </svg>
              Tours
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
