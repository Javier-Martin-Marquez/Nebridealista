import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Messages.css';

function Messages() {
  const navigate = useNavigate();
  const idUsuario = useUserStore(state => state.idUsuario);
  const [conversaciones, setConversaciones] = useState([]);

  useEffect(() => {
    if (!idUsuario) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:3000/chat/conversaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_usuario: idUsuario })
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setConversaciones(data);
      })
      .catch(err => console.error('Error al cargar conversaciones:', err));
  }, [idUsuario, navigate]);

  if (!idUsuario) return null;

  return (
    <>
      <Header />
      <div className="mensajes-pagina">
        <div className="mensajes-contenedor">
          <h2 className="mensajes-titulo">Mis Mensajes</h2>

          {conversaciones.length === 0 ? (
            <div className="mensajes-vacio">
              <p>No tienes conversaciones todavía.</p>
            </div>
          ) : (
            <div className="mensajes-lista">
              {conversaciones.map((conv, i) => (
                <div
                  key={i}
                  className="mensajes-item"
                  onClick={() => navigate(`/chat/${conv.id_vivienda}/${conv.id_otro_usuario}`)}
                >
                  <div className="mensajes-avatar">
                    {conv.nombre_otro_usuario?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="mensajes-info">
                    <div className="mensajes-cabecera-item">
                      <span className="mensajes-nombre">{conv.nombre_otro_usuario}</span>
                      <span className="mensajes-fecha">
                        {new Date(conv.ultima_fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <p className="mensajes-vivienda">{conv.titulo_vivienda}</p>
                    <p className="mensajes-ultimo">{conv.ultimo_mensaje}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Messages;
