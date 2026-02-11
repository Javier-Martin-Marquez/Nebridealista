import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NewBox from '../../components/NewBox/NewBox';
import Footer from "../../components/Footer/Footer";
import './Buy.css';

function Buy() {
  const [busqueda, setBusqueda] = useState("");
  const [destacados, setDestacados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/viviendas/destacadas?tipo=venta")
      .then(res => res.json())
      .then(data => {
        const listado = [
          { id: data.recientes[0]?.id_vivienda, title: 'Ultima publicación', name: data.recientes[0]?.titulo, img: data.recientes[0]?.url_imagen },
          { id: data.recientes[1]?.id_vivienda, title: 'Ultima publicación', name: data.recientes[1]?.titulo, img: data.recientes[1]?.url_imagen },
          { id: data.masBuscada?.id_vivienda, title: 'Más guardada', name: data.masBuscada?.titulo, img: data.masBuscada?.url_imagen },
          { id: data.masFavorita?.id_vivienda, title: 'Más favorita', name: data.masFavorita?.titulo, img: data.masFavorita?.url_imagen },
        ];
        // Solo mostramos los que tengan datos reales
        setDestacados(listado.filter(item => item.id !== undefined));
      })
      .catch(err => console.error("Error cargando destacados:", err));
  }, []);

  const manejarBusqueda = () => {
    const ciudadLimpia = busqueda.trim().toLowerCase();
    if (ciudadLimpia) {
      // Redirigimos a la nueva ruta dinámica de Ciudad
      navigate(`/comprar/${ciudadLimpia}`);
    }
  };

  // Mapa general de España para la página de inicio de Comprar
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3101564.843644415!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1700000000000`;

  return (
    <div className="buy-page">
      <Header />
      <div className="buy-body">
        
        <div className="search-section">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="¿Dónde buscas para comprar? (ej: Madrid, Barcelona...)"
              className="search-input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            />
            <span className="search-icon" onClick={manejarBusqueda}>🔍</span>
          </div>
        </div>

        <div className="map-section">
          <iframe
            title="mapa-interactivo-buy"
            src={mapUrl}
            className="map-iframe"
          ></iframe>
        </div>

        <div className="featured-section">
          {/* TEXTO DE NOVEDADES */}
          <h2 className="novedades-title">Novedades y viviendas destacadas en venta</h2>

          <div className="featured-capsule">
            {destacados.map((item, index) => (
              <NewBox
                key={index}
                title={item.title}      
                houseTitle={item.name}
                image={item.img || "/images/home/comprar.png"}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Buy;