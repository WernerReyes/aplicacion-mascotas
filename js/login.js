import { validarCampos,validarEmail, validarPassword ,mostrarAlerta,
         mostrarPassword, alertaModal, modalCarga } from './funciones.js';
import { verificarUsuario } from './conectar.js';

( function() {

  // VARIABLES
  const formulario = document.querySelector('#formulario');
  const btnVerPassword = document.querySelector('span.ver-password');

  
  // EVENTOS
  eventListeners();
  function eventListeners() {
      
    formulario.addEventListener('submit', validarFormulario );
    
    // Mostramos o ocultamos la contraseña 
    mostrarPassword(btnVerPassword, formulario.querySelector('#password'));
  }

  // FUNCIONES
 async function validarFormulario(e) {
   e.preventDefault();
    
     // Obtenemos los datos
     const email = document.querySelector('#email').value;
     const password = document.querySelector('#password').value;
     
     // Guardamos en el objeto
     const usuario = { email, password };

     if(validarCampos(usuario)) {
      mostrarAlerta(formulario, `Es obligatorio llenar todos los campos`);
      return;
     }

     if(validarEmail(email)) {
      mostrarAlerta(formulario.querySelector('.div-email'), 'Este email no existe');
      return;
     }

     if(validarPassword(password)) {
      mostrarAlerta(formulario.querySelector('.div-password'),"Contraseña incorrecta")
      return;
     }
     
     // Comprobamos si el usuario existe para iniciar sesion
    const verificar = await verificarUsuario(usuario, 'login');
     if(!verificar) {
      alertaModal( document.querySelector('.container'),'Nombre de usuario o contraseña inválidos')
      return;
     };
     
 
        mostrarModal();
 }

function mostrarModal() {
  // Insertamos el contenido en el modal
  modalCarga('Loading...');

  // Abrimos y cerramos el modal
  const modal = new bootstrap.Modal(document.querySelector('.modal.fade'));
  modal.toggle();
  
  // Espera 5 segundos y redirige a otro HTML
  setTimeout( () => {
    window.location.href = 'inicio-api.html';
  },5000)

  // Reseteamos el formulario
  formulario.reset();

}

})();