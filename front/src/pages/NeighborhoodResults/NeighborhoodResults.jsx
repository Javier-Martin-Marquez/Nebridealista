import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { useHouseStore } from '../../stores/houseStore';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HouseCard from '../../components/HouseCard/HouseCard';
import './NeighborhoodResults.css';

function NeighborhoodResults() {
  const { tipo, ciudad, barrio } = useParams(); 
  const navigate = useNavigate();
  
  const idUsuario = useUserStore(state => state.idUsuario);
  const { toggleFavorite, toggleSave, favorites, saved } = useHouseStore();

  const [viviendas, setViviendas] = useState([]);

  useEffect(() => {
    const tipoQuery = tipo === 'comprar' ? 'comprar' : 'alquiler';
    
    fetch(`http://localhost:3000/viviendas/${tipoQuery}/${ciudad}/${barrio}`)
      .then(res => {
        if (!res.ok) throw new Error("Error en la carga");
        return res.json();
      })
      .then(data => {
        if (data.length === 0) {
          navigate('/not-found', { replace: true });
          return;
        }
        setViviendas(data);
      })
      .catch(err => {
        console.error("Error al cargar barrio:", err);
        navigate('/not-found', { replace: true });
      });
  }, [tipo, ciudad, barrio, navigate]);

  // MANEJADORES CON ALERTA
  const manejarFavorito = async (idVivienda) => {
    const result = await toggleFavorite(idVivienda, idUsuario);
    if (result.action === 'error' && result.message) {
      alert(result.message);
    }
  };

  const manejarGuardar = async (idVivienda) => {
    const result = await toggleSave(idVivienda, idUsuario);
    if (result.action === 'error' && result.message) {
      alert(result.message);
    }
  };

  return (
    <div className="neighborhood-results-viewport">
      <Header />
      
      <main className="neighborhood-main">
        <section className="neighborhood-header">
          <div className="neighborhood-label">
            Viviendas en {barrio.charAt(0).toUpperCase() + barrio.slice(1)}, {ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}
          </div>
        </section>

        <section className="neighborhood-list">
          {viviendas.map((casa) => (
            <HouseCard 
              key={casa.id_vivienda}
              vivienda={casa}
              isFavouritePage={favorites.includes(casa.id_vivienda)}
              isSavedPage={saved.includes(casa.id_vivienda)}
              onFavoriteClick={() => manejarFavorito(casa.id_vivienda)}
              onSaveClick={() => manejarGuardar(casa.id_vivienda)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NeighborhoodResults;