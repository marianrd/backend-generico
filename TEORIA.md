# Resumen de Teoría — Backend con JavaScript
> Cubre: JS básico → ES6 → Node.js → Express → MongoDB → Mongoose → Arquitectura

---

## 1. Introducción a JavaScript

### ¿Qué es JavaScript?
Creado en 1995 por Brendan Eich para Netscape (llamado Mocha, luego LiveScript). Hoy es uno de los lenguajes más usados del mundo. **ECMAScript** es el estándar que lo regula (ECMA publica versiones; ES6 de 2015 fue la más importante).

### Node.js
Node.js usa el motor **V8 de Chrome** para correr JS del lado del servidor, sin necesitar navegador. Permite programar frontend y backend en el mismo lenguaje.

### Variables
| Declaración | Ámbito | Reasignable | Hoisting |
|---|---|---|---|
| `var` | función | ✅ | ✅ (problemático) |
| `let` | bloque | ✅ | ❌ |
| `const` | bloque | ❌ | ❌ |

> **Regla de oro:** Usá `const` siempre que puedas, `let` cuando necesites reasignar. Evitá `var`.

### Tipos de datos
- **Primitivos:** `Number`, `String`, `Boolean`, `undefined`, `null`, `NaN`
- **Objeto:** `Object`, `Array`, `Function`

```js
// Trampa clásica de typeof:
typeof undefined  // "undefined"
typeof NaN        // "number"  ← aunque parezca raro
typeof null       // "object"  ← bug histórico de JS
```

### Strings — métodos clave
```js
"  hola  ".trim()           // "hola"
"a,b,c".split(",")          // ["a","b","c"]
"hello".replace("l","r")    // "herlo"  (solo primera)
"hello".replaceAll("l","r") // "herro"
"hola".toUpperCase()        // "HOLA"
"Hola mundo".indexOf("mundo") // 5
"Hola mundo".slice(0, 4)    // "Hola"
```

> `.toFixed()` devuelve **String**, no Number. Pasalo por `parseFloat()` si necesitás seguir operando.

### Objeto Math
```js
Math.floor(4.9)   // 4   (redondea abajo)
Math.ceil(4.1)    // 5   (redondea arriba)
Math.round(4.5)   // 5   (redondea al más cercano)
Math.random()     // número entre 0 y 1
Math.abs(-5)      // 5
Math.sqrt(16)     // 4
// Generar entero aleatorio entre 0 y 999:
Math.floor(Math.random() * 1000)
```

### Estructuras de control
```js
// If ternario:
const resultado = edad >= 18 ? "mayor" : "menor";

// Switch (usa === internamente):
switch (dia) {
  case "lunes": case "martes": console.log("inicio de semana"); break;
  default: console.log("otro día");
}

// For:
for (let i = 0; i <= 5; i++) { ... }

// While — evalúa ANTES de ejecutar
while (condicion) { ... }

// Do-While — ejecuta AL MENOS UNA VEZ
do { ... } while (condicion);
```

### Funciones
```js
// Declarada (tiene hoisting):
function sumar(a, b) { return a + b; }

// Expresada (no tiene hoisting):
const restar = function(a, b) { return a - b; }

// Arrow function:
const multiplicar = (a, b) => a * b;

// Con parámetros por defecto:
function saludar(nombre = "visitante") { return `Hola ${nombre}`; }
```

---

## 2. Funciones, Arrays y Objetos

### Objetos literales
```js
const persona = {
  nombre: "Ana",
  edad: 25,
  saludar: function() { return `Hola, soy ${this.nombre}`; }
};

persona.nombre        // acceso con punto
persona["nombre"]     // acceso con corchetes
delete persona.edad   // eliminar propiedad
persona.ciudad = "BA" // agregar propiedad en runtime
```

> `const` en un objeto **no** impide modificar sus propiedades, solo impide reasignar la variable.

### Tipos de funciones
- **Declarada:** `function nombre() {}` — tiene hoisting.
- **Expresada:** `const f = function() {}` — se comporta como variable.
- **Arrow function:** `const f = () => {}` — sintaxis compacta, no tiene `this` propio.
- **Callback:** función que se pasa como argumento a otra función.

### Arrow functions — reglas
```js
// 1 parámetro: se pueden omitir los paréntesis
const doble = x => x * 2;

// Sin parámetros: paréntesis obligatorios
const saludar = () => "Hola";

// Múltiples líneas: necesita {} y return
const esMultiplo = (a, b) => {
  const resto = a % b;
  return resto === 0;
};
```

### Arrays — métodos básicos
| Método | Qué hace | Retorna |
|---|---|---|
| `.push(x)` | Agrega al final | nueva longitud |
| `.pop()` | Elimina el último | elemento eliminado |
| `.unshift(x)` | Agrega al inicio | nueva longitud |
| `.shift()` | Elimina el primero | elemento eliminado |
| `.indexOf(x)` | Busca la primera ocurrencia | índice o -1 |
| `.includes(x)` | ¿Existe el elemento? | boolean |
| `.join(sep)` | Une elementos en string | string |
| `.slice(ini, fin)` | Copia una porción | nuevo array |
| `.splice(pos, cant)` | Modifica in-place | elementos eliminados |
| `.concat(arr2)` | Une arrays | nuevo array |
| `.sort()` | Ordena in-place | array modificado |
| `.reverse()` | Invierte in-place | array modificado |

### Arrays — métodos avanzados (Higher-Order Functions)
```js
// forEach — itera, NO retorna nada
notas.forEach(n => console.log(n));

// map — transforma cada elemento, retorna NUEVO array
const dobles = notas.map(n => n * 2);

// filter — filtra según condición, retorna NUEVO array
const aprobados = notas.filter(n => n >= 4);

// reduce — acumula en un único valor
const total = notas.reduce((acc, n) => acc + n, 0);

// Encadenamiento (chaining):
const nombresAprobados = alumnos
  .filter(a => a.nota >= 4)
  .map(a => a.nombre);

// Object.groupBy (Node.js 21+):
const porCarrera = Object.groupBy(alumnos, a => a.carrera);
```

> **Diferencia clave forEach vs map:**
> - `forEach` → efectos secundarios (imprimir, escribir a archivo). Devuelve `undefined`.
> - `map` → transformar datos. Devuelve nuevo array. Se puede encadenar.

### Array de objetos
```js
const productos = [
  { id: 1, nombre: "Laptop", precio: 1500 },
  { id: 2, nombre: "Mouse", precio: 30 }
];
// Acceder a propiedades:
productos[0].nombre  // "Laptop"
// Agregar nuevo objeto:
productos.push({ id: 3, nombre: "Teclado", precio: 50 });
```

---

## 3. Evolución de ECMAScript (ES6+)

### Template Literals (Plantillas de Cadena)
```js
const nombre = "Ana";
const saludo = `Hola, ${nombre}! Tenés ${2 + 3} mensajes.`;
```

### Módulos — ES Modules vs CommonJS
```js
// CommonJS (viejo, require):
const express = require('express');
module.exports = { miFuncion };

// ES Modules (moderno, import/export):
import express from 'express';
export const miFuncion = () => {};
export default miFuncion;
```
> Para usar `import` en Node.js: agregar `"type": "module"` en el `package.json`.

### Spread Operator (`...`)
```js
// En arrays:
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// En objetos:
const base = { nombre: "Ana" };
const actualizado = { ...base, edad: 25 };  // { nombre: "Ana", edad: 25 }

// En funciones:
const suma = (a, b, c) => a + b + c;
const nums = [1, 2, 3];
suma(...nums);  // equivale a suma(1, 2, 3)
```

> El spread hace **copia superficial** — objetos anidados siguen referenciados.

### Rest Parameters (`...`)
```js
function sumarTodo(primero, ...resto) {
  return primero + resto.reduce((acc, n) => acc + n, 0);
}
sumarTodo(1, 2, 3, 4);  // 10
```
> Solo puede haber **uno** y debe ser el **último** parámetro.

### Operadores de existencia
```js
// Nullish Coalescing (??) — solo activa si es null/undefined:
const nombre = usuario.nombre ?? "Anónimo";
// Diferencia con ||: ?? NO activa con 0, "" o false

// Optional Chaining (?.) — evita TypeError en objetos anidados:
const ciudad = usuario?.direccion?.ciudad;  // undefined si no existe
```

### Destructuring
```js
// Objetos:
const { nombre, edad } = persona;
const { nombre: nombrePersona } = persona;  // con alias

// Arrays:
const [primero, segundo, ...resto] = numeros;

// En parámetros de función (muy común en Express):
app.get('/usuarios/:id', ({ params: { id } }, res) => { ... });
```

### Clases (ES6)
```js
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  hablar() { return `${this.nombre} hace un sonido`; }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre);  // llama al constructor padre — OBLIGATORIO antes de usar this
    this.raza = raza;
  }
  hablar() { return `${this.nombre} ladra`; }
}
```

### Asincronismo y Promesas
JavaScript es **no bloqueante**: no espera a que una tarea lenta termine, sigue ejecutando el resto.

```js
// Promesa básica:
const promesa = new Promise((resolve, reject) => {
  // Si todo bien:  resolve(datos)
  // Si hubo error: reject(error)
});

// Consumir con then/catch/finally:
promesa
  .then(datos => console.log(datos))
  .catch(error => console.error(error))
  .finally(() => console.log("siempre se ejecuta"));

// Async/Await (sintaxis más limpia):
async function obtenerDatos() {
  try {
    const datos = await promesa;
    return datos;
  } catch (error) {
    console.error(error);
  }
}
```

---

## 4. Introducción al Backend

### ¿Qué es el Backend?
La parte "invisible" de una aplicación que maneja:
- Lógica de negocio
- Conexión con bases de datos
- Seguridad y autenticación
- API para que el frontend consuma datos

### Arquitectura Cliente-Servidor
- **Cliente:** dispositivo que hace peticiones (navegador, app móvil)
- **Servidor:** equipo que responde las peticiones
- **Request:** solicitud del cliente al servidor
- **Response:** respuesta del servidor al cliente
- Comunicación vía **protocolo HTTP** sobre **TCP/IP**

### HTTP — Métodos
| Método | Uso | Ejemplo |
|---|---|---|
| GET | Obtener datos | Listar productos |
| POST | Crear datos | Registrar usuario |
| PUT | Reemplazar recurso completo | Actualizar perfil |
| PATCH | Modificar parcialmente | Cambiar solo el nombre |
| DELETE | Eliminar | Borrar un post |

### Códigos de Estado HTTP
| Rango | Tipo | Ejemplos clave |
|---|---|---|
| 1xx | Informativo | 100 Continue |
| 2xx | Éxito | **200 OK**, **201 Created**, 204 No Content |
| 3xx | Redirección | 301 Moved, 304 Not Modified |
| 4xx | Error del cliente | **400 Bad Request**, **401 Unauthorized**, **403 Forbidden**, **404 Not Found** |
| 5xx | Error del servidor | **500 Internal Server Error**, 503 Unavailable |

### JSON
Formato de intercambio de datos. Similar al objeto literal de JS pero con diferencias:
- Claves entre **comillas dobles** `"clave"`
- Sin métodos, sin comentarios
- Sin coma al final

```js
// De string JSON → objeto JS:
const obj = JSON.parse('{"nombre":"Ana"}');

// De objeto JS → string JSON:
const str = JSON.stringify({ nombre: "Ana" });
```

### API REST
- **API:** interfaz que permite comunicación entre aplicaciones
- **REST:** arquitectura estándar para APIs sobre HTTP
- **Endpoint:** URL que expone un recurso (`/api/productos`)
- **Stateless:** cada petición es independiente, sin estado guardado
- Datos en formato **JSON** (el más usado)

### URI vs URL
- **URI:** identificador genérico (ej: `https://miapi.com/productos/5`)
- **URL:** subconjunto de URI que incluye la ubicación
- **URN:** nombre sin ubicación

### NPM y package.json
```bash
npm init -y           # inicializar proyecto
npm install express   # instalar dependencia
npm install           # instalar todas las deps del package.json

# package.json registra todas las dependencias
# node_modules/ contiene los archivos instalados (NO subir a git)
```

---

## 5. Creación de Servidores con Express

### ¿Por qué Express?
- Simplifica el módulo HTTP nativo
- Manejo de rutas por método HTTP (`app.get`, `app.post`, etc.)
- Sistema de middleware
- `.send()` detecta el tipo de contenido automáticamente
- `.json()` envía JSON con el header correcto automáticamente

### Servidor básico con Express
```js
import express from 'express';  // requiere "type":"module" en package.json

const app = express();
const PORT = 3000;

app.use(express.json()); // middleware para parsear body JSON

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

app.get('/api/productos', (req, res) => {
  res.status(200).json({ productos: [...] });
});

// Ruta 404 — siempre al final:
app.use((req, res) => {
  res.status(404).send('Recurso no encontrado');
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
```

### Parámetros de ruta y query
```js
// req.params — parte de la URL (dinámico):
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  // URL: /api/productos/42  → id = "42"
});

// req.query — después del ? (filtros/paginación):
app.get('/api/productos', (req, res) => {
  const { categoria, orden } = req.query;
  // URL: /api/productos?categoria=tech&orden=asc
});

// Combinado:
app.get('/alumnos/:legajo/notas', (req, res) => {
  const { legajo } = req.params;
  const { materia } = req.query;
  // URL: /alumnos/12345/notas?materia=backend
});
```

### Manejo de errores en rutas
```js
// app.use() — catch-all, va AL FINAL de todas las rutas:
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Encadenar status + send:
res.status(404).send('No encontrado');
res.status(201).json({ id: nuevoId });
```

### Herramientas de testing
- **Postman** — aplicación desktop para probar endpoints con UI
- **Thunder Client** — extensión VS Code, similar a Postman
- **REST Client** — extensión VS Code, archivos `.http` con las peticiones

---

## 6. Fundamentos: FileSystem y Variables de Entorno

### FileSystem API (módulo `fs`)
```js
import { promises as fs } from 'fs';

// CREAR / SOBREESCRIBIR archivo:
await fs.writeFile('archivo.txt', 'contenido', 'utf-8');
// ⚠️ Es DESTRUCTIVO — borra todo lo anterior

// LEER archivo:
const texto = await fs.readFile('archivo.txt', 'utf-8');
const datos = JSON.parse(texto);  // si es JSON

// AGREGAR contenido (sin borrar lo anterior):
await fs.appendFile('log.txt', `\n${new Date()} - nuevo log`);

// VERIFICAR si existe:
try {
  await fs.access('archivo.txt');
  console.log('existe');
} catch { console.log('no existe'); }

// ELIMINAR archivo:
await fs.unlink('archivo.txt');  // ⚠️ irreversible, no va a papelera

// DIRECTORIOS:
await fs.mkdir('./data/uploads', { recursive: true }); // recursive: crea todo el path
const archivos = await fs.readdir('./data');           // lista contenido
await fs.rename('./data/viejo', './data/nuevo');       // renombrar/mover
await fs.rmdir('./carpeta', { recursive: true });      // eliminar carpeta (¡cuidado!)
```

> **Patrón para JSON:** `Leer → JSON.parse → modificar → JSON.stringify → Escribir todo`
> No uses `appendFile` con JSON, rompe el formato.

### Módulo Path
```js
import path from 'path';
import { fileURLToPath } from 'url';

// Recrear __dirname en ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Métodos útiles:
path.join(__dirname, 'data', 'usuarios.json')  // une rutas correctamente (cross-platform)
path.extname('foto.png')    // ".png"
path.basename('/ruta/archivo.js')  // "archivo.js"
```

### Servir archivos estáticos con Express
```js
app.use(express.static(path.join(__dirname, 'public')));
// Express servirá todo lo que esté en /public directamente
// Si hay un index.html, lo sirve en la ruta /
```

### Variables de entorno (.env)
```
# .env (en la raíz del proyecto)
PORT=3000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/midb
```

```js
// Opción 1 — Con dotenv:
import dotenv from 'dotenv';
dotenv.config();

// Opción 2 — Nativo (Node.js 20.6+), en terminal:
// node --env-file=.env index.js

// Acceder a la variable:
const PORT = process.env.PORT || 3000;
```

> **⚠️ Nunca subas el `.env` a GitHub.** Agregalo al `.gitignore`.

---

## 7. Introducción a MongoDB

### ¿Qué es NoSQL?
Bases de datos que no usan tablas relacionales. Más flexibles, escalables horizontalmente. Ideales para datos no estructurados o semiestructurados.

### MongoDB vs Relacionales
| Relacional (SQL) | MongoDB |
|---|---|
| Base de datos | Base de datos |
| Tabla | Colección (Collection) |
| Fila/Registro | Documento (Document) |
| Columna | Campo (Field) |
| `SELECT * FROM tabla` | `db.coleccion.find()` |

### BSON y ObjectId
- MongoDB guarda datos en **BSON** (Binary JSON) — más compacto y eficiente que JSON.
- Cada documento tiene un `_id` de tipo **ObjectId** (12 bytes, único, generado automáticamente).
- El ObjectId incluye timestamp de creación, identificador de máquina y proceso, y un contador.

### Operadores de consulta
```js
// Comparación:
{ precio: { $gt: 100 } }    // mayor a
{ precio: { $gte: 100 } }   // mayor o igual a
{ precio: { $lt: 100 } }    // menor a
{ precio: { $lte: 100 } }   // menor o igual a
{ precio: { $in: [100, 200, 300] } }  // está en la lista
{ precio: { $nin: [100, 200] } }      // NO está en la lista
{ nombre: { $ne: "Manzana" } }        // no igual a

// Existencia y regex:
{ descuento: { $exists: true } }              // el campo existe
{ nombre: { $regex: /^M/i } }                // empieza con M (case insensitive)

// Lógicos:
{ $and: [{ precio: { $gte: 100 } }, { stock: { $gt: 0 } }] }
{ $or:  [{ categoria: "fruta" }, { categoria: "verdura" }] }
{ $nor: [{ nombre: "Banana" }, { nombre: "Naranja" }] }  // ninguno de los dos
```

### Manipulación de datos en Compass
- **Agregar:** `Add Data → Insert Document`
- **Modificar:** hover sobre documento → ícono lápiz → `Update`
- **Ordenar:** `More Options → Sort → { campo: 1 }` (1=asc, -1=desc)
- **Eliminar:** hover sobre documento → ícono basura → `Delete`

---

## 8. Integración de MongoDB con Node.js

### Instalación y conexión
```bash
npm install mongodb dotenv
```

```js
// src/mongodb.js
import { MongoClient } from 'mongodb';
import dns from 'dns';

dns.setServers(['8.8.8.8']); // Solución para problemas de DNS con Atlas

const MONGO_URI = process.env.MONGO_URI;

export async function connectToMongoDB() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');
    return client;
  } catch (error) {
    console.error('❌ Error al conectar:', error);
    return null;
  }
}

export async function disconnectFromMongoDB(client) {
  try {
    await client.close();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error al desconectar:', error);
  }
}
```

### Usar la conexión en Express
```js
app.get('/api/frutas', async (req, res) => {
  const client = await connectToMongoDB();
  if (!client) return res.status(500).json({ error: 'Error de conexión' });

  try {
    const db = client.db('frutas');           // nombre de la BD
    const collection = db.collection('frutas'); // nombre de la colección
    const frutas = await collection.find({}).toArray();
    res.status(200).json(frutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectFromMongoDB(client); // siempre desconectar
  }
});
```

> **Importante:** siempre desconectarse en el `finally`. Conexiones abiertas saturan el cluster.

---

## 9. CRUD con Express y MongoDB

### CRUD = Create, Read, Update, Delete (también llamado ABM)

### Métodos del driver de MongoDB
| Operación | Método |
|---|---|
| Obtener todos | `collection.find({}).toArray()` |
| Obtener uno | `collection.findOne({ campo: valor })` |
| Crear | `collection.insertOne(documento)` |
| Modificar | `collection.updateOne({ filtro }, { $set: { campos } })` |
| Eliminar | `collection.deleteOne({ filtro })` |

### Ejemplo completo del CRUD

```js
// READ — Obtener todos:
app.get('/api/frutas', async (req, res) => {
  // ... connect, find({}).toArray(), disconnect
});

// READ — Obtener por ID:
app.get('/api/frutas/:id', async (req, res) => {
  const { id } = req.params;
  // collection.findOne({ id: parseInt(id) })
  // Si no existe → res.status(404).json({ error: 'No encontrada' })
});

// CREATE:
app.post('/api/frutas', async (req, res) => {
  const nuevaFruta = req.body;
  if (!nuevaFruta) return res.status(400).json({ error: 'Datos inválidos' });
  // collection.insertOne(nuevaFruta) → res.status(201).json(resultado)
});

// UPDATE:
app.put('/api/frutas/:id', async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  // collection.updateOne({ id: parseInt(id) }, { $set: datosActualizados })
  // $set actualiza solo los campos especificados sin borrar el resto
});

// DELETE:
app.delete('/api/frutas/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'ID requerido' });
  // collection.deleteOne({ id: parseInt(id) })
  // resultado.deletedCount === 0 → 404
  // Si eliminó → res.status(204).send()
});
```

### Middleware para parsear body JSON
```js
app.use(express.json()); // SIEMPRE antes de las rutas que usan req.body
```

---

## 10. CRUD con Mongoose

### ¿Qué es Mongoose?
**ODM (Object Data Modeling)** que simplifica enormemente el trabajo con MongoDB. En lugar de manejar conexiones y queries manualmente, define **Schemas** (estructuras de datos) y **Modelos**.

### Ventajas sobre el driver oficial
- Validación automática de tipos
- Métodos simplificados (`find`, `findById`, `save`, etc.)
- Manejo de conexión más simple
- Sin necesidad de connect/disconnect manual por endpoint

### Instalación y conexión
```bash
npm install express mongoose
```

```js
const mongoose = require('mongoose');

const start = async () => {
  try {
    await mongoose.connect('mongodb://user:pass@host/dbname');
    app.listen(3000, () => console.log('Servidor en puerto 3000'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
```

### Crear un Schema y Modelo
```js
// models.js
const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre:     { type: String,  required: true },
  precio:     { type: Number,  required: true },
  stock:      { type: Number,  default: 0 },
  disponible: { type: Boolean, default: true }
});

const Producto = mongoose.model('Producto', ProductoSchema);
module.exports = { Producto };
```

### CRUD con Mongoose (código simplificado)
```js
const { Producto } = require('./models');

// READ — todos:
app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.status(200).json(productos);
});

// READ — uno por ID:
app.get('/productos/:id', async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res.status(200).json(producto);
});

// CREATE:
app.post('/productos', async (req, res) => {
  const nuevo = new Producto({ ...req.body });
  const insertado = await nuevo.save();
  res.status(201).json(insertado);
});

// UPDATE:
app.put('/productos/:id', async (req, res) => {
  await Producto.updateOne({ _id: req.params.id }, req.body);
  const actualizado = await Producto.findById(req.params.id);
  res.status(200).json(actualizado);
});

// DELETE:
app.delete('/productos/:id', async (req, res) => {
  const eliminado = await Producto.findByIdAndDelete(req.params.id);
  res.status(200).json(eliminado);
});
```

> Mongoose maneja la conexión una sola vez al inicio — no hay que conectar/desconectar en cada ruta.

---

## 11. Arquitectura y Documentación

### Arquitectura por Capas
Divide la aplicación en capas con responsabilidades claras:

1. **Capa de Presentación** → rutas/endpoints de la API (lo que ve el frontend)
2. **Capa de Lógica de Negocio** → controllers (reglas, validaciones, procesamiento)
3. **Capa de Acceso a Datos** → modelos/schemas, conexión a BD

**Beneficios:** modularización, escalabilidad, mantenibilidad, reusabilidad, separación de responsabilidades.

### Express Router
Permite separar las rutas en archivos independientes:

```
📁 mi-proyecto/
├── server.js         ← punto de entrada, configura app y monta routers
├── .env
├── 📁 routes/
│   └── frutas.routes.js  ← define las rutas con Express Router
├── 📁 controllers/
│   └── frutas.controller.js  ← lógica de cada endpoint
└── 📁 src/
    └── mongodb.js    ← conexión a BD
```

```js
// frutas.routes.js:
import { Router } from 'express';
import * as frutasController from '../controllers/frutas.controller.js';

const router = Router();

router.get('/', frutasController.getAllFrutas);
router.get('/:id', frutasController.getFrutaById);
router.post('/', frutasController.createFruta);
router.put('/:id', frutasController.updateFruta);
router.delete('/:id', frutasController.deleteFruta);

export default router;

// server.js:
import frutasRouter from './routes/frutas.routes.js';
app.use('/api/frutas', frutasRouter);
```

```js
// frutas.controller.js:
export const getAllFrutas = async (req, res) => {
  // toda la lógica del GET /api/frutas
};
export const getFrutaById = async (req, res) => { ... };
// ...
```

### Documentación — Por qué es importante
- Mejora la comprensión del proyecto
- Facilita la colaboración entre equipos
- Reduce errores y retrasos
- Facilita la incorporación de nuevos integrantes

### Herramientas de documentación
- **Swagger UI** — documentación interactiva basada en OpenAPI, permite probar endpoints desde el browser
- **Postman** — también genera documentación automática desde las colecciones
- **JSDoc** — comenta el código JS para generar docs automáticas
- **Markdown (.md)** — formato ligero para READMEs y docs en GitHub

### Markdown — Sintaxis básica
```markdown
# Título 1   ## Título 2   ### Título 3

**negrita**   *cursiva*   ~~tachado~~   <u>subrayado</u>

> Cita o blockquote

- Lista desordenada
1. Lista ordenada
- [x] Tarea completada
- [ ] Tarea pendiente

| Col 1 | Col 2 | Col 3 |
|-------|:-----:|------:|
| izq   | centro| der   |

[Texto del link](https://url.com)
![Alt de imagen](./ruta/imagen.png)

`código inline`

```js
// bloque de código con sintaxis JS
const x = 1;
```

### Estructura de documentación de API REST
Para cada endpoint documentar:
1. **URL y método HTTP**
2. **Descripción** — qué hace
3. **Parámetros** — path params, query params, body
4. **Respuesta exitosa** — código de estado + ejemplo JSON
5. **Errores posibles** — 400, 404, 500 + descripción

---

## Resumen rápido — Stack MERN/Backend

```
Node.js     → entorno de ejecución (motor V8)
NPM         → gestor de paquetes
Express.js  → framework para servidor web y API REST
MongoDB     → base de datos NoSQL (documentos BSON)
Mongoose    → ODM que simplifica el trabajo con MongoDB
```

```
Flujo de una petición:
Cliente → HTTP Request → Express Router → Controller → MongoDB → Response → Cliente
```

```
Códigos de estado más usados en CRUD:
GET    → 200 OK
POST   → 201 Created
PUT    → 200 OK
DELETE → 204 No Content
Errores: 400 Bad Request | 401 Unauthorized | 404 Not Found | 500 Server Error
```
