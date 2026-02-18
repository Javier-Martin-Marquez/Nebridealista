import { useNavigate } from 'react-router-dom';
import './NewBox.css';

function NewBox({ title, houseTitle, image, vivienda }) {
  const navigate = useNavigate();

  const irADetalle = () => {
    // Si falta algún dato, usamos valores por defecto para evitar el 404
    if (!vivienda) return;

    const ciudad = vivienda.ciudad || "Madrid";
    const barrio = vivienda.barrio || "Salamanca";
    const id = vivienda.id_vivienda || "1";
    const tipo = vivienda.tipo_transaccion === 'alquiler' ? 'alquiler' : 'comprar';
    
    navigate(`/vivienda/${tipo}/${ciudad}/${barrio}/${id}`);
  };

  return (
    <div className="new-box">
      <p className="new-box-label">{title}</p>
      <div className="new-box-image-container">
        <img src={image} alt={houseTitle} className="new-box-display-img" />
      </div>
      <h3 className="new-box-house-name">{houseTitle}</h3>
      <div className="new-box-footer">
        {/* Usamos tu botón original con la función de navegación */}
        <button className="new-box-action" onClick={irADetalle}>Ver detalles</button>
      </div>
    </div>
  );
}

export default NewBox;