import { agregarContenidoModal, productosHTML, alertaProductos } from './funciones.js';
import { obtenerServicios } from './conectar.js';

( function()  {
// VARIABLES
const contenedorServicios = document.querySelector('#container-servicios .container .row');
const contenidoServicios = document.querySelector('#container-servicios .container');
const inputFiltrar = document.querySelector('.buscar-servicios');

let servicios = [];

// EVENTOS
eventListeners()
function eventListeners() {
  contenidoServicios.addEventListener( 'click', reservarServicio ); 
  contenidoServicios.addEventListener( 'click', mostrarModal );  

  document.addEventListener('DOMContentLoaded', () => {
    // Filtramos
    obtenerValoresInput(inputFiltrar, 'nombre');

    // Anadimos los servicious en el HTML
    serviciosHTML();
    
    // Cundo salimos de la pagina reiniciamos el input de busqueda
    window.addEventListener('beforeunload', () => inputFiltrar.value = '');

    servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  });
  
}


// FUNCIONES
const datosBuscar = { nombre: '' };

async function serviciosHTML() {
    const servicios = await obtenerServicios();
    productosHTML(servicios, 'servicios' , contenedorServicios );
  }
  
function crearInfo(contenido) {
  const info = {
    img: contenido.querySelector('img').src,
    titulo: contenido.querySelector('.card-text').textContent,
    precio: contenido.querySelector('.precio-servicio').textContent,
    id: contenido.querySelector('.btn-añadir-carrito').dataset.id,
};

return info;
}


function reservarServicio(e) {
    if(e.target.classList.contains('bi-calendar-date')) {
        const contenido = e.target.parentElement.parentElement.parentElement
                              .parentElement.parentElement.parentElement;
                              
        leerDatos(contenido);
        

    };
}

function leerDatos(contenido) {
    const info = crearInfo(contenido)
    console.log(info);

    if(servicios.length === 0 ) {
        servicios = [...servicios, info ];
        window.location.href = 'reservar_servicio.html'
    
    } else {
        alert("Tienes un servicio pendiente por reservar")
     console.log(servicios);
     servicios = [];
    }
    
   sincronizarStorage();

} 

async function mostrarModal(e) {
   e.preventDefault();

   const contenedorModal = document.querySelector('#modal-servicios');
   const modalBody = contenedorModal.querySelector('.modal-body');
   const modal = new bootstrap.Modal(contenedorModal);

   if(e.target.classList.contains('btn-ver-mas')) {
      const contenido = e.target.parentElement.parentElement.parentElement
                                  .parentElement.parentElement;
      modal.toggle();

      const btnVerMas = contenido.querySelector('.btn-ver-mas');
      const servicios = await obtenerServicios();
      
      const index = servicios.findIndex( servicio => servicio.id === Number(btnVerMas.dataset.id) );
      
  
      agregarContenidoModal( modalBody, function(contenido){leerDatos(contenido)},
                        servicios[index], contenido, 'servicios' );
      
      
   }
}

// <!-- Filtrado -->
function obtenerValoresInput(valorObtenido, propiedad) {
  valorObtenido.addEventListener("input", () => {
      let valor = valorObtenido.value;

      datosBuscar[propiedad] = valor.trim();
       

      filtrarProductos(); 
  })
}

async function filtrarProductos() {
  const servicios = await obtenerServicios();
  const filtrado = servicios.filter( filtarTitulo );
  if( filtrado.length ) {
    productosHTML(filtrado, 'servicios', contenedorServicios );
    return;
  } 
  alertaProductos(contenedorServicios, "No se encontro ningun resultado")

}

function filtarTitulo(servicio) {
   const { nombre } = datosBuscar;
   const letraBusqueda = nombre.toLowerCase().trimStart()[0];
   if( nombre ) {
    return servicio.nombre.toLowerCase().startsWith(letraBusqueda) && 
          servicio.nombre.toLowerCase().includes(nombre.toLowerCase().trim());
   }
   return servicio;
}
// <!-- Fin filtrado -->


function sincronizarStorage() {
    localStorage.setItem('servicios', JSON.stringify(servicios));
}

})()
