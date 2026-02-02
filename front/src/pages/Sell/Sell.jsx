import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Sell.css';

const Sell = () => {
  const navigate = useNavigate();

  const [viviendaData, setViviendaData] = useState({
    tituloAnuncio: '',
    detallesVivienda: '',
    ubicacionExacta: '',
    zonaBarrio: '',
    municipio: '',
    estadoProvincia: '',
    valorVenta: '',
    modalidadContrato: '',
    superficieM2: '',
    categoriaInmueble: ''
  });

  const gestionarCambio = (e) => {
    const { name, value } = e.target;
    if ((name === 'superficieM2' || name === 'valorVenta') && value < 0) return;
    setViviendaData({ ...viviendaData, [name]: value });
  };

  const enviarPublicacion = (e) => {
    e.preventDefault();
    console.log("Datos del inmueble listos:", viviendaData);
    navigate('/');
  };

  return (
    <div>
      <Header />
      <div className="auth-viewport">


        <div className="auth-outer-frame">
          <div className="auth-main-card">

            <h2 className="auth-section-subtitle">PUBLICAR NUEVO ANUNCIO</h2>

            <form className="auth-form-stack" onSubmit={enviarPublicacion}>
              <input className="auth-input" name="tituloAnuncio" placeholder="Título del anuncio (ej: Ático luminoso)" onChange={gestionarCambio} required />
              <input className="auth-input" name="detallesVivienda" placeholder="Descripción detallada de la propiedad" onChange={gestionarCambio} />
              <input className="auth-input" name="ubicacionExacta" placeholder="Calle y número" onChange={gestionarCambio} required />
              <input className="auth-input" name="zonaBarrio" placeholder="Barrio o zona" onChange={gestionarCambio} />
              <input className="auth-input" name="municipio" placeholder="Ciudad o municipio" onChange={gestionarCambio} required />
              <input className="auth-input" name="estadoProvincia" placeholder="Provincia" onChange={gestionarCambio} required />
              <input className="auth-input" name="valorVenta" placeholder="Precio (€)" type="number" min="0" onChange={gestionarCambio} required />

              <select className="auth-select" name="modalidadContrato" onChange={gestionarCambio} required>
                <option value="">Selecciona modalidad: Venta o Alquiler</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>

              <input className="auth-input" name="superficieM2" placeholder="Superficie útil (m²)" type="number" min="0" onChange={gestionarCambio} required />

              <select className="auth-select" name="categoriaInmueble" onChange={gestionarCambio} required>
                <option value="">Categoría del inmueble</option>
                <option value="piso">Piso / Apartamento</option>
                <option value="casa">Casa / Chalet</option>
              </select>

              <button type="submit" className="auth-btn-primary">Publicar propiedad</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;