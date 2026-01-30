import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ActionBox from '../../components/ActionBox/ActionBox';
import './Home.css';
import Footer from '../../components/Footer/Footer';

function Home() {
  const navigate = useNavigate();

  const actions = [
    { id: 1, title: 'Comprar', img: '/images/home/comprar.png', path: '/comprar' },
    { id: 2, title: 'Alquilar', img: '/images/home/alquilar.png', path: '/alquilar' },
    { id: 3, title: 'Vender', img: '/images/home/vender.png', path: '/vender' },
  ];

  return (
    <div className="home-page">
      <Header />
      
      {/* Sección Hero */}
      <div className='imgHero'>
        <img
          src="/images/home/imgHero.png"
          alt="Portada Nebridealista"
        />
      </div>

      {/* Contenedor de Acciones con Navegación Directa */}
      <section className="actions-container">
        {actions.map((action) => (
          <ActionBox
            key={action.id}
            title={action.title}
            image={action.img}
            onClick={() => navigate(action.path)}
          />
        ))}
      </section>

      {/* Sección Quiénes Somos */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-title">Quienes somos - Nebridealista: Tu Hogar, Nuestra Prioridad</h2>

          <div className="about-content">
            <p className="about-text">
              En <strong>Nebridealista</strong>, no solo nos dedicamos a la gestión inmobiliaria; transformamos el proceso de encontrar tu hogar ideal en una experiencia sencilla, transparente y gratificante. Nacimos de la profunda pasión por el sector inmobiliario y el firme compromiso de ofrecer un servicio excepcional y totalmente personalizado a cada uno de nuestros clientes.
            </p>

            <div className="about-grid">
              <div className="about-column">
                <h3>Nuestra Misión</h3>
                <p>
                  Facilitar el acceso a la vivienda mediante una plataforma intuitiva que elimina las barreras tradicionales del mercado. Nos esforzamos por conectar a las personas con espacios que no solo cumplen con sus necesidades técnicas, sino que inspiran sus proyectos de vida.
                </p>
              </div>
              <div className="about-column">
                <h3>Nuestra Visión</h3>
                <p>
                  Convertirnos en el referente digital del sector inmobiliario, siendo reconocidos por nuestra integridad, innovación tecnológica y por poner siempre el bienestar del cliente en el centro de todas nuestras decisiones estratégicas.
                </p>
              </div>
            </div>

            <p className="about-text">
              Nuestra plataforma combina algoritmos de búsqueda avanzada con un equipo humano altamente cualificado, facilitando una conexión real y eficiente entre compradores, vendedores y arrendatarios. Entendemos que una casa es mucho más que cuatro paredes y un techo; es el escenario de tus futuros recuerdos.
            </p>
          </div>
        </div>
      </section>
      <Footer/>

    </div>
  );
}

export default Home;