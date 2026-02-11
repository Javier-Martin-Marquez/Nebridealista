// Archivo en el que pondremos las rutas del proyecto 

// routes/index.js
const express = require('express');
const router = express.Router();

// Importar Controladores 
const authController = require('../controladores/autentificacion-controlador');
const viviendasController = require('../controladores/viviendas-controlador');
const favoritosController = require('../controladores/favoritos-controlador');
const anunciosController = require('../controladores/anuncios-controlador');
const historialController = require('../controladores/historial-controlador');

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

router.get('/viviendas/destacadas', viviendasController.getViviendasDestacadas);

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

// Esta es la única que necesitas para crear la casa ahora:
router.post('/vender/anuncio', anunciosController.iniciarPublicacion);

// Borrar un anuncio
router.delete('/anuncios/:id', anunciosController.borrarAnuncio); 

// Listar anuncios propios del vendedor
router.get('/vendedor/:id/lista-anuncios', anunciosController.listarAnunciosVendedor);


// RUTAS AGREGADAS: HISTORIAL DE BÚSQUEDA
// POST /historial/busqueda (Guarda la búsqueda realizada por el usuario)
router.post('/historial/busqueda', historialController.guardarBusqueda);

// POST /historial/lista (Recupera el historial de búsquedas del usuario)
router.post('/historial/lista', historialController.getHistorial);

// POST /favoritos
router.post('/favoritos', favoritosController.addFavorite);

// POST /favoritos/lista
router.post('/favoritos/lista', favoritosController.getFavorites);

module.exports = router;
