const db = require('../config/database');

// LISTADO GENERAL
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

// LISTADO: SOLO ALQUILAR
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
    res.status(500).json({ message: "Error al obtener listado de alquiler." });
  }
};

// LISTADO: SOLO COMPRAR (Venta)
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
    res.status(500).json({ message: "Error al obtener listado de compra." });
  }
};

// FILTRO: COMPRAR POR CIUDAD
exports.getViviendasCompraPorCiudad = async (req, res) => {
  const { ciudad } = req.params;
  const sql = `
    SELECT v.*, f.url_imagen 
    FROM Vivienda v 
    LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1 
    WHERE v.tipo_transaccion = 'venta' AND LOWER(v.ciudad) = LOWER(?)`;
  
  try {
    const [viviendas] = await db.query(sql, [ciudad]);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error en getViviendasCompraPorCiudad:", error);
    res.status(500).json({ message: "Error por ciudad." });
  }
};

// FILTRO: ALQUILAR POR CIUDAD
exports.getViviendasAlquilerPorCiudad = async (req, res) => {
  const { ciudad } = req.params;
  const sql = `
    SELECT v.*, f.url_imagen 
    FROM Vivienda v 
    LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1 
    WHERE v.tipo_transaccion = 'alquiler' AND LOWER(v.ciudad) = LOWER(?)`;
  
  try {
    const [viviendas] = await db.query(sql, [ciudad]);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error en getViviendasAlquilerPorCiudad:", error);
    res.status(500).json({ message: "Error por ciudad." });
  }
};

// FILTRO: COMPRAR POR BARRIO
exports.getViviendasCompraPorBarrio = async (req, res) => {
  const { ciudad, barrio } = req.params;
  const sql = `
    SELECT v.*, f.url_imagen 
    FROM Vivienda v 
    LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1 
    WHERE v.tipo_transaccion = 'venta' AND LOWER(v.ciudad) = LOWER(?) AND LOWER(v.barrio) = LOWER(?)`;
  
  try {
    const [viviendas] = await db.query(sql, [ciudad, barrio]);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error en getViviendasCompraPorBarrio:", error);
    res.status(500).json({ message: "Error por barrio." });
  }
};

// FILTRO: ALQUILAR POR BARRIO
exports.getViviendasAlquilerPorBarrio = async (req, res) => {
  const { ciudad, barrio } = req.params;
  const sql = `
    SELECT v.*, f.url_imagen 
    FROM Vivienda v 
    LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1 
    WHERE v.tipo_transaccion = 'alquiler' AND LOWER(v.ciudad) = LOWER(?) AND LOWER(v.barrio) = LOWER(?)`;
  
  try {
    const [viviendas] = await db.query(sql, [ciudad, barrio]);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error en getViviendasAlquilerPorBarrio:", error);
    res.status(500).json({ message: "Error por barrio." });
  }
};

// DETALLE: VER VIVIENDA EN COMPRAR (Venta) POR ID
exports.getViviendaCompraPorId = async (req, res) => {
  const { ciudad, barrio, id } = req.params;

  const sqlVivienda = `
        SELECT * FROM Vivienda
        WHERE id_vivienda = ? 
          AND LOWER(ciudad) = LOWER(?) 
          AND LOWER(barrio) = LOWER(?)
          AND tipo_transaccion = 'venta'`;

  try {
    const [result] = await db.query(sqlVivienda, [id, ciudad, barrio]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontró esta vivienda en venta." });
    }

    const vivienda = result[0];

    const [fotos] = await db.query(
      'SELECT url_imagen FROM fotos WHERE id_vivienda = ? ORDER BY orden ASC',
      [id]
    );

    vivienda.fotos = fotos.map(f => f.url_imagen);
    res.status(200).json(vivienda);
  } catch (error) {
    console.error("Error en detalle compra:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// DETALLE: VER VIVIENDA EN ALQUILAR POR ID
exports.getViviendaAlquilerPorId = async (req, res) => {
  const { ciudad, barrio, id } = req.params;

  // Ajuste para que busque 'alquiler' aunque la ruta sea 'alquilar'
  const sqlVivienda = `
        SELECT * FROM Vivienda
        WHERE id_vivienda = ? 
          AND LOWER(ciudad) = LOWER(?) 
          AND LOWER(barrio) = LOWER(?)
          AND tipo_transaccion = 'alquiler'`;

  try {
    const [result] = await db.query(sqlVivienda, [id, ciudad, barrio]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontró esta vivienda en alquiler." });
    }

    const vivienda = result[0];

    const [fotos] = await db.query(
      'SELECT url_imagen FROM fotos WHERE id_vivienda = ? ORDER BY orden ASC',
      [id]
    );

    vivienda.fotos = fotos.map(f => f.url_imagen);
    res.status(200).json(vivienda);
  } catch (error) {
    console.error("Error en detalle alquiler:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// DESTACADAS
exports.getViviendasDestacadas = async (req, res) => {
  let tipo = req.query.tipo || 'venta'; 

  // Normalizamos el tipo para que coincida con la base de datos
  if (tipo === 'comprar') tipo = 'venta';
  if (tipo === 'alquilar') tipo = 'alquiler';

  try {
    const [recientes] = await db.query(`
      SELECT v.id_vivienda, v.titulo, v.ciudad, v.barrio, v.tipo_transaccion, f.url_imagen 
      FROM Vivienda v 
      LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1 
      WHERE v.tipo_transaccion = ?
      ORDER BY v.fecha_publicacion DESC LIMIT 2`, [tipo]);

    const [masBuscada] = await db.query(`
      SELECT v.id_vivienda, v.titulo, v.ciudad, v.barrio, v.tipo_transaccion, f.url_imagen, COUNT(b.id_vivienda) as total
      FROM Vivienda v
      JOIN Busquedas b ON v.id_vivienda = b.id_vivienda
      LEFT JOIN fotos f ON v.id_vivienda = f.id_vivienda AND f.orden = 1
      WHERE v.tipo_transaccion = ?
      GROUP BY v.id_vivienda 
      ORDER BY total DESC LIMIT 1`, [tipo]);

    const [masFavorita] = await db.query(`
      SELECT v.id_vivienda, v.titulo, v.ciudad, v.barrio, v.tipo_transaccion, f.url_imagen, COUNT(fav.id_vivienda) as total
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