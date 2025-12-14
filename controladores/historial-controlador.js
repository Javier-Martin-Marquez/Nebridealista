// Sirve para controlar las queries que tengan que ver con las busquedas

// controladores/historial-controlador.js
const db = require('../config/database');

// GUARDAR UNA BÚSQUEDA (POST /historial/busqueda) 
exports.guardarBusqueda = async (req, res) => {
  const { id_usuario, termino_busqueda } = req.body;

  if (!id_usuario || !termino_busqueda) {
    return res.status(400).json({ message: 'Faltan el ID de usuario o el término de búsqueda.' });
  }

  try {
    const sql = `INSERT INTO Busquedas (id_usuario, termino_busqueda) VALUES (?, ?)`;

    await db.query(sql, [id_usuario, termino_busqueda]);

    res.status(201).json({
      message: 'Búsqueda registrada correctamente en el historial.',
      id_usuario: id_usuario,
      termino: termino_busqueda
    });
  } catch (error) {
    console.error("Error al guardar búsqueda:", error);
    res.status(500).json({ message: 'Error interno del servidor al guardar la búsqueda.' });
  }
};

// OBTENER EL HISTORIAL (POST /historial/lista)
exports.getHistorial = async (req, res) => {
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ message: 'Se requiere el ID de usuario para ver el historial.' });
  }

  const sql = `
        SELECT termino_busqueda, fecha_busqueda 
        FROM Busquedas 
        WHERE id_usuario = ? 
        ORDER BY fecha_busqueda DESC
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