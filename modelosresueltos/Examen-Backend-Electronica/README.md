# Repaso Examen: API CRUD con Express y MongoDB 🖥️

## Descripción del Proyecto 📋

En este proyecto, desarrollarás una API RESTful utilizando **Express** y **MongoDB** que permitirá realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de productos electrónicos. La aplicación tomará como base el archivo `electronicos.json`, que contiene detalles de productos electrónicos, como su nombre, precio y categorías. Tu objetivo es modelar y manipular esta información mediante una API que siga las prácticas de desarrollo vistas en clase.

> **Instrucciones:** Al finalizar, deberás completar este README.md con una documentación detallada de los endpoints de tu API. Asegúrate de incluir para cada endpoint:
> - Método HTTP (GET, POST, PUT, DELETE).
> - Ruta del endpoint.
> - Descripción de parámetros o query params.
> - Ejemplo del cuerpo de solicitud (si aplica).
> - Posibles respuestas en formato JSON.
> - Códigos de estado HTTP asociados.
> 
> Esta documentación te ayudará a estructurar tu API de forma clara y a mejorar la comprensión de los usuarios.

## Entrega 📌

Deberás diseñar y desarrollar una API backend que maneje la información de productos electrónicos almacenada en MongoDB. Además, se espera que documentes los endpoints creados en el archivo README.md.

## Dataset Proporcionado 📂

- **electronicos.json**: Contiene detalles de productos electrónicos, incluyendo `codigo`, `nombre`, `precio`, y `categorias`. Este archivo será la referencia para el modelo de datos de MongoDB.

## Modelo de Base de Datos 📊

El archivo `electronicos.json` incluye propiedades de cada producto. Deberás crear un modelo en Mongoose llamado `Producto`, con al menos los siguientes campos:

- **codigo**: Número único que identifica cada producto.
- **nombre**: Nombre del producto (por ejemplo, "Notebook", "Smartphone X10").
- **precio**: Precio en formato decimal.
- **categorias**: Arreglo de categorías relacionadas al producto (ej. "Computación", "Electrónica").

## Funcionalidades del CRUD 🚀

1. **Obtener todos los productos**
2. **Obtener un producto por código**
3. **Filtrar productos**
4. **Agregar un nuevo producto**
5. **Actualizar un producto**
6. **Eliminar un producto**
7. **Control de Errores**

## Estructura del Repositorio 🗂️

```plaintext
/controllers
  - productoController.js
/json
  - electronicos.json
/README.md
/app.js
/config/
  - database.js
/models/
  - producto.js
/routes/
  - productoRoutes.js
```

### Descripción de Archivos 📝

- **/json**: Contiene el archivo electronicos.json con los datos de productos.
- **/README.md**: Archivo con la descripción del proyecto y pasos para ejecutarlo.
- **/app.js**: Archivo principal de la aplicación Express.
- **/config/database.js**: Configuración de la conexión a MongoDB.
- **/models/**: Contiene el modelo de datos `Producto` para MongoDB.
- **/routes/**: Define las rutas de los endpoints del CRUD.

## Instrucciones de Entrega 🚀

1. **Fork** el repositorio desde [aquí](https://github.com/FabioDrizZt/UCSE-Trabajo-Integrador-Backend/fork).
2. **Clona** tu fork en tu máquina local.
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio-fork.git
   ```
3. Realiza los cambios y sube tu código a tu fork.
4. **Sube** los cambios a tu fork.
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin main
   ```
5. Agrega a los siguientes usuarios como colaboradores en tu repositorio:
   - [FabioDrizZt](https://github.com/FabioDrizZt)
   - [Fer24Sanchez](https://github.com/fer24sanchez)
   - [GabrielaEBejarano](https://github.com/gabrielaebejarano)

## Conclusión 🎉

Este proyecto te permitirá aplicar los conceptos clave de desarrollo backend con Express y Mongoose, además de gestionar datos en MongoDB. ¡Recuerda mantener tu código organizado y bien documentado!
