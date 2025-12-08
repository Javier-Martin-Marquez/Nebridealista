// Archivo para conectarnos a la base de datos
const mysql = require('mysql2/promise'); 

// Configuración de la conexión (Hardcodeada, según tu petición)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'db_nebridealista',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mensaje de prueba de conexión (Usando async/await)
async function testConnection() {
    try {
        const connection = await pool.getConnection(); // Obtener una conexión
        console.log('>>> BD conectada correctamente');
        connection.release(); // Liberar la conexión
    } catch (error) {
        // Manejar errores de conexión de forma centralizada
        console.error('❌ ERROR CRÍTICO DE CONEXIÓN A LA BASE DE DATOS:', error.message);
    }
}

testConnection();

// Exportamos el pool directamente. En los controladores, usaremos:
// const [rows] = await pool.query(sql, values);
module.exports = pool;