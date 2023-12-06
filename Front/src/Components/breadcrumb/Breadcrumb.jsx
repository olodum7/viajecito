import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import ReturnButton from "/src/Components/buttons/ReturnButton.jsx";

const Breadcrumb = ({ pageName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;

    return (
      <li key={name} className={`breadcrumb-item ${isLast ? "active" : ""}`}>
        {isLast ? pageName : <Link to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>}
      </li>
    );
  });

  breadcrumbItems.unshift(
    <li key="home" className="breadcrumb-item">
      <Link to="/">Home</Link>
    </li>
  );

  return (
    <div className="container-xl breadcrumb-container mb-3">
      <div className="row">
        <div className="col-8">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">{breadcrumbItems}</ol>
          </nav>
        </div>
        <div className="col-4">
          <ReturnButton />
        </div>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  pageName: PropTypes.string,
}

export default Breadcrumb;
