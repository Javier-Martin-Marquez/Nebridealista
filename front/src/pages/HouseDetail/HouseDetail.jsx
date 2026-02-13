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
  const { toggleFavorite, toggleSave } = useHouseStore();

  const [vivienda, setVivienda] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);

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

  const fotos = vivienda.fotos || [];

  return (
    <>
      <Header />
      <div className="pagina-detalle">
        <div className="contenido">

          {/* FILA SUPERIOR: Carrusel + Tarjeta Info */}
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

              <div className="botones-guardar">
                <button className="boton-favorito" onClick={() => toggleFavorite(vivienda.id_vivienda, idUsuario)}>❤️ Favorito</button>
                <button className="boton-guardar" onClick={() => toggleSave(vivienda.id_vivienda, idUsuario)}>🔔 Guardar</button>
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="seccion-texto">
            <div className="tarjeta-texto">
              <h3>Descripción</h3>
              {vivienda.descripcion_detallada?.split('\n').map((p, i) => <p key={i}>{p}</p>) || <p>Sin descripción disponible.</p>}
            </div>
          </div>

          {/* FILA INFERIOR: Mapa + Contacto */}
          <div className="fila-inferior">
            {/* MAPA DINÁMICO */}
            <div className="caja-mapa">
              <iframe 
                title="map" 
                src={`https://maps.google.com/maps?q=${vivienda.direccion || vivienda.barrio},${vivienda.ciudad}&output=embed`} 
                width="100%" height="100%" style={{ border: 0 }} 
                allowFullScreen="" loading="lazy">
              </iframe>
            </div>

            {/* CAJITA DE CONTACTO */}
            <div className="tarjeta-contacto">
              <div className="perfil-agente">
                <div className="avatar">N</div>
                <div className="info-agente">
                  <h4>Nebridealista Real Estate</h4>
                  <p>Agente especializado</p>
                </div>
              </div>
              <div className="linea-fina"></div>
              <div className="metodos-contacto">
                <div className="item-contacto">
                  <span className="icono">📞</span>
                  <div className="textos">
                    <p className="etiqueta">Teléfono gratuito</p>
                    <p className="valor">980 987 987</p>
                  </div>
                </div>
                <div className="item-contacto">
                  <span className="icono">✉️</span>
                  <div className="textos">
                    <p className="etiqueta">Email de contacto</p>
                    <p className="valor">info@nebridealista.com</p>
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
                <button className="boton-negro">Enviar mensaje</button>
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