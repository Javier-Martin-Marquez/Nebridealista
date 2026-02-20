const db = require('../config/database');
const cloudinary = require('cloudinary').v2;

// CONFIGURACIÓN DE CLOUDINARY (Añadido para que no de error de api_key)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// POST /vender/anuncio
exports.iniciarPublicacion = async (req, res) => {
    const { 
        id_anunciante, titulo, descripcion, descripcion_detallada, direccion, barrio, 
        ciudad, provincia, precio, tipo_transaccion, 
        metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
    } = req.body;

    const fotos = req.files;

    try {
        const sqlVivienda = `
            INSERT INTO Vivienda (
                id_anunciante, titulo, descripcion, descripcion_detallada, direccion, barrio, 
                ciudad, provincia, precio, tipo_transaccion, 
                metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sqlVivienda, [
            id_anunciante, titulo, descripcion, descripcion_detallada, direccion, barrio, 
            ciudad, provincia, precio, tipo_transaccion, 
            metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda
        ]);

        const id_vivienda = result.insertId;

        if (fotos && fotos.length > 0) {
            for (let i = 0; i < fotos.length; i++) {
                const file = fotos[i];
                const b64 = Buffer.from(file.buffer).toString("base64");
                const dataURI = "data:" + file.mimetype + ";base64," + b64;

                const uploadRes = await cloudinary.uploader.upload(dataURI, {
                    folder: `idealista/vivienda_${id_vivienda}`,
                });

                const sqlFoto = `INSERT INTO fotos (id_vivienda, url_imagen, orden) VALUES (?, ?, ?)`;
                await db.query(sqlFoto, [id_vivienda, uploadRes.secure_url, i + 1]);
            }
        }

        res.status(201).json({
            message: '¡Propiedad y fotos publicadas con éxito!',
            id_vivienda: id_vivienda
        });

    } catch (error) {
        console.error("Error al publicar:", error);
        res.status(500).json({ message: 'Error interno al guardar el anuncio.' });
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
    console.error("Error al borrar anuncio:", error);
    res.status(500).json({ message: 'Error interno del servidor.' });
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