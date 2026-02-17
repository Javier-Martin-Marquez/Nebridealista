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
        // Restauramos tu lógica original de construcción del array
        const listado = [
          { 
            title: 'Última publicación', 
            name: data.recientes?.[0]?.titulo, 
            img: data.recientes?.[0]?.url_imagen,
            viviendaCompleta: data.recientes?.[0] 
          },
          { 
            title: 'Última publicación', 
            name: data.recientes?.[1]?.titulo, 
            img: data.recientes?.[1]?.url_imagen,
            viviendaCompleta: data.recientes?.[1]
          },
          { 
            title: 'Más guardada', 
            name: data.masBuscada?.titulo, 
            img: data.masBuscada?.url_imagen,
            viviendaCompleta: data.masBuscada
          },
          { 
            title: 'Más favorita', 
            name: data.masFavorita?.titulo, 
            img: data.masFavorita?.url_imagen,
            viviendaCompleta: data.masFavorita
          },
        ];
        // Eliminamos el filtro agresivo para que las cajas SALGAN SIEMPRE
        setDestacados(listado);
      })
      .catch(err => console.error("Error cargando destacados:", err));
  }, []);

  const manejarBusqueda = () => {
    const ciudadLimpia = busqueda.trim().toLowerCase();
    if (ciudadLimpia) navigate(`/comprar/${ciudadLimpia}`);
  };

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
          <iframe title="map-buy" src="https://maps.google.com/maps?q=españa&t=&z=6&ie=UTF8&iwloc=&output=embed" className="map-iframe"></iframe>
        </div>

        <div className="featured-section">
          <h2 className="novedades-title">Novedades y viviendas destacadas en venta</h2>
          <div className="featured-capsule">
            {destacados.map((item, index) => (
              /* Solo renderizamos si el item tiene nombre (evita cajas vacías) */
              item.name && (
                <NewBox 
                  key={index} 
                  title={item.title} 
                  houseTitle={item.name} 
                  image={item.img || "/images/home/comprar.png"} 
                  vivienda={item.viviendaCompleta} 
                />
              )
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Buy;