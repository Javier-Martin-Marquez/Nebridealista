import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHouseStore } from '../../stores/houseStore';
import { useUserStore } from '../../stores/userStore';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HouseDetail.css';

function HouseDetail() {
  // Extraemos todos los parámetros definidos en el AppRouter
  const { tipo, ciudad, barrio, id } = useParams();
  const navigate = useNavigate();
  
  // Acceso a los datos de usuario y funciones de favoritos/guardado
  const idUsuario = useUserStore(state => state.idUsuario);
  const { toggleFavorite, toggleSave } = useHouseStore();

  const [vivienda, setVivienda] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    // Solo ejecutamos el fetch si los parámetros obligatorios existen en la URL
    if (tipo && ciudad && barrio && id) {
      const cargarDatos = async () => {
        try {
          // Petición al controlador que ya incluye vivienda + fotos en la respuesta
          const res = await fetch(`http://localhost:3000/viviendas/${tipo}/${ciudad}/${barrio}/${id}`);
          
          if (!res.ok) throw new Error("No se ha podido obtener la información de la vivienda");

          const data = await res.json();
          setVivienda(data);
        } catch (err) {
          console.error("Error al conectar con la base de datos:", err);
        }
      };

      cargarDatos();
    }
    // Aseguramos que el usuario aparezca al principio de la página al navegar
    window.scrollTo(0, 0);
  }, [tipo, ciudad, barrio, id]);

  // Mientras no haya datos, mostramos un mensaje de carga para evitar errores de renderizado
  if (!vivienda) {
    return (
      <>
        <Header />
        <div className="cargando-vivienda">Cargando detalles de la vivienda...</div>
        <Footer />
      </>
    );
  }

  // Las fotos vienen del controlador como un array llamado 'fotos'
  const fotos = vivienda.fotos || [];

  const siguiente = () => setImagenActual((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  const anterior = () => setImagenActual((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));

  return (
    <>
      <Header />
      <div className="pagina-detalle">
        <div className="contenido">

          {/* FILA SUPERIOR: Carrusel Dinámico + Tarjeta de Información */}
          <div className="fila-superior">
            
            {/* CONTENEDOR DEL CARRUSEL */}
            <div className="caja-foto">
              {fotos.length > 0 ? (
                <>
                  <img src={fotos[imagenActual]} alt={vivienda.titulo} />
                  <button className="flecha izq" onClick={anterior}>❮</button>
                  <button className="flecha der" onClick={siguiente}>❯</button>
                  <div className="contador">{imagenActual + 1} / {fotos.length}</div>
                </>
              ) : (
                <div className="sin-foto">No hay fotos disponibles para esta vivienda</div>
              )}
            </div>

            {/* TARJETA DE DATOS (Columnas de tu BDD) */}
            <div className="tarjeta-info">
              <h2>{vivienda.titulo || "Datos de la vivienda"}</h2>
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

              {/* Conexión con useHouseStore */}
              <div className="botones-guardar">
                <button 
                  className="boton-favorito" 
                  onClick={() => toggleFavorite(vivienda.id_vivienda, idUsuario)}
                >
                  ❤️ Favorito
                </button>
                <button 
                  className="boton-guardar" 
                  onClick={() => toggleSave(vivienda.id_vivienda, idUsuario)}
                >
                  🔔 Guardar
                </button>
              </div>
            </div>
          </div>

          {/* SECCIÓN DE DESCRIPCIÓN */}
          <div className="seccion-texto">
            <div className="tarjeta-texto">
              <h3>Descripción</h3>
              {vivienda.descripcion ? (
                vivienda.descripcion.split('\n').map((parrafo, i) => (
                  <p key={i}>{parrafo}</p>
                ))
              ) : (
                <p>Esta vivienda no dispone de descripción detallada.</p>
              )}
            </div>
          </div>

          {/* FILA INFERIOR: Mapa Dinámico + Contacto */}
          <div className="fila-inferior">
            <div className="caja-mapa">
              <iframe 
                title="mapa-ubicacion" 
                src={`https://maps.google.com/maps?q=${vivienda.direccion || vivienda.barrio},${vivienda.ciudad}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>

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
                <button className="boton-borde" onClick={() => window.print()}>Llamar ahora</button>
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