import { useState, useRef, useEffect } from 'react';
import { useFilterStore } from '../../stores/filterStore';
import './Filter.css';

function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const metrosMin = useFilterStore(state => state.metrosMin);
  const metrosMax = useFilterStore(state => state.metrosMax);
  const habitacionesMin = useFilterStore(state => state.habitacionesMin);
  const setMetrosMin = useFilterStore(state => state.setMetrosMin);
  const setMetrosMax = useFilterStore(state => state.setMetrosMax);
  const setHabitacionesMin = useFilterStore(state => state.setHabitacionesMin);
  const clearFilters = useFilterStore(state => state.clearFilters);

  // Cerrar al clicar fuera
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeCount = [metrosMin, metrosMax, habitacionesMin].filter(Boolean).length;

  return (
    <div className="filter-container" ref={ref}>
      <button className="filter-btn" onClick={() => setIsOpen(!isOpen)}>
        Filtros {activeCount > 0 && <span className="filter-count">{activeCount}</span>}
      </button>

      {isOpen && (
        <div className="filter-dropdown">

          {/* Metros cuadrados */}
          <div className="filter-section">
            <label className="filter-section-label">Metros cuadrados</label>
            <div className="filter-row">
              <input
                type="number"
                placeholder="Mín"
                value={metrosMin}
                onChange={(e) => setMetrosMin(e.target.value)}
                className="filter-input"
                min="0"
              />
              <span>—</span>
              <input
                type="number"
                placeholder="Máx"
                value={metrosMax}
                onChange={(e) => setMetrosMax(e.target.value)}
                className="filter-input"
                min="0"
              />
            </div>
          </div>

          {/* Habitaciones */}
          <div className="filter-section">
            <label className="filter-section-label">Habitaciones mínimas</label>
            <select
              value={habitacionesMin}
              onChange={(e) => setHabitacionesMin(e.target.value)}
              className="filter-select"
            >
              <option value="">Cualquiera</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Botones */}
          <div className="filter-actions">
            {activeCount > 0 && (
              <button className="filter-clear" onClick={clearFilters}>Limpiar</button>
            )}
            <button className="filter-apply" onClick={() => setIsOpen(false)}>Aplicar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
