import mysql from 'mysql';

const conectarBD = () => {
    const conexion = mysql.createConnection({
        host: process.env.HOST,
        database: process.env.BD,
        user: process.env.USER,
        password: process.env.PASSWORD
    });

    conexion.connect((error) => {
        if (error) {
            console.error('Error al conectar a la base de datos:', error);
            process.exit(1);
        } else {
            console.log('Conexión exitosa a la base de datos');
        }
    });

    return conexion;
};


export default conectarBD;


