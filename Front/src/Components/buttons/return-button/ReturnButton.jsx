import React from "react";
import { Link } from "react-router-dom";

const ReturnButton = () => {
  return (
    <div className="return-container">
      <Link to="/">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-back-up"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 14l-4 -4l4 -4"></path>
          <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
        </svg>
      </span>
      Volver al inicio</Link>
    </div>
  );
};

export default ReturnButton;
