import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Header from '../../components/Header/Header';
import NewBox from '../../components/NewBox/NewBox';
import Footer from "../../components/Footer/Footer";
import './Rent.css';

function Rent() {
  const [busqueda, setBusqueda] = useState("");
  const [destacados, setDestacados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pedimos destacados de alquiler al backend
    fetch("http://localhost:3000/viviendas/destacadas?tipo=alquiler")
      .then(res => res.json())
      .then(data => {
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
        setDestacados(listado.filter(item => item.viviendaCompleta !== undefined && item.viviendaCompleta !== null));
      })
      .catch(err => console.error("Error cargando destacados:", err));
  }, []);

  const manejarBusqueda = () => {
    const ciudadLimpia = busqueda.trim().toLowerCase();
    if (ciudadLimpia) navigate(`/alquilar/${ciudadLimpia}`);
  };

  return (
    <div className="rent-page">
      <Header />
      <div className="rent-body">
        <div className="search-section">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="¿Dónde buscas para alquilar? (ej: Madrid, Barcelona...)"
              className="search-input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            />
            <span className="search-icon" onClick={manejarBusqueda}>🔍</span>
          </div>
        </div>

        <div className="map-section">
          <iframe title="map-rent" src="https://maps.google.com/maps?q=españa&t=&z=6&ie=UTF8&iwloc=&output=embed" className="map-iframe"></iframe>
        </div>

        <div className="featured-section">
          <h2 className="novedades-title">Novedades y viviendas destacadas en alquiler</h2>
          <div className="featured-capsule">
            {destacados.map((item, index) => (
              <NewBox 
                key={index} 
                title={item.title} 
                houseTitle={item.name} 
                image={item.img || "/images/home/alquilar.png"} 
                vivienda={item.viviendaCompleta} 
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Rent;