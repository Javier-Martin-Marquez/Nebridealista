import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const userName = useUserStore(state => state.userName);
  const logout = useUserStore(state => state.logout);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/'); 
  };

  return (
    <header className="main-header">
      <div className="header-container">

        {/* Logo y Nombre de marca */}
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            <img src="/images/logo/imgLogo.png" alt="Logo Nebridealista" />
          </div>
          <h1 className="brand-name-home">NEBRIDEALISTA</h1>
        </Link>

        {/* Navegación Central */}
        <nav className="header-nav">
          <Link to="/favoritos" className="nav-link">Favoritos</Link>
          <Link to="/busquedas" className="nav-link">Búsquedas</Link>
          <Link to="/vender" className="nav-link">Tu anuncio</Link>
        </nav>

        {/* Sección de Usuario */}
        <div className="header-user">
          {userName ? (
            <div className="user-menu-container">
              {/* Trigger: Agrupa icono y nombre */}
              <div 
                className="user-trigger" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="user-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="access-text">{userName} ▾</span>
              </div>

              {/* Menú Desplegable */}
              {showDropdown && (
                <div className="user-dropdown">
                  <button onClick={handleLogout} className="dropdown-logout">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Estado para cuando no hay sesión iniciada */
            <Link to="/login" className="user-trigger">
              <div className="user-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="access-text">Acceder</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;