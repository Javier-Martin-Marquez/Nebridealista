import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import HouseCard from '../../components/HouseCard/HouseCard';
import './Favourite.css';
import Footer from '../../components/Footer/Footer';

function Favourite() {
  const [casasFavoritas, setCasasFavoritas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Hacemos el fetch POST para obtener la lista de favoritos del usuario 1
    fetch("http://localhost:3000/favoritos/lista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: 1 }), // Usuario de prueba
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
  }, []);

  return (
    <div className="favourite-page">
      <Header />

      <div className="favourite-container">
        <h1 className="favourite-title">Mis Favoritos</h1>

        {cargando ? (
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