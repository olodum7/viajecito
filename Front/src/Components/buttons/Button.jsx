import { Link } from "react-router-dom";

const Button = ({ url, buttonName, action, customClass }) => {
  if (action) {
    return (
      <Link to={url} className={`btn btn-sm w-full w-lg-auto ${customClass}`} onClick={action}>
        {buttonName}
      </Link>
    );
  }
  return (
    <Link to={url} className="btn btn-sm w-full w-lg-auto">
      {buttonName}
    </Link>
  );
};

export default Button;
