import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import HouseCard from '../../components/HouseCard/HouseCard';
import Footer from '../../components/Footer/Footer';
import { useUserStore } from '../../stores/userStore';
import './Favourite.css';

function Favourite() {
  const [casasFavoritas, setCasasFavoritas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const idUsuario = useUserStore(state => state.idUsuario);

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