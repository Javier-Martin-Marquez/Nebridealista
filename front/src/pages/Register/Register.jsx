import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Register.css';

function Register () {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const datosRegistro = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      contraseña: password,
      tipo_usuario: tipoUsuario
    };

    try {
      const response = await fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosRegistro),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
        navigate('/login');
      } else {
        alert(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("No se pudo conectar con el servidor.");
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
            
            <select 
              className="reg-select" 
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              required
            >
              <option value="">Seleccione el tipo de usuario</option>
              <option value="cliente">Cliente</option>
              <option value="propietario">Propietario</option>
            </select>
            
            <button type="submit" className="reg-btn-primary">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;