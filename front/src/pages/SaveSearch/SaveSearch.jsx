import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import HouseCard from '../../components/HouseCard/HouseCard';
import Footer from '../../components/Footer/Footer';
import { useUserStore } from '../../stores/userStore';
import { useHouseStore } from '../../stores/houseStore'; // Importamos el nuevo store
import './SaveSearch.css';

function SaveSearch() {
  const [historialBusquedas, setHistorialBusquedas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const idUsuario = useUserStore(state => state.idUsuario);
  
  const toggleFavorite = useHouseStore(state => state.toggleFavorite);
  const toggleSave = useHouseStore(state => state.toggleSave);

  useEffect(() => {
    if (!idUsuario) {
      setCargando(false);
      return;
    }

    fetch("http://localhost:3000/historial/lista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: idUsuario }),
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
  }, [idUsuario]);

  const handleSaveClick = async (id_vivienda) => {
    const result = await toggleSave(id_vivienda, idUsuario);
    if (result.action === 'deleted') {
      setHistorialBusquedas(prev => prev.filter(casa => casa.id_vivienda !== id_vivienda));
    }
  };

  const handleFavoriteClick = async (id_vivienda) => {
    await toggleFavorite(id_vivienda, idUsuario);
  };

  return (
    <div className="save-search-page">
      <Header />

      <div className="save-search-container">
        <h1 className="save-search-title">Historial de Búsquedas</h1>

        {/* Si no hay usuario, pedimos que se identifique */}
        {!idUsuario ? (
          <p className="empty-text">Inicia sesión para ver tu historial de búsquedas.</p>
        ) : cargando ? (
          <p className="loading-text">Cargando tu historial...</p>
        ) : historialBusquedas.length > 0 ? (
          <div className="save-search-list">
            {historialBusquedas.map((casa) => (
              <HouseCard
                key={casa.id_vivienda}
                vivienda={casa}
                isSavedPage={true}
                onSaveClick={handleSaveClick}
                onFavoriteClick={handleFavoriteClick}
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