# 🧩 Ejercicio genérico resuelto — Backend Node.js + Express + Mongoose

> **Cómo usar este archivo:**
> 1. Buscá todos los comentarios con `// ← CAMBIAR` y modificalos según el enunciado.
> 2. El recurso de ejemplo es `Producto`. Reemplazá ese nombre por el tuyo (Alumno, Película, Auto, etc.).
> 3. Los campos del Schema son los que más vas a cambiar.

---

## 📁 Estructura de carpetas

```
mi-proyecto/
├── .env
├── .gitignore
├── package.json
├── server.js
└── src/
    ├── db/
    │   └── config.js
    ├── models/
    │   └── producto.model.js       ← CAMBIAR nombre del archivo
    ├── routes/
    │   └── productos.routes.js     ← CAMBIAR nombre del archivo
    └── controllers/
        └── productos.controller.js ← CAMBIAR nombre del archivo
```

---

## 📦 package.json

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "dotenv": "^16.3.1"
  }
}
```

> Instalar con: `npm install express mongoose dotenv`

---

## 🔒 .env

```env
PORT=3000
MONGO_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/NOMBRE_DB
```

> Reemplazá `USUARIO`, `PASSWORD` y `NOMBRE_DB` con los datos de tu cluster.

---

## 🚫 .gitignore

```
node_modules/
.env
```

---

## 🚀 server.js

```js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/db/config.js';
import productosRouter from './src/routes/productos.routes.js'; // ← CAMBIAR

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──────────────────────────────────────────
app.use(express.json()); // parsea el body en JSON

// ── Rutas ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando ✅' });
});

app.use('/api/productos', productosRouter); // ← CAMBIAR la ruta y el router

// ── Ruta 404 (siempre al FINAL) ───────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ── Conexión y arranque ───────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
  });
});
```

---

## 🔌 src/db/config.js

```js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // cierra el proceso si no puede conectar
  }
};
```

> Este archivo no necesita cambios.

---

## 🗂️ src/models/producto.model.js

```js
import mongoose from 'mongoose';

// ── Schema ────────────────────────────────────────────────────────
// ↓ CAMBIAR: nombre del Schema y los campos según el enunciado
const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'], // ← CAMBIAR mensaje
      trim: true,           // elimina espacios al inicio y final
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'], // ← CAMBIAR
      min: [0, 'El precio no puede ser negativo'],  // ← CAMBIAR o eliminar
    },
    categoria: {
      type: String,
      required: false,      // ← CAMBIAR a true si es obligatorio
      default: 'General',   // ← CAMBIAR o eliminar
    },
    disponible: {
      type: Boolean,
      default: true,        // ← CAMBIAR o eliminar
    },
    stock: {
      type: Number,
      default: 0,
    },
    // Podés agregar más campos:
    // descripcion: { type: String },
    // imagen:      { type: String },
    // fechaAlta:   { type: Date, default: Date.now },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

// ── Modelo ────────────────────────────────────────────────────────
// Primer arg = nombre en singular (Mongoose crea la colección en plural)
// 'Producto' → colección 'productos' en MongoDB
const Producto = mongoose.model('Producto', productoSchema); // ← CAMBIAR

export default Producto;
```

---

## 🛣️ src/routes/productos.routes.js

```js
import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/productos.controller.js'; // ← CAMBIAR nombre del archivo

const router = Router();

// ── Definición de rutas ───────────────────────────────────────────
// Montadas sobre '/api/productos' (definido en server.js)
// Quedan así:
//   GET    /api/productos          → getAll   (todos)
//   GET    /api/productos/:id      → getById  (uno por id)
//   POST   /api/productos          → create   (crear nuevo)
//   PUT    /api/productos/:id      → update   (actualizar)
//   DELETE /api/productos/:id      → remove   (eliminar)

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
```

---

## 🧠 src/controllers/productos.controller.js

```js
import Producto from '../models/producto.model.js'; // ← CAMBIAR el modelo

// ─────────────────────────────────────────────────────────────────
// GET /api/productos
// Devuelve todos los documentos
// ─────────────────────────────────────────────────────────────────
export const getAll = async (req, res) => {
  try {
    // Podés agregar filtros por query string: ?categoria=tech&disponible=true
    const filtros = {};
    if (req.query.categoria) filtros.categoria = req.query.categoria; // ← CAMBIAR
    if (req.query.disponible) filtros.disponible = req.query.disponible;

    const productos = await Producto.find(filtros); // ← CAMBIAR el modelo
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────
// GET /api/productos/:id
// Devuelve un documento por ID
// ─────────────────────────────────────────────────────────────────
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id); // ← CAMBIAR el modelo

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' }); // ← CAMBIAR mensaje
    }

    res.status(200).json(producto);
  } catch (error) {
    // Si el ID no tiene formato válido de MongoDB, Mongoose tira CastError
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────
// POST /api/productos
// Crea un nuevo documento
// Body esperado: { nombre, precio, categoria, disponible, stock }
// ─────────────────────────────────────────────────────────────────
export const create = async (req, res) => {
  try {
    const body = req.body;

    // Validación manual básica (opcional si el Schema ya lo valida):
    if (!body.nombre || !body.precio) { // ← CAMBIAR campos obligatorios
      return res.status(400).json({ error: 'Faltan campos obligatorios: nombre y precio' });
    }

    const nuevo = new Producto(body); // ← CAMBIAR el modelo
    const guardado = await nuevo.save();

    res.status(201).json(guardado);
  } catch (error) {
    // ValidationError = algún campo no cumple las reglas del Schema
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────
// PUT /api/productos/:id
// Actualiza un documento existente
// Body: los campos a modificar (no hace falta mandar todos)
// ─────────────────────────────────────────────────────────────────
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: 'No se enviaron datos para actualizar' });
    }

    const actualizado = await Producto.findByIdAndUpdate(
      id,
      body,
      {
        new: true,            // devuelve el documento DESPUÉS de actualizar
        runValidators: true,  // aplica las validaciones del Schema al actualizar
      }
    ); // ← CAMBIAR el modelo

    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' }); // ← CAMBIAR
    }

    res.status(200).json(actualizado);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────
// DELETE /api/productos/:id
// Elimina un documento
// ─────────────────────────────────────────────────────────────────
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Producto.findByIdAndDelete(id); // ← CAMBIAR

    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' }); // ← CAMBIAR
    }

    res.status(200).json({ mensaje: 'Producto eliminado correctamente', eliminado });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🧪 Requests para probar (archivo requests.http)

```http
### Obtener todos
GET http://localhost:3000/api/productos

### Obtener todos con filtro por query
GET http://localhost:3000/api/productos?categoria=electronica

### Obtener por ID (reemplazá el id)
GET http://localhost:3000/api/productos/64a1b2c3d4e5f6a7b8c9d0e1

### Crear nuevo
POST http://localhost:3000/api/productos
Content-Type: application/json

{
  "nombre": "Laptop",
  "precio": 1500,
  "categoria": "electronica",
  "disponible": true,
  "stock": 10
}

### Actualizar (reemplazá el id)
PUT http://localhost:3000/api/productos/64a1b2c3d4e5f6a7b8c9d0e1
Content-Type: application/json

{
  "precio": 1200,
  "stock": 8
}

### Eliminar (reemplazá el id)
DELETE http://localhost:3000/api/productos/64a1b2c3d4e5f6a7b8c9d0e1
```

---

## 📋 Tabla resumen: qué devuelve cada endpoint

| Método | Ruta | Éxito | Error cliente | Error servidor |
|--------|------|-------|---------------|----------------|
| GET | `/api/productos` | 200 + array | — | 500 |
| GET | `/api/productos/:id` | 200 + objeto | 400 (ID inválido), 404 (no existe) | 500 |
| POST | `/api/productos` | 201 + objeto creado | 400 (faltan campos / validación) | 500 |
| PUT | `/api/productos/:id` | 200 + objeto actualizado | 400, 404 | 500 |
| DELETE | `/api/productos/:id` | 200 + objeto eliminado | 400, 404 | 500 |

---

## 🔄 Checklist para adaptar al ejercicio

```
□ Cambiar el nombre del recurso en todos los archivos (Producto → AlumnoX)
□ Definir los campos del Schema con sus tipos y validaciones
□ Cambiar la ruta en server.js (/api/productos → /api/lo-que-sea)
□ Cambiar los mensajes de error para que coincidan con el recurso
□ Si el enunciado pide filtros específicos, agregarlos en getAll()
□ Si el enunciado pide un campo único (email, DNI), agregar unique: true en el Schema
□ Copiar el .env con la URI correcta
□ npm install y node server.js
```

---

## 📌 Snippets útiles para casos especiales

### Buscar por campo que no sea _id
```js
// En el controller, en vez de findById:
const resultado = await Producto.findOne({ nombre: req.params.nombre });
```

### Campo único (que no se repita en la BD)
```js
// En el Schema:
email: {
  type: String,
  required: true,
  unique: true,  // MongoDB crea un índice único
  lowercase: true,
  trim: true,
}
```

### Ordenar resultados
```js
// Más caro primero:
const productos = await Producto.find().sort({ precio: -1 });
// Más barato primero:
const productos = await Producto.find().sort({ precio: 1 });
```

### Limitar cantidad de resultados
```js
const productos = await Producto.find().limit(10).skip(0);
// Para paginación: skip = (pagina - 1) * limit
```

### Buscar con texto parcial (regex)
```js
// Busca cualquier producto cuyo nombre contenga el texto (case insensitive):
const productos = await Producto.find({
  nombre: { $regex: req.query.nombre, $options: 'i' }
});
```

### Múltiples modelos / recursos
```js
// En server.js, simplemente montás más routers:
import alumnosRouter from './src/routes/alumnos.routes.js';
import materiasRouter from './src/routes/materias.routes.js';

app.use('/api/alumnos', alumnosRouter);
app.use('/api/materias', materiasRouter);
```
