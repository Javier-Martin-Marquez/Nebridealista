import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Hacemos un POST para pedir los datos del usuario 1 al Back
    // Usamos el id_usuario en el body como tienes configurado
    fetch("http://localhost:3000/favoritos/lista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: 1 }), 
    })
      .then((res) => res.json())
      .then((data) => {
        // Aquí asumimos que si hay respuesta exitosa, es el Usuario 1
        // Si tu back devuelve el nombre real, pondríamos data.nombre
        if (data) {
          setUserName("Usuario 1");
        }
      })
      .catch((err) => {
        console.error("Error conectando con el back para el usuario:", err);
        setUserName(""); // Si falla, que salga "Acceder"
      });
  }, []);

  // Función para "Cerrar sesión" (Simplemente limpia el estado)
  const handleLogout = () => {
    setUserName("");
    navigate("/"); 
  };

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Logo y Nombre */}
        <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">
            🏠🏠
          </div>
          <h1 className="brand-name">NEBRIDEALISTA</h1>
        </Link>

        {/* Navegación Central */}
        <nav className="header-nav">
          <Link to="/favoritos" className="nav-link">Favoritos</Link>
          <Link to="/busquedas" className="nav-link">Búsquedas</Link>
          <Link to="/vender" className="nav-link">Tu anuncio</Link>
        </nav>

        {/* Acceso de Usuario Dinámico por Fetch */}
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