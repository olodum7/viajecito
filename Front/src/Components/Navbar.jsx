import { Link } from "react-router-dom";
import logo from '../assets/img/icons/logos/logo.svg'

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand bg-light navigation-clean navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand" >  <img src={ logo } /> </Link>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"></button>
                <div className="collapse navbar-collapse" >
                    <Link to="/register" className="btn btn-primary text-uppercase ms-auto" >Registrar Tour</Link>
                </div>
            </div>
        </nav>
    )
}
export default NavBar