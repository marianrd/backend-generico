import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
  buscar,
  getByCategoria,
  getByRango,
} from '../controllers/productos.controller.js'; // ← CAMBIAR nombre del archivo

const router = Router();

// Montadas sobre '/api/productos' (definido en app.js)  ← CAMBIAR ruta base

// Rutas específicas ANTES de /:id (evita que Express las interprete como IDs)
router.get('/buscar', buscar);                  // GET /api/productos/buscar?nombre=X
router.get('/categoria/:nombre', getByCategoria); // GET /api/productos/categoria/General
router.get('/precio/:rango', getByRango);         // GET /api/productos/precio/100-500

// CRUD básico
router.get('/', getAll);           // GET    /api/productos
router.get('/:id', getById);       // GET    /api/productos/:id
router.post('/', create);          // POST   /api/productos
router.put('/:id', update);        // PUT    /api/productos/:id
router.delete('/:id', remove);     // DELETE /api/productos/:id

export default router;
