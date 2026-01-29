import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        <div className="footer-section brand-info">
          <div className="footer-logo">
            <span className="logo-emoji">🏠🏠</span>
            <h2 className="footer-brand-name">NEBRIDEALISTA</h2>
          </div>
          <p className="footer-tagline">Tu hogar, nuestra prioridad.</p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Nuestras Páginas</h3>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/comprar">Comprar</Link>
            <Link to="/alquilar">Alquilar</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/favoritos">Mis Favoritos</Link>
            <Link to="/busquedas">Mis Busquedas</Link>
          </nav>
        </div>

        <div className="footer-section contact-info">
          <h3>Contacta con nosotros</h3>
          <p>📧 hola@nebridealista.com</p>
          <p>📍 Calle Serrano 1, Madrid</p>
          <p>📞 +34 912 345 678</p>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>© 2026 Nebridealista Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;