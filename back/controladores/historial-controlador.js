// Sirve para controlar las queries que tengan que ver con las busquedas

// controladores/historial-controlador.js
const db = require('../config/database');

// GUARDAR UNA BÚSQUEDA (POST /historial/busqueda) 
exports.guardarBusqueda = async (req, res) => {
  const { id_usuario, id_vivienda } = req.body;

  try {
    const [exist] = await db.query('SELECT * FROM Busquedas WHERE id_usuario = ? AND id_vivienda = ?', [id_usuario, id_vivienda]);

    if (exist.length > 0) {
      await db.query('DELETE FROM Busquedas WHERE id_usuario = ? AND id_vivienda = ?', [id_usuario, id_vivienda]);
      return res.status(200).json({ message: 'Vivienda desmarcada', action: 'deleted' });
    } else {
      await db.query('INSERT INTO Busquedas (id_usuario, id_vivienda) VALUES (?, ?)', [id_usuario, id_vivienda]);
      return res.status(201).json({ message: 'Vivienda guardada', action: 'added' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al gestionar guardados' });
  }
};

// OBTENER EL HISTORIAL (POST /historial/lista)
exports.getHistorial = async (req, res) => {
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ message: 'Se requiere el ID de usuario para ver el historial.' });
  }

  const sql = `
    SELECT v.*, b.fecha_busqueda 
    FROM Vivienda v
    INNER JOIN Busquedas b ON v.id_vivienda = b.id_vivienda
    WHERE b.id_usuario = ?
    ORDER BY b.fecha_busqueda DESC
    LIMIT 10`;

  try {
    const [historial] = await db.query(sql, [id_usuario]);

    if (historial.length === 0) {
      return res.status(200).json({ message: 'El historial de búsquedas está vacío para este usuario.', data: [] });
    }

    res.status(200).json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ message: 'Error interno del servidor al recuperar el historial.' });
  }
};