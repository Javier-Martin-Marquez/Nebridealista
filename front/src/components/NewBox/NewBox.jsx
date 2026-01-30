// src/components/NewBox.jsx
import React from 'react';

function NewBox({ title, image }) {
  return (
    <div className="new-box">
      <p className="new-box-label">{title}</p>
      <div className="new-box-image-container">
        {/* Asegúrate de que la ruta de la imagen sea correcta */}
        <img src={image} alt={title} className="new-box-display-img" />
      </div>
      <div className="new-box-footer">
        <button className="new-box-action">Ver</button>
      </div>
    </div>
  );
}

export default NewBox;