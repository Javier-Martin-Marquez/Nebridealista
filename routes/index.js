// Archivo en el que pondremos las rutas del proyecto 

// routes/index.js
const express = require('express');
const router = express.Router();

// Importar Controladores 
const authController = require('../controladores/autentificacion-controlador');
const viviendasController = require('../controladores/viviendas-controlador');
const favoritosController = require('../controladores/favoritos-controlador');

 


// RUTAS PÚBLICAS 

// RUTA BASE DE PRUEBA
router.get('/', (req, res) => {
    res.json({ message: "API NEBRIDEALISTA. Rutas de Auth cargadas." });
});

// 1. AUTENTICACIÓN (Login y Registro)
// POST /registro
router.post('/registro', authController.registro);
// POST /login
router.post('/login', authController.login);

// --- RUTAS DE VIVIENDAS (Mapeo Específico) ---

// 1. /viviendas
router.get('/viviendas', viviendasController.getViviendasGeneral);

// 2. /viviendas/alquiler
router.get('/viviendas/alquiler', viviendasController.getViviendasAlquiler);

// 3. /viviendas/compra 
router.get('/viviendas/compra', viviendasController.getViviendasCompra);

// 4. /viviendas/alquiler/:ciudad
router.get('/viviendas/alquiler/:ciudad', viviendasController.getViviendasAlquilerPorCiudad); 

// 4. /viviendas/compra/:ciudad 
router.get('/viviendas/compra/:ciudad', viviendasController.getViviendasCompraPorCiudad);

// 5. /viviendas/compra/:ciudad/:barrio
router.get('/viviendas/compra/:ciudad/:barrio', viviendasController.getViviendasCompraPorBarrio);

//5. /vivienda/alquiler/:cuidad/:barrio
router.get('/viviendas/alquiler/:ciudad/:barrio', viviendasController.getViviendasAlquilerPorBarrio);

//id.casa
router.get('/viviendas/venta/:ciudad/:barrio/:id', viviendaController.getViviendaPorId);

// POST /favoritos
router.post('/favoritos', favoritosController.addFavorite);

// POST /favoritos/lista
router.post('/favoritos/lista', favoritosController.getFavorites);

module.exports = router;
