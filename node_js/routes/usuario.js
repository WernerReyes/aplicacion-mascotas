import express from 'express';
import Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import conectarBD from '../config/db.js';



dotenv.config();
const conexion = conectarBD();


const routerUsuario = express.Router();

// MOSTRAR USUARIOS
routerUsuario.get('/crear-cuenta', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al obtener los usuarios');
      } else {
        res.status(200).json(result);
      }
    });
  });

// CONSULTAMOS SI EXISTE UN USUARIO, SI NO LO INSERTAMOS 
routerUsuario.post('/crear-cuenta', (req, res) => {
  const { nombres, apellidos, numTelefono, email, password } = req.body;

  // Verificar si el usuario ya existe
  conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      return res.status(500).send('Error al verificar el inicio de sesión');
    }

    if (result.length > 0) {
      // El usuario ya existe, enviar respuesta de verificación
      return res.json({ verificado: true });
    }

    // El usuario no existe, insertarlo en la base de datos
    const query = 'INSERT INTO usuarios (nombres, apellidos, numero_telefono, email, contraseña ) VALUES (?, ?, ?, ?, ?)';
    const values = [nombres, apellidos, numTelefono, email, password];

    conexion.query(query, values, (error, resultado) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al insertar el usuario' });
      }

      res.status(200).json({ mensaje: 'Usuario insertado correctamente', id: resultado.insertId });

    });
  });
});


// VALIDAMOS QUE EL EL USUARIO INGREGSE CORRECTAMENTE SUS DATOS
routerUsuario.post('/login', (req, res) => {
  const { email, password } = req.body;
  conexion.query('SELECT * FROM usuarios WHERE email = ? AND contraseña = ?', [email, password], (err, result) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      return res.status(500).send('Error al verificar el inicio de sesión');
    }

    if (result.length === 0) {
      // No se encontró ningún usuario con las credenciales proporcionadas
      return res.json({ verificado: false });
    }

    // Usuario verificado correctamente
    const usuarioId = result[0].id;

    // Genera el token JWT
  const token = Jwt.sign({ id: usuarioId }, 'secreto', { expiresIn: '1d' });
    
    return res.json({ verificado: true, token });
  });
});


routerUsuario.get('/usuario-logueado', (req, res) => {
  // Obtener el usuarioId del token JWT
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = Jwt.verify(token, 'secreto');

    // El token es válido, se puede acceder a los datos del usuario
    const usuarioId = decoded.id;

    // Realizar las acciones correspondientes con el usuarioId
    // Por ejemplo, realizar una consulta a la base de datos para obtener los datos del usuario por su ID
    conexion.query('SELECT * FROM usuarios WHERE id = ?', [usuarioId], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error al obtener los datos del usuario');
      }

      if (result.length === 0) {
        // No se encontró ningún usuario con el ID proporcionado
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Retorna los datos del usuario en formato JSON
      const usuarioLogueado = {
        id: result[0].id,
        nombres: result[0].nombres,
        apellidos: result[0].apellidos,
        numTelefono: result[0].numero_telefono,
        email: result[0].email,
        password: result[0].contraseña
      };

      res.status(200).json(usuarioLogueado);
    });
  } catch (error) {
    // El token es inválido o ha expirado
    return res.status(401).json({ error: 'Token inválido' });
  }
});


routerUsuario.post('/editar-usuario', (req, res) => {
  const { id, nombresNuevos, apellidosNuevos, telefonoNuevo, passwordNuevo  } = req.body

  const query = 'CALL editarUsuario(?, ?, ?, ?, ?)';
  const params = [id, nombresNuevos, apellidosNuevos, telefonoNuevo, passwordNuevo];

  conexion.query(query, params, (error, results) => {
    if (error) {
      console.error('Error al editar el usuario:', error);
      res.status(500).send('Error al editar el usuario');
      return;
    }

    console.log('Usuario editado correctamente');
    res.status(200).send('Usuario editado correctamente');
  })


})


export default routerUsuario;