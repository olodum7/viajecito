import { Link } from "react-router-dom";

const NavBar = () => {
    return(
    <nav>
        <Link to="/" > Inicio </Link>
        <Link to="/tour" >Tours </Link>
    </nav>
    )
}
export default NavBar