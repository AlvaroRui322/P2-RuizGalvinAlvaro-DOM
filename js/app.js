// Importa funciones para obtener y eliminar clientes desde la API
import { obtenerClientes, eliminarCliente } from './API.js';

// Ejecuta la función mostrarClientes() una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    mostrarClientes();
});

/**
 * Función para mostrar la lista de clientes en la interfaz.
 * Obtiene los clientes de la base de datos y los muestra en una tabla.
 */
function mostrarClientes() {
    // Selecciona el contenedor de la tabla de clientes
    const listadoClientes = document.querySelector('#listado-clientes');

    // Llama a la función obtenerClientes para obtener la lista de clientes desde la base de datos
    obtenerClientes()
        .then(clientes => {
            // Itera sobre cada cliente y crea una fila en la tabla
            clientes.forEach(cliente => {
                // Extrae las propiedades del objeto cliente
                const { nombre, telefono, empresa, id } = cliente;

                // Crea una fila (tr) en la tabla para mostrar los datos del cliente
                const row = document.createElement('tr');

                // Define el contenido HTML de la fila
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span class="text-gray-700">${nombre}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span class="text-gray-700">${telefono}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span class="text-gray-700">${empresa}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <button 
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded eliminar"
                            data-cliente="${id}">
                            Eliminar
                        </button>
                        <button 
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded editar"
                            data-cliente="${id}">
                            Editar
                        </button>
                    </td>
                `;

                // Agrega la fila creada a la tabla de clientes en el DOM
                listadoClientes.appendChild(row);
            });

            // Añade un listener a la tabla para manejar los clics en los botones de cada fila
            listadoClientes.addEventListener('click', handleClick);
        })
        .catch(error => console.error('Error al mostrar los clientes:', error)); // Maneja cualquier error de obtención de clientes
}

/**
 * Función manejadora de eventos de clic en los botones de eliminar y editar.
 * @param {Event} e - El evento de clic.
 */
function handleClick(e) {
    // Verifica si el botón presionado es el de eliminar
    if (e.target.classList.contains('eliminar')) {
        // Obtiene el ID del cliente desde el atributo data-cliente
        const id = Number(e.target.dataset.cliente);

        // Llama a la función eliminarCliente pasando el ID
        eliminarCliente(id)
            .then(() => {
                // Elimina la fila de la tabla del DOM una vez que el cliente ha sido eliminado de la base de datos
                e.target.closest('tr').remove();
            })
            .catch(error => console.error('Error al eliminar el cliente:', error)); // Maneja cualquier error al eliminar el cliente
    }

    // Verifica si el botón presionado es el de editar
    if (e.target.classList.contains('editar')) {
        // Obtiene el ID del cliente y redirige a la página de edición con el ID en la URL
        const id = e.target.dataset.cliente;
        window.location.href = `editar-cliente.html?id=${id}`;
    }
}