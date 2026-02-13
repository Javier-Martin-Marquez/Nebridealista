import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore'; 
import { useHouseStore } from '../../stores/houseStore';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HouseCard from '../../components/HouseCard/HouseCard';
import './CityResults.css';

function CityResults() {
  const { tipo, ciudad } = useParams(); 
  const navigate = useNavigate();
  
  // Zustand: Datos del usuario y acciones/estados de casas
  const userId = useUserStore(state => state.idUsuario); 
  const { toggleFavorite, toggleSave, favorites, saved } = useHouseStore();

  const [viviendas, setViviendas] = useState([]);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    const tipoQuery = tipo === 'comprar' ? 'compra' : 'alquiler';
    
    fetch(`http://localhost:3000/viviendas/${tipoQuery}/${ciudad}`)
      .then(res => {
        if (!res.ok) throw new Error("Error en la carga");
        return res.json();
      })
      .then(data => {
        if (data.length === 0) {
          navigate('/not-found');
          return;
        }
        
        setViviendas(data);
        const listaBarrios = [...new Set(data.map(v => v.barrio))];
        setBarrios(listaBarrios);
      })
      .catch(err => {
        console.error("Error al cargar viviendas:", err);
        navigate('/not-found');
      });
  }, [tipo, ciudad, navigate]);

  const manejarFavorito = async (idVivienda) => {
    const result = await toggleFavorite(idVivienda, userId);
    if (result.action === 'error' && result.message) {
      alert(result.message);
    }
  };

  const manejarGuardar = async (idVivienda) => {
    const result = await toggleSave(idVivienda, userId);
    if (result.action === 'error' && result.message) {
      alert(result.message);
    }
  };

  const manejarBarrio = (e) => {
    const barrio = e.target.value;
    if (barrio) navigate(`/${tipo}/${ciudad}/${barrio.toLowerCase()}`);
  };

  return (
    <div className="city-results-viewport">
      <Header />
      
      <main className="city-results-main">
        <section className="city-header-layout">
          <div className="city-controls">
            <div className="city-title-display">
              Viviendas de {ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}
            </div>
            
            <div className="city-filter-display">
              <p>Selecciona un barrio de {ciudad}</p>
              <select onChange={manejarBarrio} className="city-dropdown">
                <option value="">-- Ver todos los barrios --</option>
                {barrios.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="city-map-container">
            <iframe
              title="mapa-centrado"
              src={`https://www.google.com/maps?q=${ciudad}&output=embed`}
              className="city-map-iframe"
            ></iframe>
          </div>
        </section>

        <section className="city-cards-stack">
          {viviendas.map((vivienda) => (
            <HouseCard 
              key={vivienda.id_vivienda}
              vivienda={vivienda}
              isFavouritePage={favorites.includes(vivienda.id_vivienda)}
              isSavedPage={saved.includes(vivienda.id_vivienda)}
              onFavoriteClick={() => manejarFavorito(vivienda.id_vivienda)}
              onSaveClick={() => manejarGuardar(vivienda.id_vivienda)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CityResults;