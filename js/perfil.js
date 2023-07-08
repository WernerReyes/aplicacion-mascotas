import { modalCarga, mostrarPassword, validarCampos, mostrarAlerta, validarPassword } from './funciones.js';
import { obtenerDatosUsuario, obtenerMascotasAdoptadas, obtenerServiciosAdquiridos, editarDatosUsuario } from './conectar.js'

( function()  {
    // VARIABLES
    const ajustes = document.querySelector('.custom-icon');
    const bntCerrarSesion = document.querySelector('.btn-cerrar-sesion');
    const btnGuardarCambio = document.querySelector('.btn-guardar-cambios');
     
    // EVENTOS
    eventListeners()
    function eventListeners() {
        ajustes.addEventListener( 'click', mostrarModal );
        bntCerrarSesion.addEventListener( 'click', cerrarSesion );
        btnGuardarCambio.addEventListener( 'click', guardarCambios )

        // Cuando el documento ya este listo 
        document.addEventListener('DOMContentLoaded', function() {
            // Rellenamos los datos de perfil
            perfilAplicacion();

            // Rellenamos los datos de configuracion
            rellenarDatosAjustes();
        })
    }
    

    // FUNCIONES
    async function perfilAplicacion() {
        const { id, nombres, apellidos } = await obtenerDatosUsuario();

        // Rellenamos iniciales nombre
        const inialesNom = document.querySelector('.usuario-iniciales');
        inialesNom.textContent = nombres[0]+apellidos[0];

        // Rellenamos los nombres y apellidos del usuario
        const datosUsuario = document.querySelector('.nombre-persona');
        datosUsuario.textContent = `${nombres} ${apellidos}`

        // Insertamos los datos la mascotas adoptadas
        const mascotasAdoptadas = await obtenerMascotasAdoptadas(id);
        mostrarMacotasAdoptadas(mascotasAdoptadas[0])


        // Insertamos los servicios adquiridos
        const serviciosAdquiridos = await obtenerServiciosAdquiridos(id);
        mostrarServiciosAdquiridos(serviciosAdquiridos[0])

    }


    function mostrarMacotasAdoptadas(mascotas) {
      const resumenMascotasAdoptadas = document.querySelector('.resum-mascotas-adoptadas');
      
      if(mascotas.length ) {
      mascotas.forEach( mascota => {
        const { nombre, img, fecha_adopcion } = mascota;

          const divMacota = document.createElement('DIV');
          divMacota.classList.add('d-flex','align-items-center','my-3');
          divMacota.innerHTML = `
          <img src="${img}" width="60px">
            <p class="mb-0 mx-2">${nombre}</p>
            <p class="mt-4 mx-2" style="font-size: 15px">${fecha_adopcion.substring(0, 10)}</p>
          `

          // Insertamos en el HTML
          resumenMascotasAdoptadas.appendChild(divMacota);
      });
      return;
    }

    const parrafo = document.createElement("P");
    parrafo.classList.add('mb-0','mx-2','text-center');
    parrafo.style.fontSize = '20px';
    parrafo.style.color = '#55A5FA';
    parrafo.textContent = "Ninguna mascota adoptada"

    // Insertamos en el HTML
    resumenMascotasAdoptadas.appendChild(parrafo);

    }

    
    function mostrarServiciosAdquiridos(servicios) {
        const resumenServiciosAdquiridos = document.querySelector('.resum-servicios-adquiridos');
      
        if(servicios.length ) {
        servicios.forEach( servicio => {
          const { nombre_servicio, imagen , fecha_reserva, hora_reserva } = servicio;
  
            const divServicio = document.createElement('DIV');
            divServicio.classList.add('d-flex','align-items-center','my-3','w-100');
            divServicio.innerHTML = `
               <div>
               <img class="pt-2 px-1" src="${imagen}" width="60px">
               </div>
              <p class="mb-0 mx-2">${nombre_servicio}</p>
              <p class="mt-1 mb-0 mx-2" style="font-size: 13px">${fecha_reserva.substring(0, 10)}</p>
              <p class="mt-1 mb-0 mx-2" style="font-size: 13px">${hora_reserva} ${Number(hora_reserva.substring(0,2)) < 12 ? 'AM' : 'PM' }</p>
            `
  
            // Insertamos en el HTML
            resumenServiciosAdquiridos.appendChild(divServicio);
        });
        return;
      }
  
      const parrafo = document.createElement("P");
      parrafo.classList.add('mb-0','mx-2','text-center');
      parrafo.style.fontSize = '20px';
      parrafo.style.color = '#55A5FA';
      parrafo.textContent = "Ninguna servicio adquirido"
  
      // Insertamos en el HTML
      resumenServiciosAdquiridos.appendChild(parrafo);
  
      }
    
  
    async function rellenarDatosAjustes() {
        const { nombres, apellidos, email, numTelefono, password } = await obtenerDatosUsuario();

        // Rellenamos iniciales nombre
        const inialesNom = document.querySelector('.iniciales-nombre');
        inialesNom.textContent = nombres[0]+apellidos[0];

        // Rellenamos nombres
        const nombresUsuario = document.querySelector('#nombres');
        nombresUsuario.value = nombres;
      
        // Rellenamos apellidos
        const apellidosUsuario = document.querySelector('#apellidos');
        apellidosUsuario.value = apellidos;
       
        // Rellenamos telefonos
        const telefonoUsuario = document.querySelector('#numTelefono');
        telefonoUsuario.value = numTelefono;
  
        // Rellenamos correo
        const emailUsuario = document.querySelector('#email');
        emailUsuario.value = email;

        // Rellenamos password
        const passwordUsuario = document.querySelector('#password');
        mostrarPassword(document.querySelector('.ver-password'), passwordUsuario)
        passwordUsuario.value = password;
    

    }
    
    async function guardarCambios() {
      const { id } = await obtenerDatosUsuario();
      const nuevosDatosUsuario =  {
        nombresNuevos: document.querySelector('#nombres').value,
        apellidosNuevos: document.querySelector('#apellidos').value,
        telefonoNuevo: document.querySelector('#numTelefono').value,
        passwordNuevo: document.querySelector('#password').value
      
       }

       if(validarCampos(nuevosDatosUsuario)) {
        mostrarAlerta(document.querySelector('.form-perfil'), "Es obligatorio llenar todos los campos");
        return;
       }

       if(nuevosDatosUsuario.telefonoNuevo.length !== 9) {
        mostrarAlerta(document.querySelector('.div-telefono'), nuevosDatosUsuario.telefonoNuevo.length < 9 ? 'Faltan mas digitos a ingresar' : 'Demasiados digitos ingresados')
        return;
       }

       if(validarPassword(nuevosDatosUsuario.passwordNuevo)) {
        mostrarAlerta(document.querySelector('.form-perfil'),"Por favor, elige una contraseña segura: al menos 8 caracteres, una mayúscula, una minúscula y un número")
        return;
       }
       
       // Asignamos el ID DEL USUARIO para ejecutar el cambio
       nuevosDatosUsuario.id = id;

       mostrarModalGuardarCambios();

       setTimeout(() => {
        location.reload();
      }, 2500);
       
       // Editamos los datos del usuario
       editarDatosUsuario(nuevosDatosUsuario);

    }


    function mostrarModalGuardarCambios() {
      let timerInterval
  Swal.fire({
  title: 'Guardando cambios...',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
  })
    }

  function mostrarModal() {
        // Abrimos y cerramos el modal
        const modal = new bootstrap.Modal(document.querySelector('#modal-ajustes'));
        modal.toggle();
    
    }


    function cerrarSesion() {
        // Insertamos el contenido en el modal
        modalCarga('Cerrando sesión');
        
        // Eliminamos el carrito del local Storage
        localStorage.removeItem('carrito');
    
       // Abrimos y cerramos el modal
       const modal = new bootstrap.Modal(document.querySelector('#modal-carga'));
       modal.toggle();
  
       // Espera 5 segundos y redirige a otro HTML
       setTimeout( () => {
       window.location.href = 'inicio.html';
       },5000)
    }




})();