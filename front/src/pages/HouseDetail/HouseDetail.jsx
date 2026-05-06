import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHouseStore } from '../../stores/houseStore';
import { useUserStore } from '../../stores/userStore';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HouseDetail.css';

function HouseDetail() {
  const { tipo, ciudad, barrio, id } = useParams();
  const navigate = useNavigate();
  const idUsuario = useUserStore(state => state.idUsuario);
  const { toggleFavorite, toggleSave, favorites, saved } = useHouseStore();

  const [vivienda, setVivienda] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (tipo && ciudad && barrio && id) {
      const cargarDatos = async () => {
        try {
          const res = await fetch(`http://localhost:3000/viviendas/${tipo}/${ciudad}/${barrio}/${id}`);
          if (!res.ok) throw new Error("Vivienda no encontrada");
          const data = await res.json();
          setVivienda(data);
        } catch (err) {
          console.error("Error al conectar:", err);
        }
      };
      cargarDatos();
    }
    window.scrollTo(0, 0);
  }, [tipo, ciudad, barrio, id]);

  if (!vivienda) return (
    <>
      <Header />
      <div style={{padding: "100px", textAlign: "center"}}>Cargando detalles de la vivienda...</div>
      <Footer />
    </>
  );

  const manejarAccion = async (actionFn) => {
    const result = await actionFn(vivienda.id_vivienda, idUsuario);
    if (result && result.action === 'error') {
      setFeedback("Necesitas estar logueado para realizar esta acción");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  const esFavorito = favorites.includes(vivienda.id_vivienda);
  const esGuardado = saved.includes(vivienda.id_vivienda);
  const fotos = vivienda.fotos || [];

  return (
    <>
      <Header />
      <div className="pagina-detalle">
        <div className="contenido">
          <div className="fila-superior">
            <div className="caja-foto">
              {fotos.length > 0 ? (
                <>
                  <img src={fotos[imagenActual]} alt={vivienda.titulo} />
                  <button className="flecha izq" onClick={() => setImagenActual(p => p === 0 ? fotos.length - 1 : p - 1)}>❮</button>
                  <button className="flecha der" onClick={() => setImagenActual(p => p === fotos.length - 1 ? 0 : p + 1)}>❯</button>
                  <div className="contador">{imagenActual + 1} / {fotos.length}</div>
                </>
              ) : <div className="sin-foto">No hay fotos disponibles</div>}
            </div>

            <div className="tarjeta-info">
              <h2>Datos de la vivienda</h2>
              <div className="lista-datos">
                <p><strong>Ciudad:</strong> {vivienda.ciudad}</p>
                <p><strong>Provincia:</strong> {vivienda.provincia}</p>
                <p><strong>Barrio:</strong> {vivienda.barrio}</p>
                <p><strong>Dirección:</strong> {vivienda.direccion || "Consultar con el agente"}</p>
                <p><strong>Precio:</strong> {Number(vivienda.precio).toLocaleString()} €</p>
                <p><strong>Metros:</strong> {vivienda.metros_cuadrados} m²</p>
                <p><strong>Habitaciones:</strong> {vivienda.num_habitaciones}</p>
                <p><strong>Baños:</strong> {vivienda.num_baños}</p>
              </div>

              {feedback && (
                <div className="log-feedback-tag error">
                  {feedback}
                </div>
              )}

              <div className="botones-guardar">
                <button 
                  className={`boton-favorito ${esFavorito ? 'activo' : ''}`} 
                  onClick={() => manejarAccion(toggleFavorite)}
                >
                  {esFavorito ? '❤️ En favorito' : '🤍 Añadir favorito'}
                </button>
                <button 
                  className={`boton-guardar ${esGuardado ? 'activo' : ''}`} 
                  onClick={() => manejarAccion(toggleSave)}
                >
                  {esGuardado ? '🔔 Guardado' : '🔕 Guardar búsqueda'}
                </button>
              </div>
            </div>
          </div>

          <div className="seccion-texto">
            <div className="tarjeta-texto">
              <h3>Descripción</h3>
              {vivienda.descripcion_detallada?.split('\n').map((p, i) => <p key={i}>{p}</p>) || <p>Sin descripción disponible.</p>}
            </div>
          </div>

          <div className="fila-inferior">
            <div className="caja-mapa">
              <iframe 
                title="map" 
                src={`https://maps.google.com/maps?q=${vivienda.direccion || vivienda.barrio},${vivienda.ciudad}&output=embed`} 
                width="100%" height="100%" style={{ border: 0 }} 
                allowFullScreen="" loading="lazy">
              </iframe>
            </div>

            <div className="tarjeta-contacto">
              <div className="perfil-agente">
                <div className="avatar">{vivienda.nombre_vendedor?.charAt(0).toUpperCase() || 'V'}</div>
                <div className="info-agente">
                  <h4>{vivienda.nombre_vendedor || 'Propietario'}</h4>
                  <p>Propietario</p>
                </div>
              </div>
              <div className="linea-fina"></div>
              <div className="metodos-contacto">
                <div className="item-contacto">
                  <span className="icono">📞</span>
                  <div className="textos">
                    <p className="etiqueta">Teléfono</p>
                    <p className="valor">{vivienda.telefono_vendedor || 'No disponible'}</p>
                  </div>
                </div>
                <div className="item-contacto">
                  <span className="icono">✉️</span>
                  <div className="textos">
                    <p className="etiqueta">Email de contacto</p>
                    <p className="valor">{vivienda.email_vendedor || 'No disponible'}</p>
                  </div>
                </div>
                <div className="item-contacto">
                  <span className="icono">📍</span>
                  <div className="textos">
                    <p className="etiqueta">Ubicación</p>
                    <p className="valor">{vivienda.direccion || vivienda.barrio}</p>
                  </div>
                </div>
              </div>
              <div className="botones-contacto">
                <button 
                  className="boton-negro" 
                  onClick={() => {
                    if (!idUsuario) {
                      setFeedback("Necesitas estar logueado para chatear");
                      setTimeout(() => setFeedback(""), 3000);
                      return;
                    }
                    navigate(`/chat/${vivienda.id_vivienda}/${vivienda.id_anunciante}`);
                  }}
                >
                  Chatear con {vivienda.nombre_vendedor || 'el propietario'}
                </button>
                <button className="boton-borde">Llamar ahora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HouseDetail;