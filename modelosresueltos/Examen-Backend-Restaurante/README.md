# Recuperatorio de Backend: API REST de Menú de Restaurante 🍽️

Bienvenid@ al Recuperatorio de Backend de la materia Programación II. En esta oportunidad, nos convertiremos en chefs de código para construir una **API RESTful** que gestione el menú de un restaurante.

## Descripción del Proyecto 📋

El objetivo es desarrollar una API utilizando **Express.js** que permita administrar una colección de platos. A diferencia de un sistema con una base de datos predefinida, aquí tendrán la libertad de elegir su propio conjunto de datos, lo que les permitirá adaptar la API a diferentes tipos de platos.

La API deberá implementar un **CRUD básico** y, además, incluir una serie de **endpoints especializados** diseñados para que pongan en práctica los conceptos fundamentales de las API REST.

### ¡Tu Misión, si decides aceptarla! 🚀

Dentro del directorio `/data` encontrarás el archivo `menu.json`, que contiene una lista de platos para un restaurante. Este será el "catálogo" que gestionará tu API. Deberás adaptar tu código (especialmente el modelo) para que funcione correctamente con la estructura de datos de este archivo.

## Modelo de Datos 📊

Los datos de los platos tienen una estructura base que incluye `id`, `nombre`, `descripcion`, `precio` y `categoria`.

Deberán definir un **modelo de Mongoose** que sea lo suficientemente flexible para manejar los platos del archivo JSON que elijan. Esto implica:
1.  Conectar su aplicación a una base de datos de **MongoDB**.
2.  Crear un `Schema` de Mongoose que se corresponda con la estructura de los datos.
3.  Implementar una lógica (puede ser un script aparte o una ruta protegida) para **poblar la base de datos** una única vez con los datos del archivo `.json` seleccionado.

> **¡IMPORTANTE!** 🔐 Para gestionar la cadena de conexión de MongoDB y otros datos sensibles, es fundamental que utilicen un archivo `.env`. **Nunca suban datos sensibles a un repositorio de Git**. Asegúrense de incluir el archivo `.env` y `node_modules` en su `.gitignore`.

## Endpoints Requeridos 🔍

La API debe contar con los siguientes endpoints:

### CRUD Básico

<details>
  <summary><code>GET /platos</code></summary>

  - **Descripción**: Devuelve la lista completa de platos del menú.
  - **Respuesta Exitosa (200 OK)**: Un array con todos los objetos de los platos.
</details>

<details>
  <summary><code>GET /platos/:id</code></summary>

  - **Descripción**: Busca y devuelve un plato específico por su `id`.
  - **Parámetros de Ruta**: `:id` (numérico).
  *   **Respuesta Exitosa (200 OK)**: El objeto del plato encontrado.
  *   **Respuesta de Error (404 Not Found)**: Si no existe un plato con ese id.
</details>

<details>
  <summary><code>POST /platos</code></summary>

  - **Descripción**: Agrega un nuevo plato al menú.
  - **Cuerpo de la Solicitud (Body)**: Un objeto JSON con la estructura de un plato. El `id` debe ser único.
  - **Respuesta Exitosa (201 Created)**: El objeto del plato recién creado.
  - **Respuesta de Error (400 Bad Request)**: Si el cuerpo de la solicitud es inválido o el id ya existe.
</details>

<details>
  <summary><code>PUT /platos/:id</code></summary>

  - **Descripción**: Modifica un plato existente.
  - **Parámetros de Ruta**: `:id` (numérico).
  - **Cuerpo de la Solicitud (Body)**: Un objeto JSON con los campos a modificar.
  - **Respuesta Exitosa (200 OK)**: El objeto del plato actualizado.
  - **Respuesta de Error (404 Not Found)**: Si el plato no se encuentra.
</details>

<details>
  <summary><code>DELETE /platos/:id</code></summary>

  - **Descripción**: Elimina un plato del menú.
  - **Parámetros de Ruta**: `:id` (numérico).
  - **Respuesta Exitosa (200 OK)**: Un mensaje de confirmación.
  - **Respuesta de Error (404 Not Found)**: Si el plato no se encuentra.
</details>

### Endpoints Adicionales (¡El verdadero desafío!)

Para profundizar en los conceptos de API REST, deberán implementar los siguientes 3 endpoints:

<details>
  <summary><code>GET /platos/buscar</code></summary>

  - **Descripción**: Permite buscar platos cuyo nombre o descripción contenga un término específico.
  - **Query Params**: `q={termino_de_busqueda}`.
  - **Ejemplo**: `/platos/buscar?q=Risotto` debería devolver todos los platos que incluyan "Risotto" en su nombre o descripción.
  - **Respuesta Exitosa (200 OK)**: Un array con los platos que coincidan con la búsqueda.
</details>

<details>
  <summary><code>GET /platos/categoria/:nombre</code></summary>

  - **Descripción**: Filtra los platos que pertenezcan a una categoría específica.
  - **Parámetros de Ruta**: `:nombre` (string).
  - **Ejemplo**: `/platos/categoria/Postre` debería devolver todos los platos que tengan la categoría "Postre".
  - **Respuesta Exitosa (200 OK)**: Un array con los platos de esa categoría.
</details>

<details>
  <summary><code>GET /platos/precio/:min-:max</code></summary>

  - **Descripción**: Devuelve los platos cuyo precio se encuentre dentro de un rango específico (ambos valores incluidos).
  - **Parámetros de Ruta**: `:min` (numérico) y `:max` (numérico), separados por un guion.
  - **Ejemplo**: `/platos/precio/10-20` debería devolver platos con precio entre 10 y 20.
  - **Respuesta Exitosa (200 OK)**: Un array con los platos que cumplan con el rango de precios.
</details>


## Probando la API con `api.http` 🧪

Para facilitar la prueba de los endpoints, se ha incluido un archivo `api.http` en la raíz del proyecto. Este archivo contiene ejemplos de solicitudes para cada una de las funcionalidades requeridas.

Para utilizarlo, te recomendamos instalar la extensión **[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)** para Visual Studio Code.

Una vez instalada, simplemente abre el archivo `api.http` y verás un botón `Send Request` encima de cada solicitud. Al hacer clic, la extensión ejecutará la petición y te mostrará la respuesta del servidor en una nueva pestaña.

> **Nota**: Recuerda que los `id` de los platos en los ejemplos pueden no coincidir con los de tu base de datos. ¡Asegúrate de ajustarlos para que tus pruebas funcionen correctamente!

## Rúbrica de Evaluación 📝

- **5%**: Arquitectura
- **5%**: `GET /platos`
- **5%**: `GET /platos/:id`
- **5%**: `POST /platos`
- **5%**: `PUT /platos/:id`
- **5%**: `DELETE /platos/:id`
- **10%**: `GET /platos/buscar`
- **10%**: `GET /platos/categoria/:nombre`
- **10%**: `GET /platos/precio/:min-:max`

## Estructura del Repositorio Sugerida 🗂️

Pueden mantener la estructura que venían utilizando, asegurándose de incluir la configuración de la base de datos:

```plaintext
/controllers
  - platoController.js
/config
  - database.js
/data
  - menu.json
/models
  - plato.js
/routes
  - platoRoutes.js
/app.js
/README.md
```

## Buenas Prácticas de Git y Commits 📝

Para mantener un historial de cambios limpio y profesional, es fundamental que sigan estas buenas prácticas al trabajar con Git:

-   **Realicen Commits Pequeños y Frecuentes**: En lugar de hacer un solo commit gigante al final, hagan commits pequeños cada vez que completen una unidad de trabajo lógica (por ejemplo, al terminar la implementación de un endpoint, al corregir un bug, o al actualizar la documentación). Esto facilita la revisión del código y la identificación de errores.

-   **Escriban Mensajes de Commit Descriptivos**: Un buen mensaje de commit debe ser claro y conciso. Sigan una convención para que sea aún más legible. Les sugerimos el formato de *Commits Convencionales*:
    -   `feat:` para nuevas funcionalidades (ej. `feat: Implementa endpoint GET /platos/:id`).
    -   `fix:` para correcciones de errores (ej. `fix: Corrige error 404 en la búsqueda por categoría`).
    -   `docs:` para cambios en la documentación (ej. `docs: Actualiza README con ejemplos de uso`).
    -   `refactor:` para cambios en el código que no añaden funcionalidades ni corrigen errores.
    -   `test:` para añadir o modificar pruebas.

Un buen historial de commits no solo demuestra profesionalismo, sino que también es una herramienta invaluable para ustedes y para cualquier persona que trabaje en el proyecto en el futuro.

## Instrucciones de Entrega 🚀

1.  **Asegúrense de estar trabajando sobre su propio fork** del repositorio del proyecto.
2.  **Añádanos como colaboradores** en su repositorio de GitHub para que podamos revisar su progreso. Nuestros usuarios son:
    *   `FabioDrizZt`
    *   `Fer24Sanhcez`
    *   `GabrielaEBejarano`
3.  Desarrollen las funcionalidades requeridas.
4.  **Documenten** cualquier decisión importante o cambio que hayan realizado en este mismo `README.md`.
5.  **Suban sus cambios** a su repositorio de GitHub.

---

¡Mucho éxito!
