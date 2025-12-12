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


  // --- DETALLE: Ver una vivienda específica por ID (validando barrio y ciudad) ---
exports.getViviendaPorId = async (req, res) => {
  // Recogemos los 3 datos de la URL. 
  // NOTA: Asegúrate de que en tu ruta usas :id (o cambia 'id' aquí por el nombre que uses)
  const { ciudad, barrio, id } = req.params; 

  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda,
               descripcion, fecha_publicacion 
        FROM Vivienda
        WHERE id_vivienda = ? 
          AND ciudad = ? 
          AND barrio = ?`;

  try {
    // Pasamos los parámetros en el orden exacto de los '?'
    const [result] = await db.query(sql, [id, ciudad, barrio]);
    
    // Si el array está vacío, es que no existe esa casa en ese barrio
    if (result.length === 0) {
        return res.status(404).json({ message: "No se encontró la vivienda especificada." });
    }

    // EXITO: Devolvemos result[0] porque al buscar por ID solo queremos UN objeto, no un array
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error al obtener el detalle de la vivienda:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};