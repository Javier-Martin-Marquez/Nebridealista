import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { io } from 'socket.io-client';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Chat.css';

function Chat() {
  const { idVivienda, idVendedor } = useParams();
  const navigate = useNavigate();
  const idUsuario = useUserStore(state => state.idUsuario);
  const userName = useUserStore(state => state.userName);

  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const socketRef = useRef(null);
  const mensajesRef = useRef(null);

  // Nombre de la sala: ordenamos los IDs para que sea la misma sala para ambos
  const ids = [Number(idUsuario), Number(idVendedor)].sort((a, b) => a - b);
  const sala = `chat_${idVivienda}_${ids[0]}_${ids[1]}`;

  // Redirigir si no está logueado
  useEffect(() => {
    if (!idUsuario) {
      navigate('/login');
    }
  }, [idUsuario, navigate]);

  // Cargar mensajes anteriores y conectar socket
  useEffect(() => {
    if (!idUsuario) return;

    // Cargar historial
    fetch('http://localhost:3000/chat/mensajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_vivienda: idVivienda, id_usuario: idUsuario })
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMensajes(data);
      })
      .catch(err => console.error('Error al cargar mensajes:', err));

    // Conectar socket
    const nuevoSocket = io('http://localhost:3000');
    socketRef.current = nuevoSocket;

    nuevoSocket.emit('unirse_sala', sala);

    nuevoSocket.on('nuevo_mensaje', (mensaje) => {
      setMensajes(prev => [...prev, mensaje]);
    });

    return () => {
      nuevoSocket.disconnect();
      socketRef.current = null;
    };
  }, [idUsuario, idVivienda, idVendedor]);

  // Scroll al último mensaje
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = () => {
    if (!texto.trim() || !socketRef.current) return;

    socketRef.current.emit('enviar_mensaje', {
      sala,
      id_vivienda: Number(idVivienda),
      id_emisor: idUsuario,
      id_receptor: Number(idVendedor),
      mensaje: texto.trim()
    });

    setTexto('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  if (!idUsuario) return null;

  return (
    <div className="chat-viewport">
      <Header />
      <div className="chat-pagina">
        <div className="chat-contenedor">

          <div className="chat-cabecera">
            <h2>Chat sobre vivienda #{idVivienda}</h2>
          </div>

          <div className="chat-mensajes" ref={mensajesRef}>
            {mensajes.length === 0 ? (
              <div className="chat-vacio">
                <p>No hay mensajes todavía. ¡Escribe el primero!</p>
              </div>
            ) : (
              mensajes.map((msg) => (
                <div
                  key={msg.id_mensaje}
                  className={`chat-burbuja ${msg.id_emisor === idUsuario ? 'mio' : 'otro'}`}
                >
                  <span className="chat-nombre">{msg.id_emisor === idUsuario ? userName : msg.nombre_emisor}</span>
                  <p className="chat-texto">{msg.mensaje}</p>
                  <span className="chat-hora">
                    {new Date(msg.fecha_envio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="chat-input-zona">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chat-input"
            />
            <button onClick={enviarMensaje} className="chat-enviar">Enviar</button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
