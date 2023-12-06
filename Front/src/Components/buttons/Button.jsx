import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Button = ({ url, buttonName, action, customClass }) => {
  if (action) {
    return (
      <Link to={url} className={`btn btn-sm w-full w-lg-auto ${customClass}`} onClick={action}>
        {buttonName}
      </Link>
    );
  }
  return (
    <Link to={url} className={`btn btn-sm w-full w-lg-auto ${customClass}`}>
      {buttonName}
    </Link>
  );
};

Button.propTypes = {
  url: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  action: PropTypes.func,
  customClass: PropTypes.string
};

export default Button;