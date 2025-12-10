// Archivo que sirve para controlar las queries que tienen que ver con el usuario, el login, registro etc

// controladores/autentificacion-controlador.js
const db = require('../config/database'); // Conexión a la BDD

// Lógica de Registro (Query #1: INSERT de contraseña en texto plano)
exports.registro = async (req, res) => {
  // Nota: El tipo_usuario debe ser 'comprador' o 'vendedor', etc.
  const { nombre, email, telefono, contraseña, tipo_usuario } = req.body;

  if (!email || !contraseña || !nombre || !tipo_usuario) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // 1. Ejecutar la Query #1 (INSERT en la BDD)
    const sql = `INSERT INTO Usuarios (nombre, email, telefono, contraseña, tipo_usuario) 
                     VALUES (?, ?, ?, ?, ?)`;

    // La contraseña se inserta como texto plano.
    await db.query(sql, [nombre, email, telefono, contraseña, tipo_usuario]);

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }
    console.error("Error en el registro:", error);
    res.status(500).json({ message: 'Error interno del servidor al registrar.' });
  }
};

// Lógica de Login (Query #2: SELECT y comparación directa)
exports.login = async (req, res) => {
  const { email, contraseña } = req.body;

  // 1. Ejecutar Query #2 (Recuperar la contraseña en texto plano guardada en la BDD)
  // Se selecciona la columna 'contraseña' tal cual.
  const sql = `SELECT id_usuario, nombre, tipo_usuario, contraseña 
                 FROM Usuarios WHERE email = ?`;

  try {
    const [rows] = await db.query(sql, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 2. Comparación directa (MUY INSEGURO, pero funcional para la prueba)
    const isMatch = (user.contraseña === contraseña);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 3. Ya que no usamos JWT, simplemente devolvemos los datos del usuario.
    res.json({
      message: "Login exitoso (sin token de sesión)",
      user: { id: user.id_usuario, nombre: user.nombre, rol: user.tipo_usuario }
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: 'Error interno del servidor al iniciar sesión.' });
  }
};