import React, { useState } from 'react';
import Header from '../../components/Header/Header'; 
import NewBox from '../../components/NewBox/NewBox';
import './Buy.css';

function Buy() {
  const [busqueda, setBusqueda] = useState("");
  const [ciudadMapa, setCiudadMapa] = useState("España");

  const manejarBusqueda = () => {
    if (busqueda.trim() !== "") {
      setCiudadMapa(busqueda);
    }
  };

  const data = [
    { id: 1, title: 'Ultima publicación', img: '/images/casa1.png' },
    { id: 2, title: 'Ultima publicación', img: '/images/casa1.png' },
    { id: 3, title: 'Más buscada', img: '/images/casa1.png' },
    { id: 4, title: 'Más favorita', img: '/images/casa1.png' },
  ];

  // URL dinámica para el iframe de Google Maps
  const mapUrl = `https://maps.google.com/maps?q=${ciudadMapa}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="buy-page">
      <Header />

      <div className="buy-body">
        
        {/* BUSCADOR CON LUPA */}
        <div className="search-section">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="¿Dónde buscas?" 
              className="search-input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            />
            <span className="search-icon" onClick={manejarBusqueda}>🔍</span>
          </div>
        </div>

        {/* MAPA (IFRAME) */}
        <div className="map-section">
          <iframe
            title="mapa-interactivo"
            src={mapUrl}
            className="map-iframe"
          ></iframe>
        </div>

        {/* SECCIÓN INFERIOR (CÁPSULA BEIGE) */}
        <div className="featured-section">
          <div className="featured-capsule">
            {data.map((item) => (
              <NewBox 
                key={item.id} 
                title={item.title} 
                image={item.img} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Buy;