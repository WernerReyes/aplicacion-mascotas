import express from 'express';
import dotenv from 'dotenv';
import conectarBD from '../config/db.js';


dotenv.config();
const conexion = conectarBD();


const routerServicios = express.Router();

// MOSTRAR USUARIOS
routerServicios.get('/', (req, res) => {
  
    conexion.query('SELECT * FROM servicios', (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al obtener los usuarios');
      } else {
        res.status(200).json(result);
      }
    });
  });

routerServicios.post('/nuevos-servicios', (req, res) => {
  const {idUsuario, idServicio, fecha, hora } = req.body
  // Verificar si el usuario ya existe
  conexion.query('SELECT * FROM reservas WHERE fecha_reserva = ? AND hora_reserva = ?', [fecha, hora], (err, result) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      return res.status(500).send('Error al insertar servicio');
    }

    if (result.length > 0) {
      // El usuario ya existe, enviar respuesta de verificación
      return res.json({ verificado: true });
    }

  

  // INsertamos los datos
  const query = 'INSERT INTO reservas (usuario_id, servicio_id, fecha_reserva, hora_reserva ) VALUES (?, ?, ?, ?)';
  const values = [idUsuario, idServicio, fecha, hora];

  conexion.query(query, values, (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al insertar el usuario' });
    }

    res.status(200).json({ mensaje: 'Servicio insertado correctamente' });

  });

})
});


// Traemos los servicios de un usuario en especifico
routerServicios.get('/usuario', (req, res) => {
  const idUsuario = req.query.userId;

  conexion.query('CALL obtenerServiciosAdquiridos(?)', [idUsuario], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener los usuarios');
    } else {
      res.status(200).json(result);
    }
  });
});
  


export default routerServicios;