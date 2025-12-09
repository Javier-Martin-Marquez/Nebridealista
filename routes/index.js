// Archivo en el que pondremos las rutas del proyecto 

// routes/index.js
const express = require('express');
const router = express.Router();

// --- Importar Controladores ---
const authController = require('../controladores/autentificacion-controlador');
const viviendasController = require('../controladores/viviendas-controlador');
// NOTA: Recuerda que necesitas crear el archivo 'viviendas-controlador.js'

// --- RUTAS PÚBLICAS ---

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

// 1. /viviendas (Listado General)
router.get('/viviendas', viviendasController.getViviendasGeneral); 

// 2. /viviendas/alquiler (Tu solicitud de listado #1)
router.get('/viviendas/alquiler', viviendasController.getViviendasAlquiler); 

// 3. /viviendas/compra (Tu solicitud de listado #2)
router.get('/viviendas/compra', viviendasController.getViviendasCompra); 

// 4. /viviendas/:transaccion/:ciudad (Tu solicitud de doble filtro)
router.get('/viviendas/:transaccion/:ciudad', viviendasController.getViviendasDobleFiltro); // <-- NUEVA RUTA

module.exports = router;
