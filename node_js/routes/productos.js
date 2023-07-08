import express from 'express';
import dotenv from 'dotenv';
import conectarBD from '../config/db.js';


dotenv.config();
const conexion = conectarBD();


const routerProductos = express.Router();

// MOSTRAR USUARIOS
routerProductos.get('/', (req, res) => {
    const idCategoria = req.query.categoria;
  
    conexion.query('SELECT * FROM productos WHERE categoria_id = ?', [idCategoria], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al obtener los usuarios');
      } else {
        res.status(200).json(result);
      }
    });
  });

// INSERTAMOS LOS PRUDUCTOS EN LA BASE DE DATOS
routerProductos.post('/insertando-productos', (req, res) => {
  const productos = req.body;

  // Verificar si la solicitud incluye un array de productos
  if (!Array.isArray(productos)) {
    return res.status(400).send('La solicitud debe incluir un array de productos');
  }

  productos.forEach(producto => {
    const { id, idUsuario, cantidad } = producto;

    const query = 'INSERT INTO compras(usuario_id, producto_id, cantidad) VALUES (?,?,?)';
    conexion.query(query, [idUsuario, id, cantidad], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al insertar productos');
        return; // Terminar la ejecución del bucle en caso de error
      }
    });
  });

  res.status(200).send('Productos insertados exitosamente');
});


  


export default routerProductos;