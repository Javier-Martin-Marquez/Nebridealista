const express = require('express');
const router = express.Router();

// Importar Controladores 
const authController = require('../controladores/autentificacion-controlador');
const viviendasController = require('../controladores/viviendas-controlador');
const favoritosController = require('../controladores/favoritos-controlador');
const anunciosController = require('../controladores/anuncios-controlador');
const historialController = require('../controladores/historial-controlador');

// RUTAS PÚBLICAS 
router.get('/', (req, res) => {
    res.json({ message: "API NEBRIDEALISTA funcionando." });
});

// 1. AUTENTICACIÓN
router.post('/registro', authController.registro);
router.post('/login', authController.login);

// 2. VIVIENDAS (LISTADOS)
router.get('/viviendas', viviendasController.getViviendasGeneral);
router.get('/viviendas/destacadas', viviendasController.getViviendasDestacadas);
router.get('/viviendas/alquilar', viviendasController.getViviendasAlquiler);
router.get('/viviendas/comprar', viviendasController.getViviendasCompra);

// 3. FILTROS POR ZONA
router.get('/viviendas/alquilar/:ciudad', viviendasController.getViviendasAlquilerPorCiudad); 
router.get('/viviendas/comprar/:ciudad', viviendasController.getViviendasCompraPorCiudad);
router.get('/viviendas/comprar/:ciudad/:barrio', viviendasController.getViviendasCompraPorBarrio);
router.get('/viviendas/alquilar/:ciudad/:barrio', viviendasController.getViviendasAlquilerPorBarrio);

// 4. DETALLES (RUTAS EN ESPAÑOL COMO HAS PEDIDO)
router.get('/viviendas/comprar/:ciudad/:barrio/:id', viviendasController.getViviendaCompraPorId);
router.get('/viviendas/alquilar/:ciudad/:barrio/:id', viviendasController.getViviendaAlquilerPorId);

// 5. OTROS
router.post('/vender/anuncio', anunciosController.iniciarPublicacion);
router.post('/historial/busqueda', historialController.guardarBusqueda);
router.post('/favoritos', favoritosController.addFavorite);
router.post('/favoritos/lista', favoritosController.getFavorites);

module.exports = router;