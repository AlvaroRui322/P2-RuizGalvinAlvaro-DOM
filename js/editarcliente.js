// Importa las funciones para conectar a la base de datos, editar un cliente y obtener clientes
import { conectarDB, editarCliente, obtenerClientes } from './API.js';

// Ejecuta el código una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    conectarDB(); // Conecta a la base de datos
    const idCliente = obtenerIdCliente(); // Obtiene el ID del cliente desde la URL
    cargarDatosCliente(idCliente); // Carga los datos del cliente en el formulario

    // Selecciona el formulario y añade un listener para validar el formulario al enviar
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarFormulario);
});

/**
 * Función para obtener el ID del cliente desde los parámetros de la URL.
 * @returns {number} - El ID del cliente como un número.
 */
function obtenerIdCliente() {
    // Usa URLSearchParams para obtener el parámetro "id" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    return Number(urlParams.get('id')); // Convierte y devuelve el ID como número
}

/**
 * Función para cargar los datos de un cliente específico en el formulario.
 * @param {number} id - ID del cliente a cargar.
 */
function cargarDatosCliente(id) {
    // Obtiene la lista de clientes desde la base de datos
    obtenerClientes().then(clientes => {
        // Busca el cliente con el ID especificado
        const cliente = clientes.find(cliente => cliente.id === id);

        // Si se encuentra el cliente, llena los campos del formulario con sus datos
        if (cliente) {
            document.querySelector('#nombre').value = cliente.nombre;
            document.querySelector('#email').value = cliente.correo;
            document.querySelector('#telefono').value = cliente.telefono;
            document.querySelector('#empresa').value = cliente.empresa;
            document.querySelector('#id').value = cliente.id;
        }
    });
}

/**
 * Función para validar el formulario antes de enviar.
 * @param {Event} e - Evento de envío del formulario.
 */
function validarFormulario(e) {
    e.preventDefault(); // Evita el envío por defecto del formulario

    // Captura los valores de los campos del formulario
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;
    const id = Number(document.querySelector('#id').value); // Convierte el ID a número

    // Expresiones regulares para validar los campos de entrada
    const regexNombre = /^[a-zA-Z\s]{3,50}$/;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexTelefono = /^\d{7,14}$/;
    const regexEmpresa = /^[a-zA-Z\s]{3,50}$/;

    // Validación de los campos con mensajes de alerta en caso de error
    if (!regexNombre.test(nombre)) {
        alert('El nombre debe tener entre 3 y 50 caracteres y solo letras');
        return;
    }

    if (!regexEmail.test(email)) {
        alert('Ingrese un correo electrónico válido');
        return;
    }

    if (!regexTelefono.test(telefono)) {
        alert('El teléfono debe tener entre 7 y 14 dígitos');
        return;
    }

    if (!regexEmpresa.test(empresa)) {
        alert('La empresa debe tener entre 3 y 50 caracteres y solo letras');
        return;
    }

    // Si la validación pasa, crea un objeto con los datos actualizados del cliente
    const clienteActualizado = { nombre, correo: email, telefono, empresa, id };

    // Llama a la función editarCliente para actualizar el cliente en la base de datos
    editarCliente(clienteActualizado)
        .then(() => {
            // Muestra una alerta de éxito y redirige a la página principal
            alert('Cliente actualizado correctamente');
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Error al actualizar el cliente:', error)); // Maneja errores de actualización
}