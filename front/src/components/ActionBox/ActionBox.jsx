import '../../App.css';

function ActionBox({ image, title, onClick }) {
  return (
    <div className="action-box" onClick={onClick}>
      <div className="action-image-container">
        <img src={image} alt={title} className="action-image" />
      </div>
      <h3 className="action-title">{title}</h3>
    </div>
  )
}

export default ActionBox