import Producto from '../models/producto.model.js'; // ← CAMBIAR el modelo

// GET /api/productos
export const getAll = async (req, res) => {
  try {
    // Filtros por query string: ?categoria=tech&disponible=true  ← CAMBIAR
    const filtros = {};
    if (req.query.categoria) filtros.categoria = req.query.categoria;
    if (req.query.disponible) filtros.disponible = req.query.disponible;

    const productos = await Producto.find(filtros); // ← CAMBIAR modelo
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/productos/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id); // ← CAMBIAR modelo

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' }); // ← CAMBIAR mensaje
    }

    res.status(200).json(producto);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: error.message });
  }
};

// POST /api/productos
// Body esperado: { nombre, precio, categoria, disponible, stock }  ← CAMBIAR
export const create = async (req, res) => {
  try {
    const body = req.body;

    if (!body.nombre || !body.precio) { // ← CAMBIAR campos obligatorios
      return res.status(400).json({ error: 'Faltan campos obligatorios: nombre y precio' });
    }

    const nuevo = new Producto(body); // ← CAMBIAR modelo
    const guardado = await nuevo.save();

    res.status(201).json(guardado);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/productos/:id
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
      { new: true, runValidators: true }
    ); // ← CAMBIAR modelo

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

// DELETE /api/productos/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Producto.findByIdAndDelete(id); // ← CAMBIAR modelo

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
