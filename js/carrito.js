import { obtenerDatosUsuario, insertarProductos } from './conectar.js';
import { alertaError, agregadoCarrito } from './funciones.js';

(function(){
    // VARIABLES
    const infoProductos = document.querySelector('#carrito-api .container .row');
    const btnEliminarProductos = document.querySelector('.vaciar-todo-carrito');
    const pagarProductos = document.querySelector('.btn-comprar-productos');
    console.log(pagarProductos);

    let articulosCarrito;
  
    // Obtener carrito del localStorage o asignar un array vacío por defecto
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // EVENTOS
    eventListeners()
    function eventListeners() {
        
      btnEliminarProductos.addEventListener('click', () => restablecerCompra());

    // Eliminalos los productos por su ID
    infoProductos.addEventListener('click', eliminarProductos );

    // Aumentamos las cantidades desde el carrito
    infoProductos.addEventListener('click', aumentarProductos );
    // Disminuimos las cantidades desde el carrito
    infoProductos.addEventListener('click', disminuirProductos );

    // Compramos los productos
    pagarProductos.addEventListener('click', realizarCompra );
       
    document.addEventListener('DOMContentLoaded', () => {
      
      montoTotal(articulosCarrito);

      // Cargamos el carrito
      carritoHTML();
    });


    }

    // FUNCIONES
  async function realizarCompra(e) {
       const { id } = await obtenerDatosUsuario();
       if(articulosCarrito.length ) {
        const comprasUsuario = articulosCarrito.map( producto => ({ ...producto, idUsuario:id }));
        

        agregadoCarrito('Compra realizada correctamente');


        // Agregamos los productos
        insertarProductos(comprasUsuario);


        // Borramos los datos del carrito
        restablecerCompra();


        return;
       }
       
       // Mostramos una alerta de error
       alertaError('No hay ningun producto por comprar')

    }


    function carritoHTML() {
 
        vaciarCarrito();

    // Recorremos el carrito y generamos el HTML
    articulosCarrito.forEach( producto => {

    const {img, titulo, precio, cantidad, id} = producto;
    const div = document.createElement("DIV");
    div.classList.add('card','my-3','mx-2');
    div.innerHTML = `
            <div class="bg-transparent text-end">
              <i class="bi bi-x-circle mx-2" data-id="${id}"></i>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <div class="rounded-circle circle-1" style="margin: 10px;"></div>
              <div class="rounded-circle circle-2 position-absolute start-50 translate-middle"></div>
              <img src="${img}" class="card-img-top position-absolute start-50 translate-middle" alt="...">
            </div>
            <div class="card-body text-center">
              <p class="card-text">${titulo}</p>
              <p class="precio-servicio">${precio}</p>
              <div class="d-flex justify-content-center align-items-center">
                <div class="col">
                  <i class="bi bi-dash-circle m-0 menos-producto" data-id="${id}"></i>
                </div>
                <div>
                  <p class="cantidad-producto m-0">${cantidad}</p>
                </div>
                <div class="col">
                  <i class="bi bi-plus-circle m-0 mas-producto" data-id="${id}"></i>
                </div>
              </div>
            </div>
    `;

    infoProductos.appendChild(div);

})
 // Calculamos el total de productos en el carrito
 cantidadTotal();
 
 // Sincronizamos todos los cambios realizados con el localStorage
 sincronizarStorage();

    };



// Elimina los productos del carrito en el DOM
function eliminarProductos(e) {
    e.preventDefault();
 
    if(e.target.classList.contains('bi-x-circle') ) {
         const div = e.target.parentElement.parentElement;
         const productoId = div.querySelector('.bi-x-circle').dataset.id;
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
         
         montoTotal(articulosCarrito);

         carritoHTML();
    }
}


function cantidadTotal() {
    const cantidadProductosTotal = document.querySelector('.cantidad-productos-total');
    const cantidadTotal = articulosCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    cantidadProductosTotal.textContent = `${cantidadTotal} producto${cantidadTotal !== 1 ? 's' : ''} en el carrito`;
}


function aumentarProductos(e) {
  if(e.target.classList.contains('mas-producto')) {
    const div = e.target.parentElement.parentElement.parentElement.parentElement;
    const productoId = div.querySelector('.mas-producto').dataset.id;

    // Aumentamos la cantidad  del producto en el  carrito
    articulosCarrito = articulosCarrito.map(producto => {
       if(producto.id === productoId) {
        producto.cantidad++;
       }
       return producto;
    });

    montoTotal(articulosCarrito);

    carritoHTML();

  }
}

function disminuirProductos(e) {
  if(e.target.classList.contains('menos-producto')) {
    const div = e.target.parentElement.parentElement.parentElement.parentElement;
    const productoId = div.querySelector('.menos-producto').dataset.id;

    // Aumentamos la cantidad  del producto en el  carrito
    articulosCarrito = articulosCarrito.map(producto => {
      if (producto.id === productoId) {
          producto.cantidad--;
      }
      return producto;
    }).filter( producto => producto.cantidad > 0 );
    
    montoTotal(articulosCarrito);

    carritoHTML();

  }
}


function montoTotal(productos) {
  const momtoTotal = document.querySelector('.monto-total');

  const totalPagar = productos.reduce((total, producto) => {
    const precioAcortado = Number(producto.precio.substring(3));
    return total + (precioAcortado * producto.cantidad);
  }, 0);

  momtoTotal.textContent = `Monto total: S/.${parseFloat(totalPagar.toFixed(2))}`;
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function restablecerCompra() {
  // Vaciamos el carrito
  articulosCarrito = [];
  // Ponemos el monto total en 0
  montoTotal(articulosCarrito);
  // Sincronizamos el HTML
  carritoHTML();

}

// Eliminar los juegos del tbody
function vaciarCarrito() {
    while(infoProductos.firstChild){
        infoProductos.removeChild(infoProductos.firstChild);
    }
}
  
  })();
  
