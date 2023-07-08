// Funcion para validar si todos los campos estan vacios
export function validarCampos(obj) {
  return !Object.values(obj).every( input => input.trim() !== '');
}


// Funcion para validar el ingreso de un gmail correcto
export function validarEmail(email) {
    const verificar = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return !verificar.test(email);
}


// Funcion para el validar el ingreso de una contraseña correcta
export function validarPassword(password) {
    const verificar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return !verificar.test(password);
}


// Funcion para mostrar alerta
export function mostrarAlerta(campo, mensaje) {
   const existe = campo.querySelector('.alert-danger');

   if(!existe) {
   const alerta = document.createElement('P');
   alerta.classList.add('alert','alert-danger', 'text-center', 'mt-3', 'p-1', 'mx-4');
   alerta.textContent = mensaje;

   campo.appendChild(alerta);
    
   setTimeout( () => {
      alerta.remove();
   },2000);

   }
}

// Alertar para productos
export function alertaProductos(campo, mensaje) {
  limpiar(campo);

   const alerta = document.createElement('P');
   alerta.classList.add('alert','alert-danger', 'text-center', 'mt-3', 'p-1','w-100');
   alerta.textContent = mensaje;

   campo.appendChild(alerta);
    
}

// Aleta para añadido al carrito
export function agregadoCarrito(mensaje) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    html: mensaje,
    showConfirmButton: false,
    timer: 1500,
    customClass: 'small-alert' 
  })
}


// Alerta para salir de servicios
export function avisoSalir(nombres, ruta) {
  const alerta = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  alerta.fire({
    title: `¿${nombres} estas seguro que deseas salir?`,
    text: "Perderas lo datos registrados",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí deseo salir!',
    cancelButtonText: '¡No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = ruta;
      localStorage.removeItem("servicios");
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
    }
  })
}

// Alerta de error 
export function alertaError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: '¡ERROR!',
        text: mensaje,
      })
}


// Funcion par mostrar contraseña
export function mostrarPassword(btnVer, inputPassword) {
 
   btnVer.onclick = () => {
       if(!btnVer.firstElementChild.classList.contains('visually-hidden')){

        // Ocultamos el icono de ocultar
        btnVer.firstElementChild.classList.add('visually-hidden');
        btnVer.lastElementChild.classList.remove('visually-hidden');

        // Mostramos la contraseña
        inputPassword.type = 'text';
        return;
       }
       
       // Habilitamos el icono de ocultar
       btnVer.firstElementChild.classList.remove('visually-hidden');
       btnVer.lastElementChild.classList.add('visually-hidden');

       // Ocultamos la contraseña
       inputPassword.type = 'password';
   }
}

// Funcion para mostrar alertar modales
export function alertaModal(contenedor, mensaje) {
  const existe = document.querySelector('.alert-danger.alert-dismissible');
  if(!existe) {
    const alerta = document.createElement('DIV');
    alerta.classList.add('alert','alert-danger','alert-dismissible','fade','show', 'mt-2', 'mx-2')
    
    const mensajeAlerta = document.createElement('STRONG');
    mensajeAlerta.classList.add('text-sm')
    mensajeAlerta.textContent = mensaje;
 
    const btnEliminarAlerta = document.createElement('BUTTON');
    btnEliminarAlerta.classList.add('btn-close');
 
    alerta.appendChild(mensajeAlerta);
    alerta.appendChild(btnEliminarAlerta);
    
    // Eliminamos la alerta
    btnEliminarAlerta.onclick = () => alerta.remove();
 
    // O desapace en 5 segundos
    setTimeout( () => {
      alerta.remove();
    }, 5000)
    
    contenedor.prepend(alerta);
    }
  }


// Función para mostrar el aviso de carga
export function modalCarga(mensaje) {
  const ubicacion = document.querySelector('#modal-carga');

   const divModal = document.createElement('DIV');
   divModal.classList.add('modal-dialog','modal-fullscreen')

   if(mensaje === 'Loading...') {
    divModal.innerHTML = 
   `<div class="modal-content">
   <div class="modal-body">
     <!-- Contenido del modal -->
     <div class="container child-element w-100 h-100 d-flex flex-column align-items-center justify-content-center div-cuenta-creada">
       <div>
         <img src="images/perros-labrador.gif" class="img-fluid gif-color" alt="Imagen">
       </div>
       <div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
         <span class="visually-hidden">${mensaje}.</span>
       </div>
     </div>
   </div>
 </div>`
   } else {
    divModal.innerHTML = 
    `<div class="modal-content">
    <div class="modal-body">
      <!-- Contenido del modal -->
      <div class="container child-element w-100 h-100 d-flex flex-column align-items-center justify-content-center div-cuenta-creada">
        <div>
          <img src="images/perros-labrador.gif" class="img-fluid gif-color" alt="Imagen">
        </div>
        <h2 style="font-family: 'Poppins'; color:white; font-weight: 700;">${mensaje} . . .</h2>
      </div>
    </div>
  </div>`
   }
  
 ubicacion.appendChild(divModal);
}


// Función para crear el HTML de los productos
export function productosHTML(productos, categoria, contPadre) {

  limpiar(contPadre);

  productos.forEach( producto => {

  const { id, nombre, precio, autor, imagen } = producto;

  // DIV CARD
  const divCard = document.createElement('DIV');
  divCard.classList.add('card', 'my-3', 'mx-2');
      const divImg = document.createElement('DIV');
      divImg.classList.add('d-flex', 'justify-content-center', 'align-items-center');
      const circle1 = document.createElement('DIV');
      circle1.classList.add('rounded-circle','circle-1');
      circle1.style.margin = '10px';
      const circle2 = document.createElement('DIV');
      circle2.classList.add('rounded-circle', 'position-absolute','start-50','translate-middle','circle-2');
      const img = document.createElement('IMG');
      img.classList.add('mt-3')
      img.src = imagen;
      const divCardBody = document.createElement('DIV');
      divCardBody.classList.add('card-body','text-center');
          const pNombre = document.createElement('p');
          pNombre.classList.add('card-text');
          pNombre.textContent = nombre;
          const divPrecio = document.createElement('DIV');
          divPrecio.classList.add('d-flex','justify-content-center','align-items-center')
              const divCentro = document.createElement('DIV');
              divCentro.classList.add('mx-4','mb-0')
                  const h4Precio = document.createElement('H4');
                  h4Precio.classList.add('precio-servicio');
                  h4Precio.innerHTML = `<span>S/.</span>${precio}</p>`
              const divBotones = document.createElement('DIV');
              divBotones.classList.add('mx-4','mb-3');
                      const agruparBtns = document.createElement('DIV');
                      agruparBtns.classList.add('btn-group');
                          const btnVerMas = document.createElement('BUTTON');
                          btnVerMas.classList.add('btn-ver-mas');
                          btnVerMas.textContent = 'Ver más';
                          btnVerMas.dataset.id = id;
                          const btnAñadirCarrito = document.createElement('BUTTON');
                          btnAñadirCarrito.classList.add('btn-añadir-carrito');
                          btnAñadirCarrito.dataset.id = id;

                          
  
  switch(categoria) {
    case 'educacional':
          const h4Nombre = document.createElement('H4');
          h4Nombre.classList.add('text-center','mb-0');
          h4Nombre.textContent = nombre; 
          const pAutor = document.createElement('P');
          pAutor.innerHTML = `<p>${autor}</p>`;

          btnAñadirCarrito.innerHTML = `<i class="bi bi-bag-plus"></i>`;

          agruparBtns.appendChild(btnVerMas);
          agruparBtns.appendChild(btnAñadirCarrito);
      divCardBody.appendChild(h4Nombre);
      divCardBody.appendChild(pAutor);
      divCardBody.appendChild(divPrecio);
      divImg.appendChild(img);
    break;
    case 'servicios':
         const btnReservar = document.createElement('BUTTON');
         btnReservar.classList.add('btn-añadir-carrito');
         btnReservar.dataset.id = id;
         btnReservar.innerHTML = `<i class="bi bi-calendar-date"></i>`;

         img.classList.remove('mt-3');
         img.classList.add('card-img-top','position-absolute','start-50','translate-middle')     

         agruparBtns.appendChild(btnVerMas);
         agruparBtns.appendChild(btnReservar);

         divCardBody.appendChild(pNombre);
         divCardBody.appendChild(divPrecio);
   
         divImg.appendChild(circle1);
         divImg.appendChild(circle2);
         divImg.appendChild(img);
         break;
   
    default:
      img.classList.remove('mt-3');
      img.classList.add('card-img-top','position-absolute','start-50','translate-middle')        
          btnAñadirCarrito.innerHTML = `<i class="bi bi-bag-plus"></i>`; 
          
          agruparBtns.appendChild(btnVerMas);
          agruparBtns.appendChild(btnAñadirCarrito);

      divCardBody.appendChild(pNombre);
      divCardBody.appendChild(divPrecio);

      divImg.appendChild(circle1);
      divImg.appendChild(circle2);
      divImg.appendChild(img);
    break;
  }

                      
              divBotones.appendChild(agruparBtns);
              divCentro.appendChild(h4Precio);
          divPrecio.appendChild(divCentro);
          divPrecio.appendChild(divBotones);
      
      divCard.appendChild(divImg);
      divCard.appendChild(divCardBody);

      
      // Insertamos en el HTML
      contPadre.appendChild(divCard);
      
      



});
}


// FUNCIONES PARA AGREGAR AL CARRITO
export function agregarContenidoModal( modalBody, functionLeerDatos, info, 
                                      contenido, tipo ) {
  
  console.log(info);
                    
  limpiar(modalBody);

  // Obtenemos toda la informacio
  const { id, nombre, precio, puntaje, imagen, descripcion } = info;
  
  // PADRE
  const divContainer = document.createElement('DIV');
  divContainer.classList.add('container');
  
  // HIJO 1
  const primerDiv = document.createElement('DIV');
  primerDiv.classList.add('d-flex','justify-content-between');
      const btnVolverAtras = document.createElement('BUTTON');
            btnVolverAtras.setAttribute('data-bs-dismiss', 'modal');
            btnVolverAtras.setAttribute('aria-label', 'Close');
            btnVolverAtras.classList.add('volver-atras');
            btnVolverAtras.innerHTML = `<i class="bi bi-arrow-left-circle"></i>`
      const irCarrito = document.createElement('BUTTON');
            irCarrito.classList.add('ir-carrito');
            irCarrito.innerHTML = `<i class="bi bi-basket"></i>`;
            irCarrito.onclick = () => window.location.href = 'carrito-api.html';
  primerDiv.appendChild(btnVolverAtras);
  primerDiv.appendChild(irCarrito);
  
  // HIJO 2
  const segundoDiv = document.createElement('DIV');
  segundoDiv.classList.add('text-center','my-3');
  segundoDiv.innerHTML  = `
    <h3 class="title">${nombre}</h3>
    <img src="${imagen}" class="mt-3" width="300px">
  `


  // HIJO 3
  const tercerDiv = document.createElement('DIV');
  tercerDiv.classList.add('mt-4','p-3','contenido');
        const primerHijoDiv = document.createElement('DIV');
        primerHijoDiv.classList.add('d-flex','align-items-center','justify-content-center')
             const primero = document.createElement('DIV');
             primero.classList.add('text-center','my-3','decoracion');
             primero.innerHTML = `<p></p>`;
        const segundoHijoDiv = document.createElement('DIV');
        segundoHijoDiv.classList.add('text-center');
             const parrafo = document.createElement('P');
             parrafo.classList.add('text-justify-rect');
             parrafo.textContent = descripcion;
             const btnAgregarCarrito = document.createElement('BUTTON');
             btnAgregarCarrito.classList.add('agregar-carrito');
             btnAgregarCarrito.dataset.id = id;
             btnAgregarCarrito.innerHTML = `
             <i class="bi bi-basket mx-3"></i>
             Agregar (S/.${precio})
             `
             btnAgregarCarrito.onclick = () => functionLeerDatos(contenido);

        

  switch (tipo) {
    case 'educacional':
             const segundo = document.createElement('DIV');
             segundo.classList.add('d-flex','align-items-center','justify-content-center','p-2','puntaje');
             segundo.innerHTML = `
               <i class="bi bi-star-fill mx-1"></i>
               <p class="mb-0 mx-1">${puntaje}</p>
             `
        primerHijoDiv.appendChild(primero);
        primerHijoDiv.appendChild(segundo);
        segundoHijoDiv.appendChild(parrafo);
        segundoHijoDiv.appendChild(btnAgregarCarrito);
  tercerDiv.appendChild(primerHijoDiv);
  tercerDiv.appendChild(segundoHijoDiv);
      break;
    
    case 'servicios': 
            const btnReservar = document.createElement('BUTTON');
            btnReservar.classList.add('reservar');
            btnReservar.dataset.id = id;
            btnReservar.innerHTML = `
               <i class="bi bi-calendar-check mx-2"></i>
               Reservar (${precio}) `
            btnReservar.onclick = () => functionLeerDatos(contenido);
  
        primerHijoDiv.appendChild(primero);
        segundoHijoDiv.appendChild(parrafo);
        segundoHijoDiv.appendChild(btnReservar);
  tercerDiv.appendChild(primerHijoDiv);
  tercerDiv.appendChild(segundoHijoDiv);
      break;

    default:
        primerHijoDiv.appendChild(primero);
        segundoHijoDiv.appendChild(parrafo);
        segundoHijoDiv.appendChild(btnAgregarCarrito);
  tercerDiv.appendChild(primerHijoDiv);
  tercerDiv.appendChild(segundoHijoDiv);
      break;
  }

  divContainer.appendChild(primerDiv);
  divContainer.appendChild(segundoDiv);
  divContainer.appendChild(tercerDiv);

  // Agregamos el contenido al modal
  modalBody.appendChild(divContainer);
  
}

// Eliminar los juegos del tbody
export function limpiar(modalBody) {
  while(modalBody.firstChild){
      modalBody.removeChild(modalBody.firstChild);
  }
}