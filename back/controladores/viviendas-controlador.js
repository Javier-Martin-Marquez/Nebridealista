// Archivo que controla las queries relacionadas con las viviendas, los filtrados y todo eso

// controladores/viviendas-controlador.js
const db = require('../config/database');

// LISTADO GENERAL (Sin filtros) 
exports.getViviendasGeneral = async (req, res) => {
  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
        FROM Vivienda
        ORDER BY fecha_publicacion DESC`;

  try {
    const [viviendas] = await db.query(sql);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error al obtener listado general:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// LISTADO: SOLO ALQUILER 
exports.getViviendasAlquiler = async (req, res) => {
  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
        FROM Vivienda
        WHERE tipo_transaccion = 'alquiler'
        ORDER BY fecha_publicacion DESC`;

  try {
    const [viviendas] = await db.query(sql);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error al obtener listado de alquiler:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// LISTADO: SOLO COMPRA (Venta) 
exports.getViviendasCompra = async (req, res) => {
  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
        FROM Vivienda
        WHERE tipo_transaccion = 'venta'
        ORDER BY fecha_publicacion DESC`;

  try {
    const [viviendas] = await db.query(sql);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error al obtener listado de compra:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// LISTADO: Comprar (Venta) por Ciudad 
exports.getViviendasCompraPorCiudad = async (req, res) => {
  const { ciudad } = req.params;

  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
        FROM Vivienda
        WHERE tipo_transaccion = 'venta' AND ciudad = ? 
        ORDER BY fecha_publicacion DESC`;

  try {
    const [viviendas] = await db.query(sql, [ciudad]);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error al obtener listado de compra por ciudad:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// --- LISTADO: Alquiler por Ciudad ---
exports.getViviendasAlquilerPorCiudad = async (req, res) => {
  const { ciudad } = req.params;

  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
        FROM Vivienda
        WHERE tipo_transaccion = 'alquiler' AND ciudad = ? 
        ORDER BY fecha_publicacion DESC`;

  try {
    const [viviendas] = await db.query(sql, [ciudad]);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error al obtener listado de alquiler por ciudad:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

  // --- LISTADO: Comprar (Venta) por Ciudad y Barrio ---
  exports.getViviendasCompraPorBarrio = async (req, res) => {
    const { ciudad, barrio } = req.params; 

    const sql = `
          SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
                metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
          FROM Vivienda
          WHERE tipo_transaccion = 'venta' 
            AND ciudad = ? 
            AND barrio = ?
          ORDER BY fecha_publicacion DESC`;

    try {
      const [viviendas] = await db.query(sql, [ciudad, barrio]);
      
      if (viviendas.length === 0) {
          return res.status(404).json({ message: "No se encontraron viviendas en este barrio." });
      }

      res.status(200).json(viviendas);
    } catch (error) {
      console.error("Error al obtener listado de compra por barrio:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  };

  // --- LISTADO: Alquiler por Ciudad y Barrio ---
  exports.getViviendasAlquilerPorBarrio = async (req, res) => {
    const { ciudad, barrio } = req.params;

    const sql = `
          SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
                metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
          FROM Vivienda
          WHERE tipo_transaccion = 'alquiler' 
            AND ciudad = ? 
            AND barrio = ?
          ORDER BY fecha_publicacion DESC`;

    try {
      const [viviendas] = await db.query(sql, [ciudad, barrio]);

      if (viviendas.length === 0) {
          return res.status(404).json({ message: "No se encontraron viviendas en este barrio." });
      }

      res.status(200).json(viviendas);
    } catch (error) {
      console.error("Error al obtener listado de alquiler por barrio:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  };


  // --- DETALLE: Ver vivienda en VENTA por ID (con ciudad y barrio) ---
exports.getViviendaCompraPorId = async (req, res) => {
  const { ciudad, barrio, id } = req.params; 

  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda, descripcion
        FROM Vivienda
        WHERE id_vivienda = ? 
          AND ciudad = ? 
          AND barrio = ?
          AND tipo_transaccion = 'venta'`;

  try {
    // El orden de los interrogantes (?) importa: id, ciudad, barrio
    const [result] = await db.query(sql, [id, ciudad, barrio]);
    
    if (result.length === 0) {
        return res.status(404).json({ message: "No se encontró esta vivienda en venta." });
    }

    // Devolvemos solo el primer elemento porque el ID es único
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error al obtener el detalle de venta:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// --- DETALLE: Ver vivienda en ALQUILER por ID (con ciudad y barrio) ---
exports.getViviendaAlquilerPorId = async (req, res) => {
  const { ciudad, barrio, id } = req.params;

  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda, descripcion
        FROM Vivienda
        WHERE id_vivienda = ? 
          AND ciudad = ? 
          AND barrio = ?
          AND tipo_transaccion = 'alquiler'`;

  try {
    const [result] = await db.query(sql, [id, ciudad, barrio]);
    
    if (result.length === 0) {
        return res.status(404).json({ message: "No se encontró esta vivienda en alquiler." });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error al obtener el detalle de alquiler:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// controladores/viviendas-controlador.js

exports.getViviendasDestacadas = async (req, res) => {
  const tipo = req.query.tipo || 'venta'; 

  try {
    const [recientes] = await db.query(`
      SELECT v.id_vivienda, v.titulo, f.url_imagen 
      FROM Vivienda v 
      LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1 
      WHERE v.tipo_transaccion = ?
      ORDER BY v.fecha_publicacion DESC LIMIT 2`, [tipo]);

    const [masBuscada] = await db.query(`
      SELECT v.id_vivienda, v.titulo, f.url_imagen, COUNT(b.id_vivienda) as total
      FROM Vivienda v
      JOIN Busquedas b ON v.id_vivienda = b.id_vivienda
      LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1
      WHERE v.tipo_transaccion = ?
      GROUP BY v.id_vivienda 
      ORDER BY total DESC LIMIT 1`, [tipo]);

    const [masFavorita] = await db.query(`
      SELECT v.id_vivienda, v.titulo, f.url_imagen, COUNT(fav.id_vivienda) as total
      FROM Vivienda v
      JOIN Favoritos fav ON v.id_vivienda = fav.id_vivienda
      LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1
      WHERE v.tipo_transaccion = ?
      GROUP BY v.id_vivienda 
      ORDER BY total DESC LIMIT 1`, [tipo]);

    res.status(200).json({
      recientes,
      masBuscada: masBuscada[0] || null,
      masFavorita: masFavorita[0] || null
    });

  } catch (error) {
    console.error("Error en getViviendasDestacadas:", error);
    res.status(500).json({ message: "Error al obtener las casas destacadas" });
  }
};