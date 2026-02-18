// Archivo para conectarnos a la base de datos
const mysql = require('mysql2/promise'); 

// Configuración de la conexión
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mensaje de prueba de conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection(); 
        console.log('>>> BD conectada correctamente');
        connection.release(); // Liberar la conexión
    } catch (error) {
        // Manejar errores de conexión
        console.error('ERROR CRÍTICO DE CONEXIÓN A LA BASE DE DATOS:', error.message);
    }
}

testConnection();

module.exports = pool;