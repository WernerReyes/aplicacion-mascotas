const urlUsuario = 'http://localhost:3000/usuarios';
const urlProductos = 'http://localhost:3000/productos';
const urlServicios = 'http://localhost:3000/servicios';
const urlMascotas = 'http://localhost:3000/mascotas';


// <-- USUARIOS -->
// Insertar nuevo usuario en la base de datos
export async function nuevoUsuario(usuario) {
   
    try {
        await fetch( `${urlUsuario}/crear-cuenta`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Usuario registrado correctamente");

    } catch(error) {
        console.log(error);
    }
}




// Consultar si el usuario ingresó correctamente sus datos y obtener el token JWT
export async function verificarUsuario(usuario, ruta) {
  try {
    const resultado = await fetch(`${urlUsuario}/${ruta}`, {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const respuesta = await resultado.json();

    if (respuesta.verificado) {
      // Usuario autenticado correctamente, guardar el token JWT en el local storage
      const token = respuesta.token;
      localStorage.setItem('token', token);
      return true;
    } else {
      // Autenticación fallida
      return false;
    }

  } catch (error) {
    console.log(error);
  }
}

// Realizar una solicitud al backend que requiere autenticación
export async function obtenerDatosUsuario() {
    try {
      const token = localStorage.getItem('token');
      const resultado = await fetch(`${urlUsuario}/usuario-logueado`, {
        headers: {
          Authorization: token
        }
      });
  
      const datosUsuario = await resultado.json();
      return datosUsuario;
  
    } catch (error) {
      console.log(error);
    }
  }

// Editar usuarios
export async function editarDatosUsuario(nuevosDatos) {
  try {
    await fetch( `${urlUsuario}/editar-usuario`, {
        method: 'POST',
        body: JSON.stringify(nuevosDatos),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log("Usuario actualizado correctamente");

} catch(error) {
    console.log(error);
}
}

// <-- FIN USUARIOS -->


// <-- PRODUCTOS -->
// Obtener los productos 
export async function obtenerProductos(idCategoria) {
    try {
        const resultado = await fetch(`${urlProductos}?categoria=${idCategoria}`);
        const productos = await resultado.json();
        return productos;
    } catch (error) {
        console.log(error);
    }
}

// Insertar los productos comprados en la base de datos
export async function insertarProductos(productos) {
  try {
    await fetch( `${urlProductos}/insertando-productos`, {
        method: 'POST',
        body: JSON.stringify(productos),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log("Productos registrados correctamente");

} catch(error) {
    console.log(error);
}
}

// <-- FIN PRODUCTOS -->



// <-- SERVICIOS -->
// Obtenemos los servicios
export async function obtenerServicios() {
    try {
        const resultado = await fetch(urlServicios);
        const servicios = await resultado.json();
        return servicios;
    } catch (error) {
        console.log(error);
    }
}

// verificamos si los servicios no existen
export async function verificarServicios(servicio) {
  try {
    const resultado = await fetch(`${urlServicios}/nuevos-servicios`, {
      method: 'POST',
      body: JSON.stringify(servicio),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const respuesta = await resultado.json();
    return respuesta.verificado;

  } catch (error) {
    console.log(error);
  }
}

// Insertamos los servicios a la base de datos
export async function nuevoServicio(servicios) {
   
  try {
      await fetch( `${urlServicios}/nuevos-servicios`, {
          method: 'POST',
          body: JSON.stringify(servicios),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      console.log("Servicio registrado correctamente");

  } catch(error) {
      console.log(error);
  }
}

export async function obtenerServiciosAdquiridos(idUsuario) {
  try {
      const resultado = await fetch(`${urlServicios}/usuario?userId=${idUsuario}`);
      const servicios = await resultado.json();
      return servicios;
  } catch (error) {
      console.log(error);
  }
}
// <-- FIN SERVICIOS -->


// <-- MASCOTAS -->
// Obtenemos las mascotas
export async function obtenerMascotas() {
  try {
      const resultado = await fetch(urlMascotas);
      const mascotas = await resultado.json();
      return mascotas;
  } catch (error) {
      console.log(error);
  }
}

// verificamos si los servicios no existen
export async function verificarMascota(mascota) {
  try {
    const resultado = await fetch(`${urlMascotas}/nueva-mascota`, {
      method: 'POST',
      body: JSON.stringify(mascota),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const respuesta = await resultado.json();
    return respuesta.adoptado;

  } catch (error) {
    console.log(error);
  }
}

// Insertamos las mascotas la base de datos
export async function nuevaMascota(mascota) {
   
  try {
      await fetch( `${urlMascotas}/nueva-mascota`, {
          method: 'POST',
          body: JSON.stringify(mascota),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      console.log("Mascota registrado correctamente");

  } catch(error) {
      console.log(error);
  }
}

export async function obtenerMascotasAdoptadas(idUsuario) {
  try {
      const resultado = await fetch(`${urlMascotas}/usuario?userId=${idUsuario}`);
      const mascotas = await resultado.json();
      return mascotas;
  } catch (error) {
      console.log(error);
  }
}
// <-- FIN MASCOTAS -->