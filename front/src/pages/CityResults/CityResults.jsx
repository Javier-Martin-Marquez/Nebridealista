import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HouseCard from '../../components/HouseCard/HouseCard';
import './CityResults.css';

function CityResults() {
  const { tipo, ciudad } = useParams(); 
  const navigate = useNavigate();
  
  // Obtenemos el ID del usuario de Zustand para las acciones
  const userId = useUserStore(state => state.idUsuario); 

  const [viviendas, setViviendas] = useState([]);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    // Mapeo: 'comprar' -> 'compra' / 'alquilar' -> 'alquiler'
    const tipoQuery = tipo === 'comprar' ? 'compra' : 'alquiler';
    
    fetch(`http://localhost:3000/viviendas/${tipoQuery}/${ciudad}`)
      .then(res => res.json())
      .then(data => {
        setViviendas(data);
        const listaBarrios = [...new Set(data.map(v => v.barrio))];
        setBarrios(listaBarrios);
      })
      .catch(err => console.error("Error al cargar viviendas:", err));
  }, [tipo, ciudad]);

  // Lógica real para Favoritos
  const manejarFavorito = async (idVivienda) => {
    if (!userId) return alert("Inicia sesión para guardar favoritos");
    
    try {
      const response = await fetch("http://localhost:3000/favoritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: userId, id_vivienda: idVivienda }),
      });
      if (response.ok) console.log("Añadido a favoritos");
    } catch (error) {
      console.error("Error en favoritos:", error);
    }
  };

  // Lógica real para Guardar Búsqueda
  const manejarGuardar = async (idVivienda) => {
    if (!userId) return alert("Inicia sesión para guardar");
    
    try {
      await fetch("http://localhost:3000/historial/busqueda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: userId, id_vivienda: idVivienda }),
      });
      console.log("Búsqueda guardada");
    } catch (error) {
      console.error("Error al guardar búsqueda:", error);
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
        {/* BLOQUE SUPERIOR CENTRADO */}
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
              src={`https://maps.google.com/maps?q=$${ciudad}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="city-map-iframe"
            ></iframe>
          </div>
        </section>

        {/* LISTADO DE TARJETAS (Sin cambiar tamaño) */}
        <section className="city-cards-stack">
          {viviendas.length > 0 ? (
            viviendas.map((casa) => (
              <HouseCard 
                key={casa.id_vivienda}
                vivienda={casa}
                onFavoriteClick={manejarFavorito}
                onSaveClick={manejarGuardar}
              />
            ))
          ) : (
            <div className="no-results">No hay viviendas disponibles en esta ciudad.</div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CityResults;