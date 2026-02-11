// Archivo que sirve para controlar las queries que tienen que ver con el usuario, el login, registro etc

// controladores/autentificacion-controlador.js
const db = require('../config/database'); // Conexión a la BDD

// Lógica de Registro
exports.registro = async (req, res) => {
  const { nombre, email, telefono, contraseña } = req.body;

  if (!email || !contraseña || !nombre) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const sql = `INSERT INTO Usuarios (nombre, email, telefono, contraseña) 
                     VALUES (?, ?, ?, ?)`;

    await db.query(sql, [nombre, email, telefono, contraseña]);

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }
    console.error("Error en el registro:", error);
    res.status(500).json({ message: 'Error interno del servidor al registrar.' });
  }
};

// Lógica de Login
exports.login = async (req, res) => {
  const { email, contraseña } = req.body;

  const sql = `SELECT id_usuario, nombre, contraseña 
                 FROM Usuarios WHERE email = ?`;

  try {
    const [rows] = await db.query(sql, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isMatch = (user.contraseña === contraseña);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    res.json({
      message: "Login exitoso",
      user: { id: user.id_usuario, nombre: user.nombre }
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: 'Error interno del servidor al iniciar sesión.' });
  }
};