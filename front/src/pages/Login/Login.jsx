import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de acceso exitoso
    console.log("Iniciando sesión con:", email);
    navigate('/home'); 
  };

  return (
    <div className="login-screen-bg">
      {/* El lienzo beige exterior */}
      <div className="login-canvas">
        
        {/* LA CAJA: Encapsulamiento total con borde naranja */}
        <div className="login-box-container">
          
          {/* ENCABEZADO TRIPLE: Casa | Nombre | Persona */}
          <div className="login-header-triple">
            <div className="logo-icon">🏠</div>
            <h1 className="brand-name">NEBRIDEALISTA</h1>
            <div className="logo-icon">👤</div>
          </div>

          <h2 className="login-section-title">INICIAR SESIÓN</h2>

          {/* Formulario funcional */}
          <form onSubmit={handleSubmit} className="login-form">
            
            <input 
              type="email" 
              placeholder="Introduzca su E-mail" 
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input 
              type="password" 
              placeholder="Introduzca la contraseña" 
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* BOTONES: Redondeado suave y alineado a la izquierda */}
            <button type="submit" className="login-btn">
              Continuar
            </button>

            <button 
              type="button" 
              className="login-btn"
              onClick={() => navigate('/register')}
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