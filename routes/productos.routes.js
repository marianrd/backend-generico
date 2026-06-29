import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/productos.controller.js'; // ← CAMBIAR nombre del archivo

const router = Router();

// Montadas sobre '/api/productos' (definido en app.js)
// GET    /api/productos          → todos
// GET    /api/productos/:id      → uno por id
// POST   /api/productos          → crear
// PUT    /api/productos/:id      → actualizar
// DELETE /api/productos/:id      → eliminar

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
