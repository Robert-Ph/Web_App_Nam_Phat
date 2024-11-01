import React, { useState } from "react";

const ImageGallery: React.FC<{ image: string }> = ({ image }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="image-gallery">
        <img
          src={image}
          alt={`Thumbnail `}
          onClick={() => openModal(image)}
          style={{
            cursor: "pointer",
            width: "100px",
            height: "100px",
            margin: "5px",
          }}
        />
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Large view"
              style={{ width: "500px", height: "auto" }}
            />
          </div>
        </div>
      )}

      <style>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
        }

        .modal-content {
          position: relative;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 30px;
          color: black;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
