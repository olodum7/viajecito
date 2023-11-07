import React, { useState, useEffect } from "react";
import GalleryModal from "./GalleryModal";
import GalleryButton from "./../buttons/gallery-button/GalleryButton";

const imgUrls = [
  "https://source.unsplash.com/PC_lbSSxCZE/800x600",
  "https://source.unsplash.com/lVmR1YaBGG4/800x600",
  "https://source.unsplash.com/5KvPQc1Uklk/800x600",
  "https://source.unsplash.com/GtYFwFrFbMA/800x600",
  "https://source.unsplash.com/Igct8iZucFI/800x600",
  "https://source.unsplash.com/M01DfkOqz7I/800x600",
  "https://source.unsplash.com/MoI_cHNcSK8/800x600",
  "https://source.unsplash.com/M0WbGFRTXqU/800x600",
  "https://source.unsplash.com/s48nn4NtlZ4/800x600",
  "https://source.unsplash.com/E4944K_4SvI/800x600",
  "https://source.unsplash.com/F5Dxy9i8bxc/800x600",
  "https://source.unsplash.com/iPum7Ket2jo/800x600",
];

const Gallery = () => {
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
        prevIndex === 0 ? imgUrls.length - 1 : prevIndex - 1
      );
    }
  };

  const findNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) =>
        prevIndex === imgUrls.length - 1 ? 0 : prevIndex + 1
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
    <section id="gallery-detail" className="gallery-container">
      <div className="container">
        <div className="row">
          <div className="images-grid gap-4">
            {imgUrls.slice(0, 5).map((src, index) => (
              <div key={src} onClick={() => openModal(index)}>
                <img src={src} />
              </div>
            ))}
          </div>
          {showModal && (
            <GalleryModal
              closeModal={closeModal}
              findPrev={findPrev}
              findNext={findNext}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < imgUrls.length - 1}
              src={imgUrls[currentIndex]}
            />
          )}
        </div>
        <div className="row">
          <GalleryButton onButtonClick={openModalFromButton}/>
        </div>
      </div>
    </section>
  );
};
export default Gallery;
