// Este archivo sirve para las queries de la parte de subir una vivienda, subir un anuncio a la pagina

// controladores/anuncios-controlador.js
const db = require('../config/database');

// POST /vender/anuncio
exports.iniciarPublicacion = async (req, res) => {
  const { id_anunciante, tipo_transaccion } = req.body;

  if (!id_anunciante || !tipo_transaccion) {
    return res.status(400).json({ message: 'Se requiere el ID del anunciante y el tipo de transacción.' });
  }

  try {
    // Creamos un registro base con valores mínimos para obtener el ID de la vivienda.
    const sql = `
            INSERT INTO Vivienda (id_anunciante, tipo_transaccion, titulo, ciudad, provincia, precio, direccion, barrio, tipo_vivienda)
            VALUES (?, ?, 'Nuevo Anuncio', 'Pendiente', 'Pendiente', 0.00, 'Pendiente', 'Pendiente', 'piso')
        `;

    const [result] = await db.query(sql, [id_anunciante, tipo_transaccion]);

    res.status(201).json({
      message: 'Anuncio inicial creado. Procede a la edición.',
      id_vivienda: result.insertId
    });

  } catch (error) {
    console.error("Error al iniciar publicación:", error);
    res.status(500).json({ message: 'Error interno del servidor al crear anuncio inicial.' });
  }
};


// PUT /vender/anuncio/:id/info
exports.editarDatosCompletos = async (req, res) => {
  const { id } = req.params;

  const {
    titulo, descripcion, precio, metros_cuadrados, num_habitaciones,
    num_baños, tipo_vivienda, direccion, barrio, ciudad, provincia
  } = req.body;

  const sql = `
        UPDATE Vivienda SET
            titulo = ?, descripcion = ?, precio = ?, metros_cuadrados = ?,
            num_habitaciones = ?, num_baños = ?, tipo_vivienda = ?,
            direccion = ?, barrio = ?, ciudad = ?, provincia = ?
        WHERE id_vivienda = ?
    `;

  const params = [
    titulo, descripcion, precio, metros_cuadrados, num_habitaciones,
    num_baños, tipo_vivienda, direccion, barrio, ciudad, provincia, id
  ];

  try {
    const [result] = await db.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vivienda no encontrada.' });
    }

    res.status(200).json({ message: 'Datos de la vivienda actualizados con éxito.' });
  } catch (error) {
    console.error("Error al editar datos completos:", error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};


// DELETE /anuncios/:id (BORRAR ANUNCIO)
exports.borrarAnuncio = async (req, res) => {
  const { id } = req.params; // ID de la vivienda

  try {
    const sql = `DELETE FROM Vivienda WHERE id_vivienda = ?`;
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vivienda no encontrada.' });
    }
    res.status(200).json({ message: 'Anuncio eliminado con éxito.' });
  } catch (error) {
    console.error("Error al borrar anuncio (Query #11):", error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar.' });
  }
};


// GET /vendedor/:id/lista-anuncios 
exports.listarAnunciosVendedor = async (req, res) => {
  const { id } = req.params;

  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, precio, tipo_transaccion
        FROM Vivienda
        WHERE id_anunciante = ?
        ORDER BY fecha_publicacion DESC`;

  try {
    const [anuncios] = await db.query(sql, [id]);

    if (anuncios.length === 0) {
      return res.status(200).json({ message: 'Este vendedor no tiene anuncios publicados.', data: [] });
    }

    res.status(200).json(anuncios);
  } catch (error) {
    console.error("Error al listar anuncios del vendedor (Query #16):", error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};