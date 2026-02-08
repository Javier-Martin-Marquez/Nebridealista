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

  const toggleFavorite = useHouseStore(state => state.toggleFavorite);
  const toggleSave = useHouseStore(state => state.toggleSave);

  useEffect(() => {
    if (!idUsuario) {
      setCargando(false);
      return;
    }

    fetch("http://localhost:3000/favoritos/lista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: idUsuario }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Asignamos el array de casas que nos devuelve el back
        setCasasFavoritas(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar favoritos:", err);
        setCargando(false);
      });
  }, [idUsuario]); // Se ejecuta al cargar o si el usuario cambia (login/logout)

  // Manejador para el corazón
  const handleFavoriteClick = async (id_vivienda) => {
    const result = await toggleFavorite(id_vivienda, idUsuario);
    if (result.action === 'deleted') {
      setCasasFavoritas(prev => prev.filter(casa => casa.id_vivienda !== id_vivienda));
    }
  };

  // Manejador para el marcador
  const handleSaveClick = async (id_vivienda) => {
    await toggleSave(id_vivienda, idUsuario);
  };

  return (
    <div className="favourite-page">
      <Header />

      <div className="favourite-container">
        <h1 className="favourite-title">Mis Favoritos</h1>

        {/* 1. Verificamos si hay usuario */}
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
                isFavouritePage={true}
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