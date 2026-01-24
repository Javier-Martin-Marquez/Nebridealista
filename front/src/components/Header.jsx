import '../App.css';

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo y Nombre */}
        <div className="header-logo">
          <div className="logo-icon">
            {/* Aquí iría tu SVG o imagen del logo de las casitas */}
            🏠🏠
          </div>
          <h1 className="brand-name">NEBRIDEALISTA</h1>
        </div>

        {/* Navegación Central */}
        <nav className="header-nav">
          <a href="#favoritos" className="nav-link">Favoritos</a>
          <a href="#busquedas" className="nav-link">Busquedas</a>
          <a href="#tu-anuncio" className="nav-link">Tu anuncio</a>
        </nav>

        {/* Acceso de Usuario */}
        <div className="header-user">
          <div className="user-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span className="access-text">Acceder</span>
        </div>
      </div>
    </header>
  )
}

export default Header