import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Register.css';

function Register () {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  
  const [feedback, setFeedback] = useState({ msg: '', type: '' });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setFeedback({ msg: '', type: '' });

    const datosRegistro = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      contraseña: password,
    };

    try {
      const response = await fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosRegistro),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ 
          msg: "¡Usuario registrado con éxito! \n Ahora puedes iniciar sesión.", 
          type: 'success' 
        });
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);

      } else {
        setFeedback({ 
          msg: "No se ha podido crear la cuenta. \n Comprueba que el email no esté ya registrado.", 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      setFeedback({ 
        msg: "No se pudo conectar con el servidor", 
        type: 'error' 
      });
    }
  };

  return (
    <div className="reg-viewport">
      <div className="reg-outer-frame">
        <div className="reg-main-card">
          
          <div className="reg-header-group">
            <div className="reg-icon-wrapper">
              <img 
                src="/images/logo/imgLogo.png" 
                alt="Logo Nebridealista" 
                className="reg-brand-logo" 
              />
            </div>
            
            <h1 className="reg-brand-title">NEBRIDEALISTA</h1>
            
            <div className="reg-icon-wrapper">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <h2 className="reg-section-subtitle">DATOS PERSONALES</h2>

          {feedback.msg && (
            <div className={`reg-feedback-tag ${feedback.type}`}>
              {feedback.msg}
            </div>
          )}

          <form className="reg-form-stack" onSubmit={handleRegister}>
            <input 
              className="reg-input" 
              type="text" 
              placeholder="Introduzca su nombre" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
            <input 
              className="reg-input" 
              type="email" 
              placeholder="Introduzca su E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              className="reg-input" 
              type="password" 
              placeholder="Introduzca la contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <input 
              className="reg-input" 
              type="tel" 
              placeholder="Introduzca el teléfono" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            
            
            <button type="submit" className="reg-btn-primary">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;