import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email);
    navigate('/'); 
  };

  return (
    <div className="log-viewport-wrapper">
      <div className="log-frame-outer">
        <div className="log-main-panel">
          
          {/* Cabecera de Identidad: Logo - Título - Usuario */}
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
              style={{ backgroundColor: '#fff', marginTop: '5px' }}
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