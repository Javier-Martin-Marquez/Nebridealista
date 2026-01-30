import './HouseCard.css';

function HouseCard({ vivienda, isFavouritePage = false }) {

  return (
    <div className="house-card">
      {/* Imagen lateral */}
      <div className="house-card-img">
        <img 
          src={vivienda.imagen_url || "/images/home/comprar.png"} 
          alt={vivienda.titulo} 
        />
      </div>

      {/* Contenido derecho */}
      <div className="house-card-content">
        <div className="house-info">
          <h2 className="house-title">{vivienda.titulo}</h2>
          
          <p className="house-specs">
            <span className="price">{vivienda.precio}€</span> · 
            <span>{vivienda.num_habitaciones} hab.</span> · 
            <span>{vivienda.metros_cuadrados} m²</span> · 
            <span>{vivienda.barrio}</span>
          </p>

          <p className="house-description">
            {vivienda.descripcion}
          </p>
        </div>

        <div className="house-actions">
          <button className="favorite-btn">
            {/* Si isFavouritePage es true, aplicamos la clase del corazón rojo */}
            <svg viewBox="0 0 24 24" className={isFavouritePage ? "heart-red" : "heart-empty"}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HouseCard;