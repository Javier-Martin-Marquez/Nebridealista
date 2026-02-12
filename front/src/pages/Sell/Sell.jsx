import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useUserStore } from '../../stores/userStore';
import './Sell.css';

function Sell() {
  const navigate = useNavigate();
  const idUsuario = useUserStore(state => state.idUsuario);

  const [viviendaData, setViviendaData] = useState({
    titulo: '',
    descripcion: '',
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

  const gestionarCambio = (e) => {
    const { name, value } = e.target;

    setViviendaData({ ...viviendaData, [name]: value });
  };

  const enviarPublicacion = async (e) => {
    e.preventDefault();

    if (!idUsuario) {
      alert("Debes iniciar sesión para publicar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/vender/anuncio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...viviendaData,
          id_anunciante: idUsuario,
          precio: parseFloat(viviendaData.precio),
          metros_cuadrados: parseInt(viviendaData.metros_cuadrados),
          num_habitaciones: parseInt(viviendaData.num_habitaciones),
          num_baños: parseInt(viviendaData.num_baños)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Propiedad publicada con éxito!");
        navigate('/');
      } else {
        alert(data.message || "Error al publicar");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor.");
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
              <input className="auth-input" name="titulo" placeholder="Título del anuncio" onChange={gestionarCambio} required />
              <input className="auth-input" name="descripcion" placeholder="Descripción de la propiedad" onChange={gestionarCambio} />
              <input className="auth-input" name="direccion" placeholder="Calle y número" onChange={gestionarCambio} required />
              <input className="auth-input" name="barrio" placeholder="Barrio o zona" onChange={gestionarCambio} required />
              <input className="auth-input" name="ciudad" placeholder="Municipio / Ciudad" onChange={gestionarCambio} required />
              <input className="auth-input" name="provincia" placeholder="Provincia" onChange={gestionarCambio} required />
              <input className="auth-input" name="precio" placeholder="Precio (€)" type="number" onChange={gestionarCambio} required />

              <select className="auth-select" name="tipo_transaccion" onChange={gestionarCambio} required>
                <option value="">Selecciona modalidad: Venta o Alquiler</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>

              <input className="auth-input" name="metros_cuadrados" placeholder="Superficie (m²)" type="number" onChange={gestionarCambio} required />
              <input className="auth-input" name="num_habitaciones" placeholder="Hab." type="number" onChange={gestionarCambio} required />
              <input className="auth-input" name="num_baños" placeholder="Baños" type="number" onChange={gestionarCambio} required />

              <select className="auth-select" name="tipo_vivienda" onChange={gestionarCambio} required>
                <option value="">Categoría del inmueble</option>
                <option value="piso">Piso / Apartamento</option>
                <option value="casa">Casa / Chalet</option>
                <option value="garaje">Garaje</option>
                <option value="local">Local comercial</option>
              </select>

              <button type="submit" className="auth-btn-primary">Publicar propiedad</button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Sell;