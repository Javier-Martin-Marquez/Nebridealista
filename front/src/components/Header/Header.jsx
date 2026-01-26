import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Comprobamos si hay sesión iniciada al cargar el componente
  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) {
      setUserName(savedUser);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId"); // Limpiamos todo
    setUserName("");
    navigate("/"); // Volvemos al home
  };

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Logo y Nombre - Ahora clickable para volver al Home */}
        <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">
            🏠🏠
          </div>
          <h1 className="brand-name">NEBRIDEALISTA</h1>
        </Link>

        {/* Navegación Central - Conectada al AppRouter */}
        <nav className="header-nav">
          <Link to="/favoritos" className="nav-link">Favoritos</Link>
          <Link to="/busquedas" className="nav-link">Búsquedas</Link>
          <Link to="/vender" className="nav-link">Tu anuncio</Link>
        </nav>

        {/* Acceso de Usuario Dinámico */}
        <div className="header-user">
          <div className="user-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          {userName ? (
            <div className="user-logged-info">
              <span className="access-text">{userName}</span>
              <button onClick={handleLogout} className="logout-btn">
                (Salir)
              </button>
            </div>
          ) : (
            <Link to="/login" className="access-text" style={{ textDecoration: 'none' }}>
              Acceder
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;