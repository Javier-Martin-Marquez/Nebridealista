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
    titulo: '', descripcion: '', descripcion_detallada: '', 
    direccion: '', barrio: '', ciudad: '', provincia: '', 
    precio: '', tipo_transaccion: '', metros_cuadrados: '',
    num_habitaciones: '', num_baños: '', tipo_vivienda: ''
  });

  const [fotos, setFotos] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (fotos.length === 0) { setPreviews([]); return; }
    const objectUrls = fotos.map(f => URL.createObjectURL(f));
    setPreviews(objectUrls);
    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [fotos]);

  const gestionarCambio = (e) => {
    const { name, value } = e.target;
    setViviendaData({ ...viviendaData, [name]: value });
  };

  const enviarPublicacion = async (e) => {
    e.preventDefault();
    setFeedback({ msg: '', type: '' });

    if (!idUsuario) {
      setFeedback({ msg: "Inicia sesión para publicar.", type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('id_anunciante', idUsuario);
    fotos.forEach(f => formData.append('foto', f));
    Object.keys(viviendaData).forEach(key => formData.append(key, viviendaData[key]));

    try {
      const response = await fetch("http://localhost:3000/vender/anuncio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ msg: "¡Publicado con éxito!", type: 'success' });
        setTimeout(() => navigate('/'), 1000);
      } else {
        setFeedback({ msg: data.message || "Error al publicar", type: 'error' });
      }
    } catch (error) {
      setFeedback({ msg: "Error de conexión", type: 'error' });
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
              <input className="auth-input" name="titulo" placeholder="Título" onChange={gestionarCambio} required />
              <input className="auth-input" name="descripcion" placeholder="Descripción breve" onChange={gestionarCambio} required />
              
              <textarea 
                className="auth-input auth-textarea" 
                name="descripcion_detallada" 
                placeholder="Descripción completa..." 
                onChange={gestionarCambio}
                rows="5" 
                required
              />

              <input className="auth-input" name="direccion" placeholder="Dirección" onChange={gestionarCambio} required />
              <input className="auth-input" name="barrio" placeholder="Barrio" onChange={gestionarCambio} required />
              <input className="auth-input" name="ciudad" placeholder="Ciudad" onChange={gestionarCambio} required />
              <input className="auth-input" name="provincia" placeholder="Provincia" onChange={gestionarCambio} required />
              <input className="auth-input" name="precio" placeholder="Precio" type="number" onChange={gestionarCambio} required />

              <select className="auth-select" name="tipo_transaccion" onChange={gestionarCambio} required>
                <option value="">Modalidad</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>

              <input className="auth-input" name="metros_cuadrados" placeholder="m²" type="number" onChange={gestionarCambio} required />
              <input className="auth-input" name="num_habitaciones" placeholder="Hab." type="number" onChange={gestionarCambio} required />
              <input className="auth-input" name="num_baños" placeholder="Baños" type="number" onChange={gestionarCambio} required />

              <select className="auth-select" name="tipo_vivienda" onChange={gestionarCambio} required>
                <option value="">Categoría</option>
                <option value="piso">Piso</option>
                <option value="casa">Casa</option>
                <option value="garaje">Garaje</option>
                <option value="local">Local</option>
              </select>

              <div className="upload-box-container">
                <p className="upload-label-text">Imágenes (mínimo 1)</p>
                <label htmlFor="foto-upload" className="upload-placeholder">📸 Subir fotos</label>
                <input id="foto-upload" type="file" accept="image/*" multiple onChange={(e) => setFotos(Array.from(e.target.files))} hidden />
                
                <div className="previews-grid">
                  {previews.map((url, i) => (
                    <img key={i} src={url} alt="preview" className="mini-preview-img" />
                  ))}
                </div>
              </div>
              
              {feedback.msg && <div className={`log-feedback-tag ${feedback.type}`}>{feedback.msg}</div>}
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