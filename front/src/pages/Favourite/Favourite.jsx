import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import HouseCard from '../../components/HouseCard/HouseCard';
import Footer from '../../components/Footer/Footer';
import { useUserStore } from '../../stores/userStore';
import { useHouseStore } from '../../stores/houseStore';
import './Favourite.css';

function Favourite() {
  const [casasFavoritas, setCasasFavoritas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const idUsuario = useUserStore(state => state.idUsuario);
  
  // Extraemos estados y acciones de la store
  const { toggleFavorite, toggleSave, favorites, saved } = useHouseStore();

  useEffect(() => {
    if (!idUsuario) {
      setCargando(false);
      return;
    }

    fetch("http://localhost:3000/favoritos/lista", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: idUsuario }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCasasFavoritas(data);
        // Sincronizamos los IDs con la store para que se coloreen los iconos
        const ids = data.map(casa => casa.id_vivienda);
        useHouseStore.setState({ favorites: ids });
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar favoritos:", err);
        setCargando(false);
      });
  }, [idUsuario]);

  const handleFavoriteClick = async (id_vivienda) => {
    const result = await toggleFavorite(id_vivienda, idUsuario);
    if (result.action === 'deleted') {
      setCasasFavoritas(prev => prev.filter(casa => casa.id_vivienda !== id_vivienda));
    }
  };

  const handleSaveClick = async (id_vivienda) => {
    await toggleSave(id_vivienda, idUsuario);
  };

  return (
    <div className="favourite-page">
      <Header />

      <div className="favourite-container">
        <h1 className="favourite-title">Mis Favoritos</h1>

        {!idUsuario ? (
          <p className="empty-text">Inicia sesión para ver tus favoritos.</p>
        ) : cargando ? (
          <p className="loading-text">Cargando tus casas favoritas...</p>
        ) : casasFavoritas.length > 0 ? (
          <div className="favourite-list">
            {casasFavoritas.map((casa) => (
              <HouseCard
                key={casa.id_vivienda}
                vivienda={casa}
                // Dinámico: se colorea si el ID está en la store
                isFavouritePage={favorites.includes(casa.id_vivienda)}
                isSavedPage={saved.includes(casa.id_vivienda)}
                onFavoriteClick={handleFavoriteClick}
                onSaveClick={handleSaveClick} 
              />
            ))}
          </div>
        ) : (
          <p className="empty-text">Aún no tienes ninguna casa guardada en favoritos.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Favourite;