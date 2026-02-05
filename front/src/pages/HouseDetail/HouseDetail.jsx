import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HouseDetail.css';

function HouseDetail() {
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

Al entrar, nos recibe un imponente salón-comedor con amplios ventanales que garantizan una luminosidad excepcional durante todo el día. La cocina, de concepto semi-abierto, está equipada con electrodomésticos de alta gama y encimeras de piedra natural, combinando funcionalidad y estética a la perfección.

La zona de descanso se distribuye en 7 dormitorios polivalentes, ideales tanto para familias numerosas como para configurar despachos profesionales o salas de ocio. La suite principal cuenta con baño privado y acabados de lujo. Los 3 cuartos de baño han sido reformados con un gusto exquisito, empleando grifería de diseño y platos de ducha a ras de suelo.

La ubicación es inmejorable, en una calle tranquila pero rodeada de todos los servicios: colegios de prestigio, centros de salud, y una oferta gastronómica y cultural de primer nivel. Una oportunidad inmejorable para aquellos que buscan exclusividad y confort en el centro de Madrid.`
  };

  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.946356616262!2d-3.7088487!3d40.4321722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42285e67e550a5%3A0xc0fa71b1969a8161!2sCalle%20de%20Rodr%C3%ADguez%20San%20Pedro%2C%2020%2C%2028015%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses";

  return (
    <>
      {/* El Header fuera de todo para que no se descuadre */}
      <Header />
      
      <div className="house-detail-page">
        <div className="detail-content">

          {/* BLOQUE SUPERIOR */}
          <div className="top-row-final">
            <div className="image-box">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Vivienda Nebridealista"
              />
            </div>

            <div className="info-card-white">
              <h2>Datos de la vivienda</h2>
              <div className="data-grid">
                <p><strong>Ciudad:</strong> {casa.ciudad}</p>
                <p><strong>Provincia:</strong> {casa.provincia}</p>
                <p><strong>Barrio:</strong> {casa.barrio}</p>
                <p><strong>Dirección:</strong> {casa.direccion}</p>
                <p><strong>Precio:</strong> {casa.precio} $</p>
                <p><strong>Metros cuadrados:</strong> {casa.metros} m2</p>
                <p><strong>Número habitaciones:</strong> {casa.habitaciones}</p>
                <p><strong>Número baños:</strong> {casa.banos}</p>
              </div>
            </div>
          </div>

          {/* BLOQUE CENTRAL */}
          <div className="description-section-spaced">
            <div className="description-card-highlight">
              {casa.descripcion.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* BLOQUE INFERIOR */}
          <div className="bottom-row-final">
            <div className="map-container">
              <iframe
                title="Mapa de ubicación"
                src={mapSrc}
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div className="contact-card-white">
              <h4>Contáctanos</h4>
              <p className="contact-number">980 987 987</p>
              <button className="msg-btn">Envíanos un mensaje</button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default HouseDetail;