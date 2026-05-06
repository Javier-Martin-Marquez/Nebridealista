// Sirve para controlar las queries que tienen que ver con el chat

// controladores/chat-controlador.js
const db = require('../config/database');

// OBTENER MENSAJES DE UNA CONVERSACIÓN (POST /chat/mensajes)
exports.getMensajes = async (req, res) => {
  const { id_vivienda, id_usuario } = req.body;

  if (!id_vivienda || !id_usuario) {
    return res.status(400).json({ message: 'Se requiere id_vivienda e id_usuario.' });
  }

  const sql = `
    SELECT m.*, e.nombre AS nombre_emisor
    FROM Mensajes m
    INNER JOIN Usuarios e ON m.id_emisor = e.id_usuario
    WHERE m.id_vivienda = ?
      AND (m.id_emisor = ? OR m.id_receptor = ?)
    ORDER BY m.fecha_envio ASC`;

  try {
    const [mensajes] = await db.query(sql, [id_vivienda, id_usuario, id_usuario]);
    res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// OBTENER LISTA DE CONVERSACIONES DEL USUARIO (POST /chat/conversaciones)
exports.getConversaciones = async (req, res) => {
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ message: 'Se requiere id_usuario.' });
  }

  const sql = `
    SELECT 
      m.id_vivienda,
      v.titulo AS titulo_vivienda,
      CASE 
        WHEN m.id_emisor = ? THEN m.id_receptor 
        ELSE m.id_emisor 
      END AS id_otro_usuario,
      u.nombre AS nombre_otro_usuario,
      m.mensaje AS ultimo_mensaje,
      m.fecha_envio AS ultima_fecha
    FROM Mensajes m
    INNER JOIN (
      SELECT id_vivienda,
        CASE WHEN id_emisor = ? THEN id_receptor ELSE id_emisor END AS otro,
        MAX(fecha_envio) AS max_fecha
      FROM Mensajes
      WHERE id_emisor = ? OR id_receptor = ?
      GROUP BY id_vivienda, otro
    ) ult ON m.id_vivienda = ult.id_vivienda AND m.fecha_envio = ult.max_fecha
    INNER JOIN Vivienda v ON m.id_vivienda = v.id_vivienda
    INNER JOIN Usuarios u ON ult.otro = u.id_usuario
    WHERE (m.id_emisor = ? OR m.id_receptor = ?)
    GROUP BY m.id_vivienda, id_otro_usuario
    ORDER BY ultima_fecha DESC`;

  try {
    const [conversaciones] = await db.query(sql, [id_usuario, id_usuario, id_usuario, id_usuario, id_usuario, id_usuario]);
    res.status(200).json(conversaciones);
  } catch (error) {
    console.error("Error al obtener conversaciones:", error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
