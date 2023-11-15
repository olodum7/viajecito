import { useState, useEffect } from "react";
import GalleryModal from "./GalleryModal";
import GalleryButton from "/src/Components/buttons/GalleryButton.jsx";
import PropTypes from 'prop-types';
import Image from "../image/Image";

const Gallery = ({ imagenes }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentIndex(null);
    setShowModal(false);
  };

  const findPrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
      );
    }
  };

  const findNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const openModalFromButton = () => {
    openModal(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      } else if (e.keyCode === 37) {
        findPrev();
      } else if (e.keyCode === 39) {
        findNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section id="gallery-detail" className="gallery-container" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="images-grid gap-4">
            {imagenes.slice(0, 5).map((imagen, index) => (
              <div key={index} onClick={() => openModal(index)} className="gallery-detail-img-container">
                <Image key={imagen} id={imagen} />
              </div>
            ))}
          </div>
          {showModal && (
            <GalleryModal
              closeModal={closeModal}
              findPrev={findPrev}
              findNext={findNext}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < imagenes.length - 1}
              src={imagenes[currentIndex]}
            />
          )}
        </div>
        <div className="row">
          <GalleryButton onButtonClick={openModalFromButton} />
        </div>
      </div>
    </section>
  );
};

Gallery.propTypes = {
  imagenes: PropTypes.array
};

export default Gallery;