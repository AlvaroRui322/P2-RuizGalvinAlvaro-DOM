// Importa la función para agregar un cliente desde la API
import { agregarCliente } from './API.js';

// Ejecuta el código una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el formulario y agrega un evento para validar al enviar
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarFormulario);
});

/**
 * Función para validar el formulario antes de agregar un cliente.
 * @param {Event} e - Evento de envío del formulario.
 */
function validarFormulario(e) {
    e.preventDefault(); // Previene el envío por defecto del formulario

    // Captura los valores de los campos de entrada del formulario
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    // Expresiones regulares para validar los campos de entrada
    const regexNombre = /^[a-zA-Z\s]{3,50}$/;     // Solo letras y espacios, entre 3 y 50 caracteres
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Formato de correo electrónico
    const regexTelefono = /^\d{7,14}$/;           // Solo dígitos, entre 7 y 14
    const regexEmpresa = /^[a-zA-Z\s]{3,50}$/;    // Solo letras y espacios, entre 3 y 50 caracteres

    // Validaciones y alertas para cada campo en caso de datos incorrectos
    if (!regexNombre.test(nombre)) {
        alert('El nombre debe tener entre 3 y 50 caracteres y solo letras.');
        return;
    }

    if (!regexEmail.test(email)) {
        alert('Ingrese un correo electrónico válido.');
        return;
    }

    if (!regexTelefono.test(telefono)) {
        alert('El teléfono debe tener entre 7 y 14 dígitos.');
        return;
    }

    if (!regexEmpresa.test(empresa)) {
        alert('La empresa debe tener entre 3 y 50 caracteres y solo letras.');
        return;
    }

    // Si la validación pasa, crea un objeto con los datos del cliente
    const cliente = { nombre, correo: email, telefono, empresa };

    // Llama a agregarCliente() para añadir el cliente a la base de datos
    agregarCliente(cliente)
        .then(() => {
            // Muestra un mensaje de éxito y redirige a la página principal
            alert('Cliente agregado correctamente');
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Error al agregar el cliente:', error)); // Maneja errores de adición
}