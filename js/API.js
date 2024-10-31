// Variable para almacenar la conexión a la base de datos
let db;

/**
 * Función para conectar a la base de datos de IndexedDB.
 * @returns {Promise} - Promesa que se resuelve con la conexión a la base de datos.
 */
export function conectarDB() {
    return new Promise((resolve, reject) => {
        // Abrimos una conexión a la base de datos 'CRM' en su versión 1
        const abrirConexion = indexedDB.open('CRM', 1);

        // Maneja el error al abrir la conexión
        abrirConexion.onerror = () => {
            console.error('Error al abrir la base de datos');
            reject('No se pudo conectar a la base de datos');
        };

        // Maneja el éxito al abrir la conexión
        abrirConexion.onsuccess = () => {
            db = abrirConexion.result; // Almacena la conexión en la variable global 'db'
            resolve(db); // Resuelve la promesa con la conexión a la base de datos
        };

        // Configuración inicial de la base de datos o al actualizar su versión
        abrirConexion.onupgradeneeded = (e) => {
            const db = e.target.result;

            // Crea un almacén de objetos llamado 'clientes' con 'id' como clave primaria y autoincremento
            const objectStore = db.createObjectStore('clientes', {
                keyPath: 'id',
                autoIncrement: true
            });

            // Índices para realizar consultas rápidas
            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('correo', 'correo', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
        };
    });
}

/**
 * Función para actualizar la información de un cliente.
 * @param {Object} cliente - Objeto cliente con los datos actualizados.
 * @returns {Promise} - Promesa que se resuelve si el cliente fue actualizado exitosamente.
 */
export function editarCliente(cliente) {
    return conectarDB().then((db) => {
        return new Promise((resolve, reject) => {
            // Inicia una transacción en el almacén 'clientes' con permisos de lectura y escritura
            const transaction = db.transaction(['clientes'], 'readwrite');
            const objectStore = transaction.objectStore('clientes');

            // Realiza la operación de actualización
            const request = objectStore.put(cliente);

            // Resuelve la promesa si la operación fue exitosa
            request.onsuccess = () => resolve();

            // Rechaza la promesa en caso de error
            request.onerror = () => reject('Error al actualizar el cliente');
        });
    });
}

/**
 * Función para agregar un nuevo cliente a la base de datos.
 * @param {Object} cliente - Objeto cliente con los datos del nuevo cliente.
 * @returns {Promise} - Promesa que se resuelve si el cliente fue agregado exitosamente.
 */
export function agregarCliente(cliente) {
    return conectarDB().then((db) => {
        return new Promise((resolve, reject) => {
            // Inicia una transacción en el almacén 'clientes' con permisos de lectura y escritura
            const transaction = db.transaction(['clientes'], 'readwrite');
            const objectStore = transaction.objectStore('clientes');

            // Realiza la operación de inserción
            const request = objectStore.add(cliente);

            // Resuelve la promesa si la operación fue exitosa
            request.onsuccess = () => resolve();

            // Rechaza la promesa en caso de error
            request.onerror = () => reject('Error al agregar el cliente');
        });
    });
}

/**
 * Función para obtener todos los clientes de la base de datos.
 * @returns {Promise} - Promesa que se resuelve con un array de todos los clientes.
 */
export function obtenerClientes() {
    return conectarDB().then((db) => {
        return new Promise((resolve, reject) => {
            // Inicia una transacción en el almacén 'clientes' con permisos de solo lectura
            const transaction = db.transaction(['clientes'], 'readonly');
            const objectStore = transaction.objectStore('clientes');
            const clientes = [];

            // Abre un cursor para recorrer todos los registros en el almacén
            objectStore.openCursor().onsuccess = (e) => {
                const cursor = e.target.result;

                // Si hay un cliente en el cursor, lo agrega al array y continúa
                if (cursor) {
                    clientes.push(cursor.value);
                    cursor.continue();
                } else {
                    // Resuelve la promesa con el array completo de clientes cuando finaliza el cursor
                    resolve(clientes);
                }
            };

            // Rechaza la promesa en caso de error en la transacción
            transaction.onerror = () => reject('Error al obtener los clientes');
        });
    });
}

/**
 * Función para eliminar un cliente de la base de datos.
 * @param {number} id - ID del cliente a eliminar.
 * @returns {Promise} - Promesa que se resuelve si el cliente fue eliminado exitosamente.
 */
export function eliminarCliente(id) {
    return conectarDB().then((db) => {
        return new Promise((resolve, reject) => {
            // Inicia una transacción en el almacén 'clientes' con permisos de lectura y escritura
            const transaction = db.transaction(['clientes'], 'readwrite');
            const objectStore = transaction.objectStore('clientes');

            // Realiza la operación de eliminación
            const request = objectStore.delete(id);

            // Resuelve la promesa si la operación fue exitosa
            request.onsuccess = () => resolve();

            // Rechaza la promesa en caso de error
            request.onerror = () => reject('Error al eliminar el cliente');
        });
    });
}


