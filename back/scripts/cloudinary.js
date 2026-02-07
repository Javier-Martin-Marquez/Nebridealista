require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Carpeta raiz donde estan las imagenes
const carpetaFotos = 'C:/DAW/fotosNebridealista';

async function iniciarCarga() {
  let connection;

  try {
    // Conexion con la base de datos
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    console.log('Conexión a MySQL establecida correctamente.');

    // Leer las subcarpetas
    if (!fs.existsSync(carpetaFotos)) {
      console.error(`Error: La carpeta ${carpetaFotos} no existe.`);
      return;
    }

    const carpetasViviendas = fs.readdirSync(carpetaFotos);

    for (const viviendaId of carpetasViviendas) {
      const rutaCarpeta = path.join(carpetaFotos, viviendaId);
      
      // Solo entramos si es una carpeta (evita archivos sueltos)
      if (fs.lstatSync(rutaCarpeta).isDirectory()) {
        const fotos = fs.readdirSync(rutaCarpeta);
        console.log(`\Vivienda ID ${viviendaId}: Procesando ${fotos.length} fotos...`);

        for (let i = 0; i < fotos.length; i++) {
          const rutaImagen = path.join(rutaCarpeta, fotos[i]);
          const numOrden = i + 1; // Generamos el orden

          // Subir a Cloudinary
          const result = await cloudinary.uploader.upload(rutaImagen, {
            folder: `idealista/vivienda_${viviendaId}`
          });

          // Inserción en la tabla de MySQL
          const sql = 'INSERT INTO Fotos (orden, url_imagen, id_vivienda) VALUES (?, ?, ?)';
          await connection.execute(sql, [numOrden, result.secure_url, viviendaId]);
          
          console.log(` Foto ${numOrden} subida e insertada: ${result.secure_url}`);
        }
      }
    }

    console.log('\n¡PROCESO FINALIZADO! Todas las fotos están en la nube y en la BDD.');

  } catch (error) {
    console.error('\nERROR DURANTE EL PROCESO:');
    console.error(error.message);
  } finally {
    if (connection) await connection.end();
  }
}

iniciarCarga();