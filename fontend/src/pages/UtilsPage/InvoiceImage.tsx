import React, { useState, useRef } from "react";
import "./InvoiceImage.css";
import imageIcon from "../../assets/icon-image.png";

type props = {
  onChangeFile: (file: File) => void;
};
const InvoiceImage = ({ onChangeFile }: props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onChangeFile(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="invoice-container">
      <p className="invoice-label font-w-500 font-size-small">Ảnh hóa đơn</p>
      <div className="invoice-image" onClick={handleImageClick}>
        {selectedImage ? (
          <>
            <img src={selectedImage} alt="Invoice" />
            <div className="overlay">Thay đổi ảnh</div>
          </>
        ) : (
          <div className="placeholder-icon">
            <img src={imageIcon} alt="Placeholder" />
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default InvoiceImage;
