// Archivo principal de JavaScript
const express = require('express');
const cors = require('cors');

// Inicializaciones 
const app = express();

// Configuracion del puerto que vamos a utilizar
app.set('port', process.env.PORT || 3000);

// 1. CORS: Permite que navegadores de otros dominios accedan a la API.
app.use(cors());

// 2. Express.json: Permite que Express lea los cuerpos de las peticiones en formato JSON.
app.use(express.json());

// Importamos las rutas desde la carpeta routes, porque es una buena practica
const routes = require('./routes/index');
app.use(routes);

// Iniciar Servidor
app.listen(app.get('port'), () => {
    console.log('>>> Servidor corriendo en puerto', app.get('port'));
});
