import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CategoryPills = ({ url, categoryName }) => {
  return (
    <div className="category-label">
      <Link to={url}>{categoryName}</Link>
    </div>
  );
};

CategoryPills.propTypes = {
  url: PropTypes.string,
  categoryName: PropTypes.string,
};

export default CategoryPills;