import { agregarContenidoModal, productosHTML, alertaProductos, agregadoCarrito } from './funciones.js';
import { obtenerProductos } from './conectar.js';

( function()  {
// VARIABLES
const educacionalProductos = document.querySelector('#container-educacional .container .row')
const contenidoEducacional = document.querySelector('#container-educacional .container');
const inputFiltrar = document.querySelector('.buscar-educacional');

let carrito = [];

const datosBuscar = { nombre: '' };

// EVENTOS
eventListeners()
function eventListeners() {
  contenidoEducacional.addEventListener( 'click', agregarContenido ); 
  contenidoEducacional.addEventListener( 'click', mostrarModal ); 

    document.addEventListener('DOMContentLoaded', () => {
    // Filtramos
    obtenerValoresInput(inputFiltrar, 'nombre');

    // Anadimos los productos en el HTML
    educacionalHTML();
    
    // Cundo salimos de la pagina reiniciamos el input de busqueda
    window.addEventListener('beforeunload', () => inputFiltrar.value = '');
    
    // Pasamos los productos de localStorage al carrito
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  });
  
}

// FUNCIONES
async function educacionalHTML() {
   const productosEducacional = await obtenerProductos(1);
   productosHTML(productosEducacional, 'educacional' , educacionalProductos);
}

 function crearInfo(contenido) {
  
  const info = {
    img: contenido.querySelector('img').src,
    titulo: contenido.querySelector('.text-center.mb-0').textContent,
    precio: contenido.querySelector('.precio-servicio').textContent,
    id: contenido.querySelector('.btn-añadir-carrito').dataset.id,
    cantidad: 1
};

return info;
}


function agregarContenido(e) {
    if(e.target.classList.contains('bi-bag-plus')) {
        const contenido = e.target.parentElement.parentElement.parentElement
                                  .parentElement.parentElement.parentElement;
        // Agregamos alerta
        // agregadoCarrito("Producto:")

        leerDatos(contenido);
    };
}

function leerDatos(contenido) {
    const info = crearInfo(contenido)
    
    // Agregamos alerta
    agregadoCarrito(`Producto: <b>"${info.titulo}"</b> añadido correctamente al carrito`)

    // Revisamos si ya existe el contenido
    const existe = carrito.some( producto => producto.id === info.id );
    if(existe) {
       const productos = carrito.map ( producto => {
         if(producto.id === info.id) {
            producto.cantidad++;
            return producto; // Retornamos el objeto actualizado
         }
        return producto; // Retornamos el objeto no actualizado
       })

    carrito = [...productos];

    } else {
      // Agregamos elementos al arreglo de carrito
      carrito = [...carrito, info];
    }


    sincronizarStorage();

} 

async function mostrarModal(e) {
   e.preventDefault();

   const contenedorModal = document.querySelector('#modal-educacional');
   const modalBody = contenedorModal.querySelector('.modal-body');
   const modal = new bootstrap.Modal(contenedorModal);

   if(e.target.classList.contains('btn-ver-mas')) {
      const contenido = e.target.parentElement.parentElement.parentElement
                                  .parentElement.parentElement;
      modal.toggle();
      
      const btnVerMas = contenido.querySelector('.btn-ver-mas');
      const productosEducacional = await obtenerProductos(1);
      
      const index = productosEducacional.findIndex( producto => producto.id === Number(btnVerMas.dataset.id) );
      

  agregarContenidoModal( modalBody, function(contenido){leerDatos(contenido)},
                        productosEducacional[index], contenido, 'educacional' );
      
   }
}

// <!-- Filtrado -->
function obtenerValoresInput(valorObtenido, propiedad) {
  valorObtenido.addEventListener("input", () => {
      let valor = valorObtenido.value;

      datosBuscar[propiedad] = valor.trim();
       

      filtrarProductos(1); 
  })
}

async function filtrarProductos(tipo) {
  const productos = await obtenerProductos(tipo);
  const filtrado = productos.filter( filtarTitulo );
  if( filtrado.length ) {
    productosHTML(filtrado, 'educacional', educacionalProductos );
    return;
  } 
  alertaProductos(educacionalProductos, "No se encontro ningun resultado")

}

function filtarTitulo(producto) {
   const { nombre } = datosBuscar;
   const letraBusqueda = nombre.toLowerCase().trimStart()[0];
   if( nombre ) {
    return producto.nombre.toLowerCase().startsWith(letraBusqueda) && 
          producto.nombre.toLowerCase().includes(nombre.toLowerCase().trim());
   }
   return producto;
}
// <!-- Fin filtrado -->


function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}




})()

