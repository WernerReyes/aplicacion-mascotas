import express from 'express';
import routerUsuario from './routes/usuario.js';
import routerProductos from './routes/productos.js';
import routerServicios from './routes/servicios.js';
import routerMascotas from './routes/mascotas.js';
import cors from 'cors';



const app = express();

app.use(express.json());

// Habilitamos CORS
app.use(cors());

// Agregamos los Routers
app.use( '/usuarios', routerUsuario );
app.use( '/productos', routerProductos );
app.use( '/servicios', routerServicios );
app.use( '/mascotas', routerMascotas )



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Servidor web escuchando en el puerto 3000');
});














