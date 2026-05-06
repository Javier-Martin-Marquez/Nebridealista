// Archivo principal de JavaScript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Inicializaciones 
const app = express();

// Configuracion del puerto que vamos a utilizar
app.set('port', process.env.PORT || 3000);

app.use(cors());

// Permite que Express lea los cuerpos de las peticiones en formato JSON.
app.use(express.json());

const routes = require('./routes/index');
app.use(routes);

// Crear servidor HTTP y configurar Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Configurar la lógica del chat
require('./config/socket')(io);

// Iniciar Servidor
server.listen(app.get('port'), () => {
    console.log('>>> Servidor corriendo en puerto', app.get('port'));
});
