// src/components/NewBox.jsx
import './NewBox.css'

function NewBox({ title, houseTitle, image }) {
  return (
    <div className="new-box">
      <p className="new-box-label">{title}</p>
      <div className="new-box-image-container">
        <img src={image} alt={houseTitle} className="new-box-display-img" />
      </div>

      <h3 className="new-box-house-name">{houseTitle}</h3>

      <div className="new-box-footer">
        <button className="new-box-action">Ver</button>
      </div>
    </div>
  );
}

export default NewBox;