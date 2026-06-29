# 🧩 Backend Genérico — Node.js + Express + Mongoose

Plantilla lista para usar en los parciales de Programación II. El recurso de ejemplo es `Producto`; reemplazalo por el del enunciado (Plato, Electrónico, Auto, etc.).

---

## 📁 Estructura

```
├── app.js                          ← punto de entrada
├── package.json
├── .env.example                    ← copiá a .env y completá
├── .gitignore
├── api.http                        ← requests para probar con REST Client
├── data/
│   └── datos.json                  ← CAMBIAR con los datos del enunciado
├── config/
│   └── database.js                 ← conexión a MongoDB (no tocar)
├── models/
│   └── producto.model.js           ← CAMBIAR campos del Schema
├── routes/
│   └── productos.routes.js         ← CAMBIAR nombre del recurso
└── controllers/
    └── productos.controller.js     ← CAMBIAR modelo y mensajes
```

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Crear .env a partir del ejemplo
cp .env.example .env
# → editá MONGO_URI con tu cadena de conexión

# 3. Correr el servidor
npm run dev
```

---

## 🔄 Checklist para adaptar al enunciado

```
□ Renombrar los archivos de models/, routes/ y controllers/
□ Cambiar los campos del Schema en producto.model.js
□ Cambiar la ruta /api/productos en app.js
□ Cambiar el import del router en app.js
□ Cambiar el import del modelo en el controller
□ Ajustar los mensajes de error (404, 400) con el nombre del recurso
□ Si el enunciado pide filtros extra, agregarlos en getAll()
□ Reemplazar data/datos.json con el JSON del enunciado
□ Completar el .env con la URI de tu cluster MongoDB
```

---

## 📡 Endpoints base

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Todos los documentos |
| GET | `/api/productos?campo=valor` | Todos con filtro por query |
| GET | `/api/productos/:id` | Uno por `_id` de MongoDB |
| POST | `/api/productos` | Crear nuevo |
| PUT | `/api/productos/:id` | Actualizar existente |
| DELETE | `/api/productos/:id` | Eliminar |

Probá los requests con el archivo `api.http` y la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de VS Code.

---

## 📌 Snippets útiles

### Buscar por campo que no sea `_id`
```js
const resultado = await Producto.findOne({ nombre: req.params.nombre });
```

### Campo único (no repetido en la BD)
```js
email: { type: String, required: true, unique: true, lowercase: true, trim: true }
```

### Buscar con texto parcial (regex, case insensitive)
```js
const items = await Producto.find({
  nombre: { $regex: req.query.q, $options: 'i' }
});
```

### Filtrar por rango de número (ej. precio entre min y max)
```js
const items = await Producto.find({
  precio: { $gte: Number(req.params.min), $lte: Number(req.params.max) }
});
```

### Buscar en múltiples campos (ej. nombre O descripción)
```js
const items = await Producto.find({
  $or: [
    { nombre: { $regex: req.query.q, $options: 'i' } },
    { descripcion: { $regex: req.query.q, $options: 'i' } },
  ]
});
```

### Ordenar resultados
```js
await Producto.find().sort({ precio: -1 }); // más caro primero
await Producto.find().sort({ precio: 1 });  // más barato primero
```

### Múltiples recursos en app.js
```js
import platosRouter from './routes/platos.routes.js';
import categoriasRouter from './routes/categorias.routes.js';

app.use('/api/platos', platosRouter);
app.use('/api/categorias', categoriasRouter);
```

---

## 📋 Códigos de estado de referencia

| Situación | Código |
|-----------|--------|
| Éxito general | 200 |
| Creación exitosa | 201 |
| Body inválido / validación falla | 400 |
| Recurso no encontrado | 404 |
| Error del servidor | 500 |

---

## 📝 Buenas prácticas de commits

- `feat: implementa GET /platos/:id`
- `fix: corrige 404 en búsqueda por categoría`
- `docs: actualiza README con ejemplos`
- `refactor: extrae lógica de filtros al controller`
