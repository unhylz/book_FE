import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import "./imgCropModal.scss"

const ImageCropperModal = ({ isOpen, onClose, src, onCrop }) => {
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      onCrop(cropper.getCroppedCanvas().toDataURL());
    }
  };

  if (!isOpen) return null;

  return (
    isOpen && 
    <div className="IMGmodal">
      <div className="IMGmodal-content">
        <div className="close" onClick={onClose}>&times;</div>
        <Cropper
          style={{ height: 400, width: '100%' }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={src}
          viewMode={1}
          guides={false}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
        <button onClick={getCropData}  className="crop-button">수정하기</button>
      </div>,
    </div>
  );
};


export default ImageCropperModal;
