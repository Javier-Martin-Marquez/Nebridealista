// Este archivo sirve para las queries de la parte de subir una vivienda, subir un anuncio a la pagina

// controladores/anuncios-controlador.js
const db = require('../config/database');

// POST /vender/anuncio - Versión Unificada (Un solo paso)
exports.iniciarPublicacion = async (req, res) => {
    const { 
        id_anunciante, titulo, descripcion, direccion, barrio, 
        ciudad, provincia, precio, tipo_transaccion, 
        metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
    } = req.body;

    // Validación de campos obligatorios según tu SQL
    if (!id_anunciante || !titulo || !direccion || !precio || !tipo_transaccion || !tipo_vivienda) {
        return res.status(400).json({ message: 'Faltan campos obligatorios para publicar el anuncio.' });
    }

    try {
        const sql = `
            INSERT INTO Vivienda (
                id_anunciante, titulo, descripcion, direccion, barrio, 
                ciudad, provincia, precio, tipo_transaccion, 
                metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            id_anunciante, titulo, descripcion, direccion, barrio, 
            ciudad, provincia, precio, tipo_transaccion, 
            metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda
        ]);

        res.status(201).json({
            message: '¡Anuncio publicado con éxito!',
            id_vivienda: result.insertId
        });

    } catch (error) {
        console.error("Error al publicar vivienda:", error);
        res.status(500).json({ message: 'Error interno del servidor al guardar la vivienda.' });
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