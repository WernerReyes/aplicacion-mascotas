import express from 'express';
import dotenv from 'dotenv';
import conectarBD from '../config/db.js';


dotenv.config();
const conexion = conectarBD();


const routerMascotas = express.Router();

// MOSTRAR USUARIOS
routerMascotas.get('/', (req, res) => {
    conexion.query('SELECT * FROM mascotas', (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al obtener los usuarios');
      } else {
        res.status(200).json(result);
      }
    });
  });


  routerMascotas.post('/nueva-mascota', (req, res) => {
    console.log(req.body)
    const {idUsuario, idMascota } = req.body
    console.log(idMascota, idUsuario);
    // Verificar si ya se adopto la mascota
    conexion.query('SELECT * FROM adopciones WHERE mascota_id = ?', [idMascota], (err, result) => {
      if (err) {
        console.error('Error al realizar la consulta:', err);
        return res.status(500).send('Error al insertar servicio');
      }
  
      if (result.length > 0) {
        // El usuario ya existe, enviar respuesta de verificación
        return res.json({ adoptado: true });
      }
  
    
  
    // INsertamos los datos
    const query = 'INSERT INTO adopciones (usuario_id, mascota_id ) VALUES (?, ?)';
    const values = [idUsuario, idMascota];
  
    conexion.query(query, values, (error, resultado) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al insertar el usuario' });
      }
  
      res.status(200).json({ mensaje: 'Mascota insertado correctamente' });
  
    });
  
  })
  });


  // Traemos las mascotas de un usuario en especifico
  routerMascotas.get('/usuario', (req, res) => {
    const idUsuario = req.query.userId;
 
    conexion.query('CALL ObtenerMascotasAdoptadas(?)', [idUsuario], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al obtener los usuarios');
      } else {
        res.status(200).json(result);
      }
    });
  });
export default routerMascotas;