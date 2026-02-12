import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HouseDetail.css';

function HouseDetail() {
  const navigate = useNavigate();

  // Fotos de ejemplo para el carrusel (sin BDD)
  const fotos = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600607687940-4e2003e25489?auto=format&fit=crop&w=1000&q=80"
  ];

  const [imagenActual, setImagenActual] = useState(0);

  const siguiente = () => {
    setImagenActual((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  const anterior = () => {
    setImagenActual((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const casa = {
    ciudad: "Madrid",
    provincia: "Madrid",
    barrio: "Salamanca",
    direccion: "Calle de Rodríguez San Pedro, 20",
    precio: "1.500.000",
    metros: "120",
    habitaciones: "7",
    banos: "3",
    descripcion: `Espectacular vivienda de lujo ubicada en una de las zonas más codiciadas de la capital. Esta propiedad única destaca por su reciente reforma integral con materiales de primerísima calidad y un diseño arquitectónico vanguardista que aprovecha cada metro cuadrado.

Al entrar, nos recibe un imponente salón-comedor con amplios ventanales que garantizan una luminosidad excepcional durante todo el día. La cocina, de concepto semi-abierto, está equipada con electrodomésticos de alta gama y encimeras de piedra natural, combinando funcionalidad y estética a la perfección.`
  };

  return (
    <>
      <Header />
      <div className="pagina-detalle">
        <div className="contenido">

          {/* FILA SUPERIOR: Carrusel + Tarjeta Info */}
          <div className="fila-superior">
            
            {/* CARRUSEL */}
            <div className="caja-foto">
              <img src={fotos[imagenActual]} alt="Vivienda" />
              <button className="flecha izq" onClick={anterior}>❮</button>
              <button className="flecha der" onClick={siguiente}>❯</button>
              <div className="contador">{imagenActual + 1} / {fotos.length}</div>
            </div>

            {/* INFO VIVIENDA */}
            <div className="tarjeta-info">
              <h2>Datos de la vivienda</h2>
              <div className="lista-datos">
                <p><strong>Ciudad:</strong> {casa.ciudad}</p>
                <p><strong>Provincia:</strong> {casa.provincia}</p>
                <p><strong>Barrio:</strong> {casa.barrio}</p>
                <p><strong>Dirección:</strong> {casa.direccion}</p>
                <p><strong>Precio:</strong> {casa.precio} $</p>
                <p><strong>Metros:</strong> {casa.metros} m2</p>
                <p><strong>Habitaciones:</strong> {casa.habitaciones}</p>
                <p><strong>Baños:</strong> {casa.banos}</p>
              </div>

              <div className="botones-guardar">
                <button className="boton-favorito" onClick={() => navigate('/favoritos')}>❤️ Favorito</button>
                <button className="boton-guardar" onClick={() => navigate('/busquedas')}>🔔 Guardar</button>
              </div>
            </div>
          </div>

          {/* DESCRIPCION */}
          <div className="seccion-texto">
            <div className="tarjeta-texto">
              {casa.descripcion.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* FILA INFERIOR: Mapa + Contacto */}
          <div className="fila-inferior">
            <div className="caja-mapa">
              <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.946768783478!2d-3.7088461!3d40.43217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42286064f27d8f%3A0x6b63d67f998394e2!2sCalle%20de%20Rodr%C3%ADguez%20San%20Pedro%2C%2020%2C%20Chamber%C3%AD%2C%2028015%20Madrid!5e0!3m2!1ses!2ses!4v1707654000000!5m2!1ses!2ses" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
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
                    <p className="valor">{casa.direccion}</p>
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