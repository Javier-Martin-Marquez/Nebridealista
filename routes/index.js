// Archivo en el que pondremos las rutas del proyecto 

// routes/index.js
const express = require('express');
const router = express.Router();

// Importar Controladores 
const authController = require('../controladores/autentificacion-controlador');
const viviendasController = require('../controladores/viviendas-controlador');
const favoritosController = require('../controladores/favoritos-controlador');
const anunciosController = require('../controladores/anuncios-controlador');


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

// RUTAS DE VIVIENDAS

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

//6. /vivienda/compra/:ciudad/:barrio/:id.casa
router.get('/viviendas/compra/:ciudad/:barrio/:id', viviendasController.getViviendaCompraPorId);

//6. /vivienda/alquiler/:ciudad/:barrio/:id.casa
router.get('/viviendas/alquiler/:ciudad/:barrio/:id', viviendasController.getViviendaAlquilerPorId);


// RUTAS PARA PUBLICAR UN ANUNCIO, SUBIR UNA VIVIENDA

// RUTA INFORMATIVA 
router.get('/vender', (req, res) => {
    res.json({ message: "¡Bienvenido! En esta página podrás iniciar el proceso para publicar tu anuncio." });
});

// Crea el anuncio base
router.post('/vender/anuncio', anunciosController.iniciarPublicacion); 

// Actualiza todos los datos
router.put('/vender/anuncio/:id/info', anunciosController.editarDatosCompletos); 

// Borrar un anuncio
router.delete('/anuncios/:id', anunciosController.borrarAnuncio); 

// Listar anuncios propios del vendedor
router.get('/vendedor/:id/lista-anuncios', anunciosController.listarAnunciosVendedor);


// POST /favoritos
router.post('/favoritos', favoritosController.addFavorite);

// POST /favoritos/lista
router.post('/favoritos/lista', favoritosController.getFavorites);

module.exports = router;
