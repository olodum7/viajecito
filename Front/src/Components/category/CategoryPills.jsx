import React from "react";
import { Link } from "react-router-dom";

const CategoryPills = ({ url, categoryName }) => {
  return (
    <div className="category-label">
      <Link to={url}>{categoryName}</Link>
    </div>
  );
};

export default CategoryPills;
