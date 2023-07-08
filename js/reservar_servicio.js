import { validarCampos, mostrarAlerta, alertaModal, agregadoCarrito, avisoSalir } from "./funciones.js";
import { obtenerDatosUsuario, verificarServicios , nuevoServicio } from "./conectar.js";

(function(){
    // VARIABLES
    const nombresUsuario = document.querySelector('#datos-personales');
    const numeroTelefono = document.querySelector('#numero-telefono');
    const formulario = document.querySelector('#form-reservar');
    const regresar = document.querySelector('#reservar-servicio i');
  

    let servicioReservar;


  
    // Obtener carrito del localStorage o asignar un array vacío por defecto
    servicioReservar = JSON.parse(localStorage.getItem('servicios')) || [];
    

    // EVENTOS
    eventListeners()
    function eventListeners() {
        formulario.addEventListener('submit', validarFormulario )
        regresar.addEventListener('click', regresarAtras )

        document.addEventListener('DOMContentLoaded', () => {
            mostrarServicio();
            
        })
   }

     
     // FUNCIONES
async function validarFormulario(e) {
       e.preventDefault();
       // Obtenemos los datos del usuario
       const { id, nombres, apellidos } = await obtenerDatosUsuario();
       
       
     // Obtenemos los datos del formulario
     const fecha = document.querySelector('#fecha').value;
     const hora = document.querySelector('#hora').value;
     
     
     // Guardamos en el objeto
     const reservador = {
      nombresUsuario: nombresUsuario.value, 
      numeroTelefono: numeroTelefono.value, 
      fecha, 
      hora,
    }; 
     
     if(validarCampos(reservador)) {
        mostrarAlerta(formulario, `Es obligatorio llenar todos los campos`);
        return;
       }
    
    if(numeroTelefono.value.length !== 9 ) {
        mostrarAlerta(formulario, numeroTelefono.length < 9 ? 'Faltan mas digitos a ingresar' : 'Demasiados digitos ingresados')
        return;
       }
      
    reservador.idUsuario = id;
    reservador.idServicio = Number(servicioReservar[0].id);
    

    const vericar =  await verificarServicios(reservador);
    if(vericar) {
      console.log(vericar);
      alertaModal(document.querySelector('#reservar-servicio'), `Lo siento ${nombres} ${apellidos}, ya se reservó un servicio en la misma fecha y hora`)
      return;
    }

    
    // Insertamos a la base de datoa
    nuevoServicio(reservador);
    
    // Mostramos un memsaje de que el servicio se adquirio correctamente
    agregadoCarrito(`Servicio <b>"${servicioReservar[0].titulo}"</b> reservado correctamente`)

    // Redireccionar después de 2 segundos
    setTimeout(function() {
    window.location.href = 'servicios_inicio-api.html';

    formulario.reset();
    localStorage.removeItem("servicios");
    }, 2000);

    }

    
    async function regresarAtras() {
        if(servicioReservar.length > 0) {
          const { nombres } = await obtenerDatosUsuario();
          avisoSalir(nombres, 'servicios_inicio-api.html'); 
        }
    }

  async function mostrarServicio() {
        const imgServico = document.querySelector('#reservar-servicio .circle.d-flex');
        const nombreServicio = document.querySelector('#reservar-servicio .text-center.mx-5');
        const { nombres, apellidos, numTelefono } = await obtenerDatosUsuario();

        servicioReservar.forEach( servicio => {
            const img = document.createElement('IMG');
            img.src = servicio.img;
            img.style.width = '190px';
    
            const nombre = document.createElement('P');
            nombre.classList.add('nombre-persona', 'mb-0');
            nombre.textContent = servicio.titulo;
            
            const precio = document.createElement('P');
            precio.classList.add('nombre-persona');
            precio.style.color = '#0061C9';
            precio.textContent = servicio.precio;

            imgServico.appendChild(img);
            nombreServicio.appendChild(nombre);
            nombreServicio.appendChild(precio);
            
            nombresUsuario.value = nombres+" "+apellidos
            numeroTelefono.value = numTelefono;

        })
    }
     
  })();
  
