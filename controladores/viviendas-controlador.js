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