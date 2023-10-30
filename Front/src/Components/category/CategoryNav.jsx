import React from "react";
import mockCategories from "./../utils/mock.category";

const CategoryNav = () => {
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
                <div className="col-6 col-lg-2">
                  <div className="category-item">
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

export default CategoryNav;
