// Sirve para controlar las queries que tengan que ver con los favoritos

// controladores/favoritos-controlador.js
const db = require('../config/database');

// Query #7: Añadir una vivienda a favoritos (INSERT)
exports.addFavorite = async (req, res) => {
  // El ID de usuario y vivienda vienen del cuerpo de la petición (POST body)
  const { id_vivienda, id_usuario } = req.body;

  if (!id_vivienda || !id_usuario) {
    return res.status(400).json({ message: 'Se requiere el ID de vivienda y el ID de usuario.' });
  }

  try {
    // La consulta SQL inserta la relación usuario-vivienda
    const sql = `INSERT INTO Favoritos (id_usuario, id_vivienda) VALUES (?, ?)`;
    await db.query(sql, [id_usuario, id_vivienda]);

    res.status(201).json({ message: 'Vivienda añadida a favoritos.' });

  } catch (error) {
    // Capturar Error 1062 (Entrada Duplicada: Si el usuario ya la tiene en favoritos)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Esta vivienda ya está en tus favoritos.' });
    }
    console.error("Error al añadir favorito:", error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Query #8: Listar los favoritos del usuario (SELECT con JOIN)
exports.getFavorites = async (req, res) => {
  // El ID de usuario viene del cuerpo de la petición (POST body)
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ message: 'Se requiere el ID de usuario.' });
  }

  // La consulta usa JOIN para obtener los datos de la vivienda que está en la tabla Favoritos
  const sql = `
        SELECT v.id_vivienda, v.titulo, v.ciudad, v.precio, v.tipo_transaccion
        FROM Favoritos f
        INNER JOIN Vivienda v ON f.id_vivienda = v.id_vivienda
        WHERE f.id_usuario = ?
        ORDER BY f.fecha_guardado DESC`;

  try {
    const [favoritos] = await db.query(sql, [id_usuario]);

    if (favoritos.length === 0) {
      return res.status(200).json({ message: 'No tienes viviendas guardadas en favoritos.', data: [] });
    }

    res.status(200).json(favoritos);

  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};