import React, { useState } from 'react';
import Header from '../../components/Header/Header'; 
import NewBox from '../../components/NewBox/NewBox';
import Footer from "../../components/Footer/Footer"
import './Rent.css';

function Rent() {
  const [busqueda, setBusqueda] = useState("");
  const [ciudadMapa, setCiudadMapa] = useState("España");
  const [barriosDisponibles, setBarriosDisponibles] = useState([]);
  const [barrioSeleccionado, setBarrioSeleccionado] = useState("");

  const baseDeDatosBarrios = {
    "madrid": ["Chamberí", "Retiro", "Salamanca", "Malasaña", "Chueca", "La Latina", "Usera", "Vallecas", "Fuencarral", "Tetuán", "Arganzuela", "Chamartín", "Moncloa", "Carabanchel", "Barajas"],
    "barcelona": ["Eixample", "Gràcia", "Poblenou", "Sants", "Sarrià", "Gòtic", "El Raval", "Born", "Barceloneta", "Les Corts"],
    "valencia": ["Ruzafa", "El Carmen", "Benimaclet", "Cabañal", "Extramurs", "Campanar", "Pobles de l'Oest", "Olivereta"],
    "sevilla": ["Triana", "Nervión", "Los Remedios", "Santa Cruz", "Macarena", "Alfalfa", "San Bernardo", "Bellavista"],
    "malaga": ["Teatinos", "El Palo", "Malagueta", "Huelin", "Centro Histórico", "Ciudad Jardín", "Puerto de la Torre"],
    "zaragoza": ["Delicias", "El Gancho", "Actur", "Romareda", "Las Fuentes", "Casco Viejo", "Torrero"],
    "bilbao": ["Abando", "Casco Viejo", "Deusto", "Indautxu", "Santutxu", "Uribarri", "Recalde"],
    "alicante": ["Postiguet", "San Blas", "Albufereta", "Cabo de las Huertas", "Benalúa", "Carolinas"],
    "murcia": ["Espinardo", "Vistabella", "Santa María de Gracia", "San Antón", "El Carmen", "La Flota"],
    "palma": ["Santa Catalina", "Portixol", "Son Armadams", "Son Espanyolet", "Casco Antiguo", "Genoa"],
    "las palmas": ["Vegueta", "Triana", "Las Canteras", "Alcaravaneras", "Siete Palmas", "La Isleta"],
    "granada": ["Albaicín", "Realejo", "Sacromonte", "Zaidín", "Chana", "Centro-Sagrario"],
    "valladolid": ["Parquesol", "Delicias", "Covaresa", "La Victoria", "Huerta del Rey", "Centro"],
    "vigo": ["Casco Vello", "Bouzas", "Teis", "Coia", "O Berbés", "Travesía de Vigo"],
    "coruna": ["Los Rosales", "Riazor", "Monte Alto", "Matogrande", "Eirís", "Zalaeta"]
  };

  const manejarBusqueda = () => {
    const ciudadNormalizada = busqueda
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (ciudadNormalizada !== "") {
      setCiudadMapa(busqueda);
      const barrios = baseDeDatosBarrios[ciudadNormalizada] || [];
      setBarriosDisponibles(barrios);
      setBarrioSeleccionado("");
    }
  };

  const manejarSeleccionBarrio = (e) => {
    const barrio = e.target.value;
    setBarrioSeleccionado(barrio);
    if (barrio) {
      setCiudadMapa(`${barrio}, ${busqueda}`);
    } else {
      setCiudadMapa(busqueda);
    }
  };

  const data = [
    { id: 1, title: 'Ultima publicación', img: '/images/casa1.png' },
    { id: 2, title: 'Ultima publicación', img: '/images/casa1.png' },
    { id: 3, title: 'Más buscada', img: '/images/casa1.png' },
    { id: 4, title: 'Más favorita', img: '/images/casa1.png' },
  ];

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(ciudadMapa)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="rent-page">
      <Header />
      <div className="rent-body">
        
        <div className="search-section">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="¿Dónde buscas? (ej: Sevilla, Bilbao, Valencia...)" 
              className="search-input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            />
            <span className="search-icon" onClick={manejarBusqueda}>🔍</span>
          </div>

          {barriosDisponibles.length > 0 && (
            <div className="neighborhood-wrapper" style={{ marginTop: '15px' }}>
              <select 
                className="search-input" 
                value={barrioSeleccionado} 
                onChange={manejarSeleccionBarrio}
                style={{ 
                  cursor: 'pointer', 
                  borderStyle: 'dashed', 
                  backgroundColor: '#fffcf7' 
                }}
              >
                <option value="">-- Selecciona un barrio en {busqueda} --</option>
                {barriosDisponibles.map((barrio, index) => (
                  <option key={index} value={barrio}>{barrio}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="map-section">
          <iframe
            title="mapa-interactivo-rent"
            src={mapUrl}
            className="map-iframe"
          ></iframe>
        </div>

        <div className="featured-section">
          <div className="featured-capsule">
            {data.map((item) => (
              <NewBox key={item.id} title={item.title} image={item.img} />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Rent;