const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// AUTENTICACIÓN
router.post('/registro', authController.registro);
router.post('/login', authController.login);

// VIVIENDAS
router.get('/viviendas', viviendasController.getViviendasGeneral);
router.get('/viviendas/destacadas', viviendasController.getViviendasDestacadas);
router.get('/viviendas/alquilar', viviendasController.getViviendasAlquiler);
router.get('/viviendas/comprar', viviendasController.getViviendasCompra);

// FILTROS POR ZONA
router.get('/viviendas/alquiler/:ciudad', viviendasController.getViviendasAlquilerPorCiudad); 
router.get('/viviendas/comprar/:ciudad', viviendasController.getViviendasCompraPorCiudad);
router.get('/viviendas/comprar/:ciudad/:barrio', viviendasController.getViviendasCompraPorBarrio);
router.get('/viviendas/alquiler/:ciudad/:barrio', viviendasController.getViviendasAlquilerPorBarrio);

// DETALLES
router.get('/viviendas/comprar/:ciudad/:barrio/:id', viviendasController.getViviendaCompraPorId);
router.get('/viviendas/alquiler/:ciudad/:barrio/:id', viviendasController.getViviendaAlquilerPorId);

// OTROS
router.post('/vender/anuncio', upload.array('foto', 5), anunciosController.iniciarPublicacion);

router.delete('/anuncios/:id', anunciosController.borrarAnuncio); 
router.get('/vendedor/:id/lista-anuncios', anunciosController.listarAnunciosVendedor);

router.post('/historial/busqueda', historialController.guardarBusqueda);
router.post('/historial/lista', historialController.getHistorial);
router.post('/favoritos', favoritosController.addFavorite);
router.post('/favoritos/lista', favoritosController.getFavorites);

module.exports = router;