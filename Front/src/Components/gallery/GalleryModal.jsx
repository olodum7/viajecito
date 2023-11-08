import React from 'react'

const GalleryModal = ({ closeModal, findPrev, findNext, hasPrev, hasNext, src }) => {
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
            <img src={src} />
          </div>
        </div>
      </div>
    );
  };

export default GalleryModal
