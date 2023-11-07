import { Link } from "react-router-dom";

const Button = ({ url, buttonName }) => {
  return (
    <Link to={url} className="btn btn-sm w-full w-lg-auto">
      {buttonName}
    </Link>
  );
};

export default Button;
