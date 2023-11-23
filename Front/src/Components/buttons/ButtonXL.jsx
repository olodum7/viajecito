import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ButtonXL = ({ url, buttonName, isSubmit }) => {
  if (isSubmit) {
    return (
      <button type="submit" className="btn btn-lg w-full w-lg-auto">
        {buttonName}
      </button>
    );
  } else {
    return (
      <Link to={url} className="btn btn-lg w-full w-lg-auto">
        {buttonName}
      </Link>
    );
  }
};

ButtonXL.propTypes = {
  url: PropTypes.string,
  buttonName: PropTypes.string,
  isSubmit: PropTypes.bool,
};

export default ButtonXL