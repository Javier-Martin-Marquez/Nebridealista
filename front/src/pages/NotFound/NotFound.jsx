import { useNavigate } from 'react-router-dom'

function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h2> 404</h2>
      <p>Esta ruta no existe en Nebridealista</p>

      <button onClick={()=>{ navigate("/")}}>
        Volver al inicio
      </button>
    </div>
  )
}

export default NotFound