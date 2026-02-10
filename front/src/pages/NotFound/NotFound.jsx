import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react'; // Usamos iconos para darle vida
import './NotFound.css';

function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        
        <div className="not-found-icon">
          <Search size={80} strokeWidth={1} />
        </div>

        <h2 className="not-found-title">¡Vaya! Parece que te has perdido</h2>
        <p className="not-found-text">
          La vivienda o la página que buscas no se encuentra en nuestra página. 
        </p>

        <div className="not-found-actions">
          <button 
            className="btn-primary-nf" 
            onClick={() => navigate("/")}
          >
            <Home size={20} />
            Volver al inicio
          </button>
          
          <button 
            className="btn-secondary-nf" 
            onClick={() => navigate(-1)} // Función para ir a la página anterior
          >
            Regresar atrás
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;