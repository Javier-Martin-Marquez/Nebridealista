import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark } from 'lucide-react';
import './HouseCard.css';

function HouseCard({ vivienda, isFavouritePage = false, isSavedPage = false, onFavoriteClick, onSaveClick }) {
  const navigate = useNavigate();

  const irADetalle = () => {
    const tipoRuta = vivienda.tipo_transaccion === 'venta' ? 'comprar' : 'alquiler';
    
    navigate(`/vivienda/${tipoRuta}/${vivienda.ciudad}/${vivienda.barrio}/${vivienda.id_vivienda}`);
  };

  return (
    <div className="house-card" onClick={irADetalle}>
      <div className="house-card-img">
        <img 
          src={vivienda.url_imagen || "/images/home/comprar.png"} 
          alt={vivienda.titulo} 
          onError={(e) => e.target.src = "/images/home/comprar.png"}
        />
      </div>

      <div className="house-card-content">
        <div className="house-info">
          <h2 className="house-title">{vivienda.titulo}</h2>
          
          <p className="house-specs">
            <span className="price">{vivienda.precio}€</span>  
          </p>

          <p className="house-specs">
            <span>{vivienda.num_habitaciones} hab. </span>  
            <span>{vivienda.metros_cuadrados} m² </span> 
            <span>{vivienda.barrio} </span>
          </p>

          <p className="house-description">
            {vivienda.descripcion}
          </p>
        </div>

        <div className="house-actions">
          <button 
            className="action-btn" 
            onClick={(e) => {
              e.stopPropagation(); // Evita que al dar al icono se abra el detalle
              onSaveClick(vivienda.id_vivienda);
            }}
          >
            <Bookmark 
              size={24} 
              color="black" 
              fill={isSavedPage ? "black" : "none"} 
            />
          </button>

          <button 
            className="action-btn" 
            onClick={(e) => {
              e.stopPropagation(); // Evita que al dar al icono se abra el detalle
              onFavoriteClick(vivienda.id_vivienda);
            }}
          >
            <Heart 
              size={24} 
              color={isFavouritePage ? "red" : "black"} 
              fill={isFavouritePage ? "red" : "none"} 
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HouseCard;