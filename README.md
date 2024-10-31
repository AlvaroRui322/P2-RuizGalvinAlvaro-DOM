# CRM con IndexedDB

Este proyecto es una aplicación para gestionar clientes (CRM) que funciona directamente en el navegador y usa IndexedDB para almacenar los datos localmente. Con esta app, puedes agregar, editar, eliminar y ver clientes de manera local, sin depender de un servidor.

## Funcionalidades

- **Agregar Clientes**: Registra un nuevo cliente con su nombre, correo electrónico, teléfono y empresa.
- **Editar Clientes**: Permite modificar los datos de clientes que ya están en la base.
- **Eliminar Clientes**: Borra a un cliente de la base de datos.
- **Ver Clientes**: Lista todos los clientes en una tabla, para que sea más fácil revisar la información.
- **Validación de Campos**: Asegura que los datos ingresados cumplan con los formatos esperados.

## Tecnologías Usadas

- **JavaScript**: Para manejar la lógica de la aplicación y el DOM.
- **IndexedDB**: Base de datos del navegador para almacenar los datos localmente.
- **HTML y CSS**: Estructura y diseño de la aplicación.

## Estructura de Archivos

- `index.html`: Página principal donde se lista a los clientes.
- `API.js`: Archivo que maneja la conexión y operaciones en IndexedDB.
- `app.js`: Lógica para mostrar los clientes en la tabla principal.
- `editarcliente.js`: Script para cargar los datos de un cliente en el formulario de edición.
- `nuevocliente.js`: Controla el formulario para agregar nuevos clientes.
- `funciones.js`: Módulo con algunas funciones de validación para los formularios.