import { validarCampos,validarEmail, validarPassword ,mostrarAlerta, 
         mostrarPassword, alertaModal } from './funciones.js';
import { nuevoUsuario, verificarUsuario } from './conectar.js';

( function() {

  // VARIABLES
  const formulario = document.querySelector('#formulario');
  const btnVerPassword = document.querySelector('span.ver-password');
  const btnConfirmarPassword = document.querySelector('span.confirmar-password');

  
  // EVENTOS
  eventListeners();
  function eventListeners() {
      
    formulario.addEventListener('submit', validarFormulario );
    
    // Mostramos o ocultamos la contraseña 
    mostrarPassword(btnVerPassword, formulario.querySelector('#password'));
  
    // Desabilitamos confirmar contraseña
    formulario.querySelector('#password').addEventListener('input', desabilitarConfirmarPassword );
  
  }

  // FUNCIONES
async function validarFormulario(e) {
    e.preventDefault();
    
     // Obtenemos los datos
     const nombres = document.querySelector('#nombres').value.trim();
     const apellidos = document.querySelector('#apellidos').value.trim();
     const numTelefono = document.querySelector('#numTelefono').value.trim();
     const email = document.querySelector('#email').value.trim();
     const password = document.querySelector('#password').value.trim();
     const confimarPassword = document.querySelector('#confirmarPassword').value.trim();
   
     // Guardamos en el objeto
     const usuario = { nombres, apellidos, numTelefono, email, password };

     
     if(validarCampos(usuario)) {
      mostrarAlerta(formulario, `Es obligatorio llenar todos los campos`);
      return;
     }

     if(numTelefono.length !== 9) {
      mostrarAlerta(formulario.querySelector('.div-telefono'), numTelefono.length < 9 ? 'Faltan mas digitos a ingresar' : 'Demasiados digitos ingresados')
      return;
     }

     if(validarEmail(email)) {
      mostrarAlerta(formulario.querySelector('.div-email'), 'El correo electrónico proporcionado no cumple con los requisitos necesarios');
      return;
     }

     if(validarPassword(password)) {
      mostrarAlerta(formulario.querySelector('.div-password'),"Por favor, elige una contraseña segura: al menos 8 caracteres, una mayúscula, una minúscula y un número")
      return;
     }

     if(confimarPassword !== password) {
      mostrarAlerta(formulario.querySelector('.div-confirmar-password'), "La confirmacion de contraseña es incorrecta");
      return;
     }

     // Comprobamos si el usuario existe para inscribirse
     const verificar = await verificarUsuario(usuario, 'crear-cuenta');
     if(verificar) {
      alertaModal( document.querySelector('.container'), `El usuario "${usuario.email}" ya existe, prueba con otro`)
      return;
     };
     
     // Registramos nuevo usuarios
     nuevoUsuario(usuario);

     // Pasamos a la siguiente pagina
     mostrarModal(usuario.nombres);

     // Reseteamos el formulario
     formulario.reset();
     
 }

 function desabilitarConfirmarPassword(e) {
  if(e.target.value.length > 0) {
    formulario.querySelector('#confirmarPassword').disabled = false

    mostrarPassword(btnConfirmarPassword, formulario.querySelector('#confirmarPassword'));
    return;
  }
  
  formulario.querySelector('#confirmarPassword').disabled = true;

 }


 function mostrarModal(nombres) {
  // Abrimos y cerramos el modal
  const modal = new bootstrap.Modal(document.querySelector('.modal.fade'));
  modal.toggle();
  
  // Creamos el nuevo usuario
  const nombresUsuario = document.createElement('P');
  nombresUsuario.classList.add('usuario');
  nombresUsuario.textContent = `Gracias por registrarte ${nombres}`;
  
  // Insertamos en el HTML
  const divPadre = document.querySelector('.div-cuenta-creada');
  divPadre.appendChild(nombresUsuario);

  // Podemos ir al fromulario de inscribirnos
 divPadre.querySelector('button').onclick = () => window.location.href = 'login.html';
    
 }
 
})();