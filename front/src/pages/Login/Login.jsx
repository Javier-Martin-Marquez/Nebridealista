import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({ msg: '', type: '' }); 
  
  const navigate = useNavigate();
  
  const loginGlobal = useUserStore(state => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ msg: '', type: '' });

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos en Zustand
        loginGlobal(data.user.nombre, data.user.id);
        
        setFeedback({ msg: `¡Hola ${data.user.nombre}! Iniciando sesión...`, type: 'success' });
        
        setTimeout(() => {
          navigate('/');
        }, 1500);

      } else {
        setFeedback({ msg: "Nombre de usuario o contraseña incorrectos. \n Vuelve a iniciar sesión o registrate", type: 'error' });
      }
    } catch (error) {
      setFeedback({ msg: "Error al conectar con el servidor", type: 'error' });
      console.error("Error conectando:", error);
    }
  };

  return (
    <div className="log-viewport-wrapper">
      <div className="log-frame-outer">
        <div className="log-main-panel">
          
          <div className="log-identity-bar">
            <div className="log-symbol-box">
              <img 
                src="/images/logo/imgLogo.png" 
                alt="Logo Nebridealista" 
                className="log-logo-img" 
              />
            </div>

            <h1 className="log-brand-title">NEBRIDEALISTA</h1>

            <div className="log-symbol-box">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="log-icon-user">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <h2 className="log-section-label">INICIAR SESIÓN</h2>

          {feedback.msg && (
            <div className={`log-feedback-tag ${feedback.type}`}>
              {feedback.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="log-fields-stack">
            
            <input 
              type="email" 
              placeholder="Introduzca su E-mail" 
              className="log-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input 
              type="password" 
              placeholder="Introduzca la contraseña" 
              className="log-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="log-btn-submit">
              Continuar
            </button>

            <button 
              type="button" 
              className="log-btn-submit"
              onClick={() => navigate('/registro')}
              
            >
              Registrarse
            </button>
            
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;