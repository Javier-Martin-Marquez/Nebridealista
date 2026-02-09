import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  // Extraemos los datos que necesitamos de la store
  const userName = useUserStore(state => state.userName);
  const logout = useUserStore(state => state.logout);

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <header className="main-header">
      <div className="header-container">

        {/* Logo y Nombre */}
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            <img
              src="/images/logo/imgLogo.png"
              alt="Logo Nebridealista"
            />
          </div>
          <h1 className="brand-name-home">NEBRIDEALISTA</h1>
        </Link>

        {/* Navegación Central */}
        <nav className="header-nav">
          <Link to="/favoritos" className="nav-link">Favoritos</Link>
          <Link to="/busquedas" className="nav-link">Búsquedas</Link>
          <Link to="/vender" className="nav-link">Tu anuncio</Link>
        </nav>

        {/* Acceso de Usuario */}
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
            <Link to="/login" className="access-text">
              Acceder
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;