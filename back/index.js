// Archivo principal de JavaScript
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Inicializaciones 
const app = express();

// Configuracion del puerto que vamos a utilizar
app.set('port', process.env.PORT || 3000);

app.use(cors());

// Permite que Express lea los cuerpos de las peticiones en formato JSON.
app.use(express.json());

const routes = require('./routes/index');
app.use(routes);

// Iniciar Servidor
app.listen(app.get('port'), () => {
    console.log('>>> Servidor corriendo en puerto', app.get('port'));
});
