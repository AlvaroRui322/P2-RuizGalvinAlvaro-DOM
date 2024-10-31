# IndexedDB Cheatsheet

## 1. Conceptos básicos

### 1.1. ¿Qué es IndexedDB?

IndexedDB es una base de datos orientada a objetos en el navegador. Permite almacenar grandes cantidades de datos y realizar 
búsquedas eficientes. La diferencia entre IndexedDB y LocalStorage es que el primero permite almacenar datos estructurados y 
realizar consultas más avanzadas.

### 1.2. Características principales:

- Posibilidad de almacenar datos como objetos, cadenas, números, etc.
- Admite transacciones atómicas. Esto significa que agrupa varias operaciones de lectura/escritura dentro de una transacción.
Esto garantiza que todas las operaciones dentro de ella se completen o si ocurre cualquier error, no se aplique ninguna.
- Funciona de manera asíncrona, haciendo que su rendimiento sea mayor.


## 2. Configuración de IndexedDB

### 2.1. Abrir una base de datos

- Usamos indexedDB.open() para inicializar la base de datos, recibiendo un nombre y una versión.
- Usamos onerror y onsuccess para confirmar la apertura de la bd.

````javascript
let request = indexedDB.open('CRM', 1);
request.onerror = (event) => console.error('Error al abrir la base de datos');
request.onsuccess = (event) => db = event.target.result;
````


### 2.2. Crear base de datos y estructura

````javascript
request.onupgradeneeded = (event) => {
    let db = event.target.result;
    let store = db.createObjectStore('clientes', { keyPath: "id", autoIncrement: true});
    store.createIndex("nombre", { unique: false });
}
`````

Este evento se disparará cuando se abra una base de datos nueva o se incremente la versión de la misma. Se configuran "object stores"
que en esta base de datos será lo equivalente a las tablas e "índices" para realizar búsquedas.


## 3. Operaciones CRUD (Create, Read, Update, Delete)

### 3.1. Insertar datos (Create)

````javascript
let transaction = db.transaction("clientes","readwrite");
let store = transaction.objectStore("clientes");

store.add({ nombre: "Carlos", email: "carloschulete@gmail.com"});

transaction.oncomplete = () => console.log("Cliente añadido");
transaction.onerror = () => console.log("Error en la transacción");
````

La transacción readwrite permitirá modificar la base de datos y con add() insertaremos un objeto en el object store.

### 3.2. Leer datos

Tenemos dos maneras, por clave o por índices.

- Por clave:
````javascript
store.get(id).onsuccess = (event) => console.log(event.target.result);
````

- Por índices:
````javascript
let index = store.index("nombre");
index.get("Pepe").onsuccess = (event) => console.log(event.target.result);
````

### 3.3. Actualizar datos
````javascript
let request = store.put({ id: 1, nombre: "Francisco", email: "franrodriguezdiz@gmail.com"});
request.onsuccess = () => console.log("Cliente actualizado");
````
Usamos put() para agregar o actualizar datos en función de la clave primaria.


### 3.4. Eliminar datos
````javascript
let deleteRequest = store.delete(id);
deleteRequest.onsuccess = () => console.log("Cliente eliminado");
````
Usamos delete() para eliminar un objeto según su clave.

## 4. Transacciones en IndexedDB

### 4.1. Concepto de transacción
IndexedDB utiliza transacciones para agrupar varias operaciones. Cada transacción puede estar o bien en modo readonly o 
readwrite. Además como dijimos anteriormente es atómica: se completa completamente o se deshace.

### 4.2. Declarar una transacción
````javascript
let transaction = db.transaction("clientes", "readwrite");
let store = transaction.objectStore("clientes");
````

### 4.3. Finalizar transacciones (control de errores)
````javascript
transaccion.oncomplete = () => console.log("Transacción completada");
transaccion.onerror = () => console.log("Error en la tranacción");
````
Estos dos métodos oncomplete y onerror sirven para comprobar si una transacción salió bien o si ocurrió algún error.


## 5. Consultas Avanzadas y Optimizaciones

### 5.1. Cursores para iterar sobre datos

````javascript
store.openCursor().onsuccess = (event) => {
    let cursor = event.target.result;
    if (cursor) {
        console.log(cursor.value);
        cursor.continue();
    }
}
````
Los cursores permiten recorrer registros sin cargarlos todos en memoria, lo que se traduce en una herramienta muy útil
para consultas de grandes volúmenes de datos.


### 5.2. Consultas por rango

IndexedDB permite realizar consultas utilizando rangos de valores, lo cual facilita la obtención de registros que cumplan
ciertos criterios.

````javascript
let index = store.index("nombre");
let range = IDBKeyRange.bound("A", "M");
index.openCursor(range).onsuccess = (event) => {
    let cursor = event.target.result;
    if (cursor) {
        console.log(cursor.value);
        cursor.continue();
    }
}
````

### 5.3. Transacciones en modo lectura (readonly)

````javascript
let transaction = db.transaction("clientes","readonly");
let store = transaction.objectStore("clientes");

store.getAll().onsuccess = (event) => {
    let clientes = event.target.result;
    console.log(clientes);
};
````

### 5.4. Manejo de errores

````javascript
let request = store.get(id);
request.onsuccess = (event) => {
    console.log(event.target.result);
};
request.onerror = () => {
    console.error("Error al recuperar al cliente");
}
````

### Referencias

https://javascript.info/indexeddb#open-database
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB














