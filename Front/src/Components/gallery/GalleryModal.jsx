import PropTypes from 'prop-types';
import Image from "./../image/Image";

const GalleryModal = ({ closeModal, findPrev, findNext, hasPrev, hasNext, src }) => {
  // Defino las propiedades esperadas
  GalleryModal.propTypes = {
    closeModal: PropTypes.number,
    findPrev: PropTypes.number,
    findNext: PropTypes.number,
    hasPrev: PropTypes.number,
    hasNext: PropTypes.number,
    src: PropTypes.number,
  };

  return (
    <div>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-custom">
        <div className="modal-body">
          <a href="#" className="modal-close" onClick={closeModal}>
            &times;
          </a>
          {hasPrev && (
            <a href="#" className="modal-prev" onClick={findPrev}>
              &lsaquo;
            </a>
          )}
          {hasNext && (
            <a href="#" className="modal-next" onClick={findNext}>
              &rsaquo;
            </a>
          )}
          <Image key={src} id={src} />
        </div>
      </div>
    </div>
  );
};

export default GalleryModal
