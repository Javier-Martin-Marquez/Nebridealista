// Configuración de Socket.io para el chat

const db = require('./database');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('>>> Usuario conectado al chat:', socket.id);

    // El usuario se une a una sala específica (conversación sobre una vivienda)
    socket.on('unirse_sala', (sala) => {
      socket.join(sala);
      console.log(`Socket ${socket.id} se unió a la sala: ${sala}`);
    });

    // Recibir y reenviar mensaje
    socket.on('enviar_mensaje', async (data) => {
      const { id_vivienda, id_emisor, id_receptor, mensaje } = data;

      try {
        // Guardar en la base de datos
        const sql = `INSERT INTO Mensajes (id_vivienda, id_emisor, id_receptor, mensaje) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(sql, [id_vivienda, id_emisor, id_receptor, mensaje]);

        // Crear el objeto del mensaje con la fecha
        const mensajeCompleto = {
          id_mensaje: result.insertId,
          id_vivienda,
          id_emisor,
          id_receptor,
          mensaje,
          fecha_envio: new Date()
        };

        // Enviar a todos los de la sala (incluido el emisor)
        io.to(data.sala).emit('nuevo_mensaje', mensajeCompleto);

      } catch (error) {
        console.error('Error al guardar mensaje:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('>>> Usuario desconectado del chat:', socket.id);
    });
  });
};
