import { obtenerDatosUsuario, verificarMascota, nuevaMascota } from './conectar.js';
import { validarCampos, mostrarAlerta, alertaModal, agregadoCarrito, avisoSalir } from './funciones.js'

(function(){
    
    // VARIABLES
    const nombresUsuario = document.querySelector('#adoptante');
    const numeroTelefono = document.querySelector('#numero-telefono');
    const formulario = document.querySelector('#form-adoptar');
    const regresar = document.querySelector('#adoptar-mascota i');


    let mascotaAdoptar;
  
    // Obtenemos la mascota del localStorage o asignamos un array vacío por defecto
    mascotaAdoptar = JSON.parse(localStorage.getItem('adoptar')) || [];

    // EVENTOS
    eventListeners()
    function eventListeners() {
        formulario.addEventListener('submit', validarFormulario )
        regresar.addEventListener('click', regresarAtras )

        document.addEventListener('DOMContentLoaded', () => {
            mostrarMascota();
            
        })
    }

    // FUNCIONES
    async function validarFormulario(e) {
       e.preventDefault();
       // Obtenemos los datos del usuario
       const { id, nombres, apellidos } = await obtenerDatosUsuario();
       
       // Obtenemos los datos del formulario
       const ocupacion = document.querySelector('#ocupacion').value;
       const direccion = document.querySelector('#direccion').value;

       // Guardamos en el objeto
       const adoptante = {
        nombresUsuario: nombresUsuario.value, 
        numeroTelefono: numeroTelefono.value, 
        ocupacion, 
        direccion,
      }; 

      if(validarCampos(adoptante)) {
        mostrarAlerta(formulario, `Es obligatorio llenar todos los campos`);
        return;
       }

       adoptante.idUsuario = id;
       adoptante.idMascota = mascotaAdoptar[0].id;

       const vericar =  await verificarMascota(adoptante);
       if(vericar) {
       console.log(vericar);
       alertaModal(document.querySelector('#adoptar-mascota'), `Lo siento ${nombres} ${apellidos}, la mascota ${mascotaAdoptar[0].nombre} ya fue adoptado`)
       return;
       }

    
       // Insertamos a la base de datos
       nuevaMascota(adoptante);

    // Mostramos un memsaje de que el servicio se adquirio correctamente
    agregadoCarrito(`Mascota <b>"${mascotaAdoptar[0].nombre}"</b> adoptado correctamente`)

    // Redireccionar después de 2 segundos
    setTimeout(function() {
    window.location.href = 'adoptar-api.html';

    formulario.reset();
    localStorage.removeItem("adoptar");
    }, 2000);

    }

    async function regresarAtras() {
        if(mascotaAdoptar.length) {
          const { nombres } = await obtenerDatosUsuario();
          avisoSalir(nombres, 'adoptar-api.html'); 
        }
    }

    async function mostrarMascota() {
        const imgMascota = document.querySelector('#adoptar-mascota .circle.d-flex');
        const nombreMascota = document.querySelector('#adoptar-mascota .text-center.mx-5');
        const { nombres, apellidos, numTelefono } = await obtenerDatosUsuario();
        mascotaAdoptar.forEach( mascota => {
            const img = document.createElement('IMG');
            img.src = mascota.img;
            img.style.borderRadius = '50%'
            img.style.width = '220px';
            
            const nombre = document.createElement('P');
            nombre.classList.add('nombre-persona', 'mb-0');
            nombre.textContent = mascota.nombre;

            imgMascota.appendChild(img);
            nombreMascota.appendChild(nombre)

            nombresUsuario.value = nombres+" "+apellidos
            numeroTelefono.value = numTelefono;
        });
    }

    console.log(mascotaAdoptar);
})();
