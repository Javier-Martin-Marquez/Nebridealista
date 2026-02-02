import { useNavigate } from 'react-router-dom'; 
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registro exitoso, redirigiendo...");
    navigate('/');
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
            <input className="reg-input" type="text" placeholder="Introduzca su nombre" required />
            <input className="reg-input" type="email" placeholder="Introduzca su E-mail" required />
            <input className="reg-input" type="password" placeholder="Introduzca la contraseña" required />
            <input className="reg-input" type="tel" placeholder="Introduzca el teléfono" />
            
            <select className="reg-select" required>
              <option value="">Seleccione el tipo de usuario</option>
              <option value="client">Cliente</option>
              <option value="owner">Propietario</option>
            </select>
            
            <button type="submit" className="reg-btn-primary">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;