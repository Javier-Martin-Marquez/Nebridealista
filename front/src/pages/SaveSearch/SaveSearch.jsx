import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import HouseCard from '../../components/HouseCard/HouseCard';
import Footer from '../../components/Footer/Footer';
import './SaveSearch.css';

function SaveSearch() {
  const [historialBusquedas, setHistorialBusquedas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/historial/lista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHistorialBusquedas(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar el historial:", err);
        setCargando(false);
      });
  }, []);

  return (
    <div className="save-search-page">
      <Header />

      <div className="save-search-container">
        <h1 className="save-search-title">Historial de Búsquedas</h1>

        {cargando ? (
          <p className="loading-text">Cargando tu historial...</p>
        ) : historialBusquedas.length > 0 ? (
          <div className="save-search-list">
            {historialBusquedas.map((casa) => (
              <HouseCard
                key={casa.id_vivienda}
                vivienda={casa}
                isFavouritePage={false}
              />
            ))}
          </div>
        ) : (
          <p className="empty-text">No has realizado ninguna búsqueda todavía.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SaveSearch;