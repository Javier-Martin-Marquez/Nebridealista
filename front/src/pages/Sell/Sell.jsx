import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useUserStore } from '../../stores/userStore';
import './Sell.css';

function Sell() {
  const navigate = useNavigate();
  const idUsuario = useUserStore(state => state.idUsuario);

  const [feedback, setFeedback] = useState({ msg: '', type: '' });

  const [viviendaData, setViviendaData] = useState({
    titulo: '', 
    descripcion: '',
    descripcion_detallada: '', 
    direccion: '', 
    barrio: '', 
    ciudad: '',
    provincia: '', 
    precio: '', 
    tipo_transaccion: '', 
    metros_cuadrados: '',
    num_habitaciones: '', 
    num_baños: '', 
    tipo_vivienda: ''
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!foto) { setPreview(null); return; }
    const objectUrl = URL.createObjectURL(foto);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [foto]);

  const gestionarCambio = (e) => {
    const { name, value } = e.target;
    setViviendaData({ ...viviendaData, [name]: value });
  };

  const enviarPublicacion = async (e) => {
    e.preventDefault();
    setFeedback({ msg: '', type: '' });

    if (!idUsuario) {
      setFeedback({ msg: "No puedes publicar si no has iniciado sesión.", type: 'error' });
      return;
    }

    // Validar que no falten campos
    const faltanCampos = Object.values(viviendaData).some(v => v === '') || !foto;
    if (faltanCampos) {
      setFeedback({ msg: "Por favor, completa todos los campos y sube una foto.", type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('id_anunciante', idUsuario);
    formData.append('foto', foto);
    Object.keys(viviendaData).forEach(key => formData.append(key, viviendaData[key]));

    try {
      const response = await fetch("http://localhost:3000/vender/anuncio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ msg: "¡Propiedad publicada con éxito!", type: 'success' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setFeedback({ msg: data.message || "Error al publicar", type: 'error' });
      }
    } catch (error) {
      setFeedback({ msg: "Error de conexión con el servidor", type: 'error' });
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-viewport">
        <div className="auth-outer-frame">
          <div className="auth-main-card">
            <h2 className="auth-section-subtitle">PUBLICAR NUEVO ANUNCIO</h2>

            <form className="auth-form-stack" onSubmit={enviarPublicacion}>
              {/* Título */}
              <input className="auth-input" name="titulo" placeholder="Título del anuncio" onChange={gestionarCambio} />
              
              {/* Descripción CORTA (la que ya tenías) */}
              <input className="auth-input" name="descripcion" placeholder="Descripcion breve" onChange={gestionarCambio} />

              {/* DESCRIPCIÓN DETALLADA (Nueva abajo) */}
              <textarea 
                className="auth-input" 
                name="descripcion_detallada" 
                placeholder="Descripción completa y detallada (características, estado, equipamiento...)" 
                onChange={gestionarCambio}
                rows="5"
                style={{ borderRadius: '25px', resize: 'none', padding: '18px 25px' }} 
              />

              {/* Resto de campos */}
              <input className="auth-input" name="direccion" placeholder="Calle y número" onChange={gestionarCambio} />
              <input className="auth-input" name="barrio" placeholder="Barrio o zona" onChange={gestionarCambio} />
              <input className="auth-input" name="ciudad" placeholder="Municipio / Ciudad" onChange={gestionarCambio} />
              <input className="auth-input" name="provincia" placeholder="Provincia" onChange={gestionarCambio} />
              <input className="auth-input" name="precio" placeholder="Precio (€)" type="number" onChange={gestionarCambio} />

              <select className="auth-select" name="tipo_transaccion" onChange={gestionarCambio}>
                <option value="">Selecciona modalidad: Venta o Alquiler</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>

              <input className="auth-input" name="metros_cuadrados" placeholder="Superficie (m²)" type="number" onChange={gestionarCambio} />
              <input className="auth-input" name="num_habitaciones" placeholder="Hab." type="number" onChange={gestionarCambio} />
              <input className="auth-input" name="num_baños" placeholder="Baños" type="number" onChange={gestionarCambio} />

              <select className="auth-select" name="tipo_vivienda" onChange={gestionarCambio}>
                <option value="">Categoría del inmueble</option>
                <option value="piso">Piso / Apartamento</option>
                <option value="casa">Casa / Chalet</option>
                <option value="garaje">Garaje</option>
                <option value="local">Local comercial</option>
              </select>

              <div className="upload-box-container">
                <p className="upload-label-text">Imagen de la propiedad</p>
                {!preview ? (
                  <label htmlFor="foto-upload" className="upload-placeholder">
                    <div className="upload-icon">📸</div>
                    <span>Haga clic para seleccionar una foto</span>
                  </label>
                ) : (
                  <div className="preview-wrapper">
                    <img src={preview} alt="Vista previa" className="upload-img-preview" />
                    <button type="button" className="upload-remove-btn" onClick={() => setFoto(null)}>✕ Quitar</button>
                  </div>
                )}
                <input id="foto-upload" type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} hidden />
              </div>
              
              {feedback.msg && (
                <div 
                  className={`log-feedback-tag ${feedback.type}`} 
                  style={{ margin: '10px 0', textAlign: 'center', display: 'block' }}
                >
                  {feedback.msg}
                </div>
              )}

              <button type="submit" className="auth-btn-primary">Publicar propiedad</button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Sell;