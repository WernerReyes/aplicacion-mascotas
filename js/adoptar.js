import { obtenerMascotas, obtenerDatosUsuario } from './conectar.js';
import { limpiar, alertaProductos } from './funciones.js';

( function()  {
    // VARIABLES
    const masFiltros = document.querySelector('.mas-filtros');
    const cerrarFiltros = document.querySelector('#contenido i');
    // Especie
    const filtraGatos = document.querySelector('.btn-filtrar-gato');
    const filtraPerros = document.querySelector('.btn-filtrar-perro');
    // Raza
    const mascotaSelect = document.querySelector('.select-mascotas');
    // Sexo
    const filtrarMacho = document.querySelector('.macho');
    const filtrarHembra = document.querySelector('.hembra');
    // Edad
    const filtrarEdadMascota = document.querySelector('#edad-mascota');
    const filtrarSmallMascota = document.querySelector('.mascota-small');
    // Tamaño
    const filtrarMedianoMascota = document.querySelector('.mascota-mediano');
    const filtrarGrandeMascota = document.querySelector('.mascota-grande');
    // Personsalidad
    const mascotaEnergetico = document.querySelector('.mascota-energetico');
    const mascotaJugueton = document.querySelector('.mascota-calmado');
    const mascotaObediente = document.querySelector('.mascota-obediente');
    const mascotaAfectuoso = document.querySelector('.mascota-cariñoso');
    const mascotaTranquilo = document.querySelector('.mascota-timido');
    const mascotaCurioo = document.querySelector('.mascota-curioso');
    // Busqueda
    const buscarMascota = document.querySelector('.buscar-mascota');
    // Borrar filtros
    const btnBorrarFiltros = document.querySelector('.btn-borrar-filtros');

    const datosFiltrar = {
        especie: '',
        raza: '',
        macho: '',
        hembra: '',
        edad: '',
        pequeño: '',
        mediano: '',
        grande: '',
        personalidad: '',
        busqueda: ''
      }

      let mascotaAdoptar = [];

    // EVENTOS
    eventListeners()
    function eventListeners() {
        masFiltros.addEventListener('click', mostrarModal );
        cerrarFiltros.addEventListener('click', cerrarModal );

        // Cuando el documento la ya esta listo
        document.addEventListener('DOMContentLoaded',async () => {
          const { nombres } = await obtenerDatosUsuario();
          const tituloMotivador = document.querySelector('.titulo-motivador');
          tituloMotivador.textContent = `¡${nombres} adopta y salva vidas!`
          
          // Insertamos el HTML
          const mascotas = await obtenerMascotas();
          mascotasHTML(mascotas);

            // Filtración por especie
            filtrarEspecie(filtraGatos);
            filtrarEspecie(filtraPerros);
             
            // Llenamos el select
            llenarSelect(mascotas);
            // Filtrar por raza
            filtrarRaza(mascotaSelect)

            // Filtrar por sexo
            filtrarSexo(filtrarMacho, 'macho');
            filtrarSexo(filtrarHembra, 'hembra');

            // Filtrar por edad
            filtrarEdad(filtrarEdadMascota)

            // Filtrar por tamaño
            filtrarSize(filtrarSmallMascota, 'pequeño')
            filtrarSize(filtrarMedianoMascota, 'mediano')
            filtrarSize(filtrarGrandeMascota, 'grande')

            // Filtrar por Personalidad
            filtrarPersonalidad(mascotaEnergetico, 'energético');
            filtrarPersonalidad(mascotaJugueton, 'juguetón');
            filtrarPersonalidad(mascotaObediente, 'obediente');
            filtrarPersonalidad(mascotaAfectuoso, 'cariñoso');
            filtrarPersonalidad(mascotaTranquilo, 'tranquilo');
            filtrarPersonalidad(mascotaCurioo, 'curioso');
            
            // Filtrar por busqueda
            filtrarBusqueda(buscarMascota);

            // Borramos todos los filtros
            btnBorrarFiltros.addEventListener('click', e => {
              e.preventDefault();
              
              // Vaciamos el Objeto
              Object.keys(datosFiltrar).forEach( propiedad => datosFiltrar[propiedad] = '');
          
                // Restablecemos visualmente los elementos de filtro
                document.querySelectorAll('.filtro-activo').forEach(btn => {
                btn.classList.remove('filtro-activo');
                btn.style.background = '#AAD1FA';
            });
            
            // Resetemos todo el formulario
            document.querySelector('#formulario').reset();

                filtrarMascotas();
       
               
            })

            

        })
}
    

    // FUNCIONES
    // <!-- Filtrado -->
// Función para filtrar la especie
let botonActivo = null;
function filtrarEspecie(btn) {
 
  btn.addEventListener('click', () => {
    // Verificar si el botón está activo
    const estaActivo = btn.classList.contains('filtro-activo');

    // Desactivar el botón actualmente activo
    if (botonActivo && botonActivo !== btn) {
      botonActivo.classList.remove('filtro-activo');
      botonActivo.style.background = '#AAD1FA';

    }

    // Activar/desactivar el botón actual
    if (!estaActivo) {
      btn.classList.add('filtro-activo');
      btn.style.background = '#55A5FA';
      botonActivo = btn;
      
      // Guardamos en el objeto
      datosFiltrar['especie'] = botonActivo.value;

    } else {
      btn.classList.remove('filtro-activo');
      btn.style.background = '#AAD1FA';
      botonActivo = null;      
    }

    filtrarMascotas();

  });
}

// Funcion para filtrar la raza
function filtrarRaza(select) {
  select.addEventListener('change', e => {
     datosFiltrar['raza'] = e.target.value;
     console.log(datosFiltrar);
     filtrarMascotas();
  })
}

// Funcion para filtrar el sexo
function filtrarSexo(btn, sexo) {
  btn.addEventListener('click', e => {
    if(e.target.checked) {
      datosFiltrar[sexo] = sexo;
    } else {
      datosFiltrar[sexo] = '';
    }
    
    filtrarMascotas();
  })
}

// Funcion para filtrar la edad
function filtrarEdad(range) {
  const pEdad = range.nextElementSibling;
  
  range.addEventListener('input', (e) => {
    datosFiltrar['edad'] = e.target.value;

    pEdad.textContent = `${e.target.value} ${e.target.value == 1 ? 'año' : 'años'}`;

    filtrarMascotas();
  })

}

// Funcion para filtra por tamaño
function filtrarSize(btn, size) {
  btn.addEventListener('click', e => {
    if (e.target.checked) {
      datosFiltrar[size] = size;
    } else {
      datosFiltrar[size] = '';
    }

    filtrarMascotas();
  })
}

// Funcion para filtrar la Personalidad
function filtrarPersonalidad(btn, personalidad) {
  btn.addEventListener('click', e => {
    e.preventDefault();
    
    datosFiltrar['personalidad'] = personalidad;
    filtrarMascotas();
  })
}

// Funcion para filtrar la Busqueda
function filtrarBusqueda(input) {
  input.addEventListener('input', e => {
     datosFiltrar['busqueda'] = e.target.value.trim();
     filtrarMascotas();
  })
}



    async function filtrarMascotas() {
      const mascotas = await obtenerMascotas();
     
      const filtrado = mascotas.filter( filtrarEsp ).filter( filtrarRaz ). filter( filtarSex )
                               .filter( filtrarEd ).filter( filtrarSiz ).filter( filtrarPersonalid )
                               .filter( filtrarBusqda );

      if(filtrado.length ) {
        mascotasHTML(filtrado);
        return;
      }

     const contenedorMascota = document.querySelector('#mascotas .container .row');
     alertaProductos(contenedorMascota, 'No se encontro ningun resultado')

    }
    
    function filtrarEsp(mascota) {
      const { especie } = datosFiltrar;
      if( especie && botonActivo ) {
        console.log(mascota.especie.toLowerCase(), especie);
        return mascota.especie.toLowerCase() === especie;
      }
      
      return mascota;
    }

    function filtrarRaz(mascota) {
      const { raza } = datosFiltrar;
      if( raza && raza !== 'Seleccionar' ) {
        return mascota.raza === raza;
      }
      return mascota;
    }

    function filtarSex(mascota) {
      const { macho, hembra } = datosFiltrar;
      if(macho || hembra ) {
        return [macho, hembra].includes(mascota.sexo.toLowerCase());
      }
      
      return mascota;
    }

    function filtrarEd(mascota) {
      const { edad } = datosFiltrar;
      if( edad ) {
        return mascota.edad === Number(edad);
      }

      return mascota;
    }

    function filtrarSiz(mascota) {
      const { pequeño, mediano, grande } = datosFiltrar;
      if( pequeño || mediano || grande ) {
        return [pequeño, mediano, grande].includes(mascota.tamaño.toLowerCase());

      }
     return mascota;
    }

    function filtrarPersonalid(mascota) {
      const { personalidad } = datosFiltrar;

      if(personalidad ) {
        return mascota.descripcion.includes(personalidad);
      }
      return mascota;
    }

    function filtrarBusqda(mascota) {
      const { busqueda } = datosFiltrar;
      const letraBusqueda = busqueda.toLowerCase().trimStart()[0];
      if(busqueda) {
        return mascota.raza.toLowerCase().startsWith(letraBusqueda) && 
               mascota.raza.toLowerCase().includes(busqueda.toLowerCase().trim());
      }

      return mascota;

    }
  // <!-- Fin filtrado -->

  function llenarSelect(mascotas) {  
     mascotas.forEach( mascota => {
       const { raza } = mascota;
       
       // CREAMOS LOS OPTIONS
       const mascotaOptions = document.createElement('OPTION');
       mascotaOptions.textContent = raza;
       mascotaOptions.value = raza;



       mascotaSelect.appendChild(mascotaOptions);
     })
  }
  
    async function mascotasHTML(mascotas) {
        const contenedorMascota = document.querySelector('#mascotas .container .row');
        
        limpiar(contenedorMascota);

        mascotas.forEach( mascota => {

            const { id, nombre, raza, sexo, tamaño, especie, edad, img } = mascota;

            // SCRIPTING
            const divCol = document.createElement('DIV');
            divCol.classList.add('col');
                 const divCard = document.createElement('DIV');
                 divCard.classList.add('card', 'shadow-sm')
                 divCard.innerHTML = `<img class="p-3" src="${img}" alt="">`;
                     const divBody = document.createElement('DIV');
                     divBody.classList.add('card-body');
                         const sexoMascota = document.createElement('I');
                         sexoMascota.classList.add('bi', 'm-0', sexo === 'Macho' ? 'bi-gender-male' : 'bi-gender-female');
                         const nombreMascota = document.createElement('H3');
                         nombreMascota.classList.add('text-center','mb-0');
                         nombreMascota.textContent = nombre;
                         const razaMascota = document.createElement('P');
                         razaMascota.classList.add('text-center','raza-mascota');
                         razaMascota.textContent = raza;
                         const contentFlex = document.createElement('DIV');
                         contentFlex.classList.add('d-flex','justify-content-between','align-items-center','mt-3');
                             const btnGroup = document.createElement('DIV');
                             btnGroup.classList.add('btn-group');
                                 const btnSaberMas = document.createElement('BUTTON');
                                 btnSaberMas.classList.add('btn', 'btn-sm','btn-outline-secondary', 'saber-mas');
                                 btnSaberMas.dataset.id = id;
                                 btnSaberMas.dataset.tamaño = tamaño;
                                 btnSaberMas.textContent = 'Saber mas';
                                 btnSaberMas.onclick = () => mostrarMasInformacion(mascota, id) ;
                                 const btnMeGusta = document.createElement('BUTTON');
                                 btnMeGusta.classList.add('btn', 'btn-sm','btn-outline-secondary', 'me-gusta');
                                 btnMeGusta.dataset.id = id;
                                 btnMeGusta.dataset.especie = especie;
                                 btnMeGusta.innerHTML = '<span class="bi bi-heart"></span>';
                                 btnMeGusta.onclick = () => console.log("Me gusta...");
                            const edadMascota = document.createElement('SMALL');
                            edadMascota.classList.add('text-body-secondary');
                            edadMascota.textContent = `${edad} años`

                            btnGroup.appendChild(btnSaberMas);
                            btnGroup.appendChild(btnMeGusta);
                        contentFlex.appendChild(btnGroup);
                        contentFlex.appendChild(edadMascota);
                     divBody.appendChild(sexoMascota);
                     divBody.appendChild(nombreMascota);
                     divBody.appendChild(razaMascota);
                     divBody.appendChild(contentFlex);
                 divCard.appendChild(divBody);
            divCol.appendChild(divCard);

            // Insertamos en el HTML
            contenedorMascota.appendChild(divCol);
            
        });
    }

    function mostrarMasInformacion(mascota, id) {
        const infoModal = document.querySelector('#modal-adoptar .modal-body');
        const modal = new bootstrap.Modal(document.querySelector('#modal-adoptar'));
        modal.toggle();

        const { nombre, raza, sexo, tamaño, especie, edad, img, descripcion } = mascota;
        
        limpiar(infoModal);
        
        // MODAL
        const divAdoptar = document.createElement('DIV');
        divAdoptar.classList.add('modal-adoptar');
            const divImg = document.createElement('DIV');
            divImg.classList.add('text-center');
            divImg.innerHTML = `<img src="${img}" class="img-fluid" width="100%">`
            const divContenido = document.createElement('DIV');
            divContenido.classList.add('my-3','px-2','contenido');
            divContenido.innerHTML = `
            <div class="d-flex align-items-center">
                <i data-bs-dismiss="modal" aria-label="Close" class="bi bi-arrow-left-circle"></i>
                <h3 class="ms-2 mb-0 nombre-mascota">${nombre}</h3>
              </div>
              <div class="mt-2 d-flex justify-content-center">
                <div class="mx-2">
                  <label>Edad</label>
                  <p>${edad} años</p>
                </div>
                <div class="mx-2">
                  <label>Raza</label>
                  <p>${raza}</p>
                </div>
                <div class="mx-2">
                  <label>Sexo</label>
                  <p>${sexo}</p>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="mx-4">
                  <label>Tamaño</label>
                  <p>${tamaño}</p>
                </div>
                <div class="mx-4">
                  <label>Especie</label>
                  <p>${especie}</p>
                </div>
              </div>
              <div class="biografia">
                <label>Biografia</label>
                <p>${descripcion}</p>
              </div>
            `
                const divBtn = document.createElement("DIV");
                divBtn.classList.add('d-flex','justify-content-center');
                     const btnMeGusta = document.createElement('BUTTON');
                     btnMeGusta.classList.add('mx-2','me-gusta');
                     btnMeGusta.innerHTML = '<span class="bi bi-heart"></span>';
                     btnMeGusta.onclick = () => console.log("Me gusta...");
                     const btnAdoptar = document.createElement('BUTTON');
                     btnAdoptar.classList.add('mx-2','adoptar');
                     btnAdoptar.dataset.id = id;
                     btnAdoptar.textContent = 'Adoptar';
                     btnAdoptar.onclick = () => {
                      const mascota = { id, img, nombre };

                      if(!mascotaAdoptar.length) {
                        mascotaAdoptar = [...mascotaAdoptar, mascota];
                        
                        window.location.href = 'adoptar_mascota.html';

                        sincronizarStorage();

                        return;
                      } 
                      alert("Tienes una adopcion pendiente")

                      
                     };

               divBtn.appendChild(btnMeGusta);
               divBtn.appendChild(btnAdoptar);
            divContenido.appendChild(divBtn);
        divAdoptar.appendChild(divImg);
        divAdoptar.appendChild(divContenido);

        // Mostramos el contenido
        infoModal.appendChild(divAdoptar);
    }

    function mostrarModal() {
        const modal = document.querySelector('#pantalla-overlay');
        
        if(modal.classList.contains('d-none')) {
            modal.classList.remove('d-none');
            return;
        }    
    }

    function cerrarModal() {
        const modal = document.querySelector('#pantalla-overlay');
        
        if(!modal.classList.contains('d-none')) {
            modal.classList.add('d-none');
            return;
        } 
    }


    function sincronizarStorage() {
      localStorage.setItem('adoptar', JSON.stringify(mascotaAdoptar));
  }

})();