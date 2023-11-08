import React from "react";
import { Link } from "react-router-dom";

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

export default ButtonXL