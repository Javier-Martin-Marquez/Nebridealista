function InteractiveMap({ ciudad }) {
  // Si no hay ciudad, mostramos España por defecto
  const ubicacion = ciudad || "España";
  
  // Creamos la URL dinámica para el iframe
  const mapUrl = `https://maps.google.com/maps?q=${ubicacion}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="map-container-simple" style={{ width: '100%', height: '450px' }}>
      <iframe
        title="mapa"
        width="100%"
        height="100%"
        src={mapUrl}
        style={{ borderRadius: '8px', border: '1.5px solid #d4a373' }}
      ></iframe>
    </div>
  );
}

export default InteractiveMap;