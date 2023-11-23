import mockCategories from "./../utils/mock.category";
import PropTypes from 'prop-types';

const CategoryNav = ({ clickedCategoryName, onCategoryClick })=> {
  return (
    <section id="category-nav" className="container-fluid">
      <div className="container">
        <div className="row category-row">
          <div className="col-md-10 col-lg-2">
            <p className="primary-color">Descubre tu próxima de aventura</p>
          </div>
          <div className="col-12 col-md-10">
            <div className="row">
              {mockCategories.map((category) => (
                <div key={category.id} className="col-6 col-lg-2" data-aos="zoom-in" onClick={() => onCategoryClick(category.title)}>
                  <div className="category-item" style={{ color: clickedCategoryName == category.title ? 'var(--primary)' : 'black' }}>
                    <div dangerouslySetInnerHTML={{ __html: category.icon }} />
                    <p>{category.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CategoryNav.propTypes = {
  clickedCategoryName: PropTypes.string,
  onCategoryClick: PropTypes.func,
};

export default CategoryNav;