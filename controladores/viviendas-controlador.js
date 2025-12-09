// Archivo que controla las queries relacionadas con las viviendas, los filtrados y todo eso

// controladores/viviendas-controlador.js
const db = require('../config/database');

// --- 1. LISTADO GENERAL (Sin filtros) ---
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

// --- 2. LISTADO: SOLO ALQUILER ---
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

// --- 3. LISTADO: SOLO COMPRA (Venta) ---
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

// --- LISTADO: Transacción y Ciudad (Ej: /viviendas/alquiler/Madrid) ---
exports.getViviendasDobleFiltro = async (req, res) => {
  // La ciudad y la transacción vendrán de la URL (req.params)
  const { transaccion, ciudad } = req.params;

  // 1. Normalizar los valores antes de usarlos en SQL
  const tipoTransaccion = transaccion.toLowerCase();
  const nombreCiudad = ciudad; // No necesitamos LOWER() si ya usamos el filtro de MySQL

  const sql = `
        SELECT id_vivienda, titulo, ciudad, provincia, barrio, precio, tipo_transaccion, 
               metros_cuadrados, num_habitaciones, num_baños, tipo_vivienda 
        FROM Vivienda
        WHERE tipo_transaccion = ? AND ciudad = ? 
        ORDER BY fecha_publicacion DESC`;

  try {
    // Pasamos los dos parámetros al query
    const [viviendas] = await db.query(sql, [tipoTransaccion, nombreCiudad]);
    res.status(200).json(viviendas);
  } catch (error) {
    console.error("Error al obtener listado por doble filtro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};