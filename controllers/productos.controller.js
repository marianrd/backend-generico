import Producto from '../models/producto.model.js'; // ← CAMBIAR el modelo

// GET /api/productos
// Soporta filtros por query string: ?categoria=X&disponible=true
export const getAll = async (req, res) => {
  try {
    const filtros = {};
    if (req.query.categoria) filtros.categoria = req.query.categoria;
    if (req.query.disponible !== undefined) {
      filtros.disponible = req.query.disponible === 'true';
    }

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

    if (!body.nombre || body.precio === undefined) { // ← CAMBIAR campos obligatorios
      return res.status(400).json({ error: 'Faltan campos obligatorios: nombre y precio' });
    }

    const nuevo = new Producto(body); // ← CAMBIAR modelo
    const guardado = await nuevo.save();

    res.status(201).json(guardado);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Ya existe un registro con ese valor único' });
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
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Ya existe un registro con ese valor único' });
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

// GET /api/productos/buscar?nombre=X&codigo=Y&disponible=true
// ← CAMBIAR los campos de búsqueda según tu modelo
export const buscar = async (req, res) => {
  try {
    const { nombre, codigo, disponible } = req.query; // ← CAMBIAR campos

    if (!nombre && !codigo && disponible === undefined) {
      return res.status(400).json({
        error: 'Debés enviar al menos un parámetro: nombre, codigo o disponible',
      });
    }

    const filtros = {};
    if (nombre) filtros.nombre = { $regex: nombre, $options: 'i' };
    if (codigo) filtros.codigo = { $regex: codigo, $options: 'i' }; // ← CAMBIAR o eliminar
    if (disponible !== undefined) filtros.disponible = disponible === 'true';

    const resultados = await Producto.find(filtros); // ← CAMBIAR modelo

    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados' });
    }

    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/productos/categoria/:nombre
export const getByCategoria = async (req, res) => {
  try {
    const { nombre } = req.params;

    const productos = await Producto.find({ // ← CAMBIAR modelo
      categoria: { $regex: `^${nombre}$`, $options: 'i' }, // ← CAMBIAR campo
    });

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: `No hay productos en la categoría "${nombre}"` });
    }

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/productos/precio/:rango
// Ejemplo: /api/productos/precio/100-500   ← CAMBIAR campo si no es precio
export const getByRango = async (req, res) => {
  try {
    const partes = req.params.rango.split('-');

    if (partes.length !== 2) {
      return res.status(400).json({
        error: 'Formato inválido. Usá /precio/:min-:max  (ej: /precio/100-500)',
      });
    }

    const min = Number(partes[0]);
    const max = Number(partes[1]);

    if (isNaN(min) || isNaN(max)) {
      return res.status(400).json({ error: 'Los valores deben ser números' });
    }

    if (min > max) {
      return res.status(400).json({ error: 'El valor mínimo no puede ser mayor al máximo' });
    }

    const productos = await Producto.find({ precio: { $gte: min, $lte: max } }); // ← CAMBIAR campo

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: `No hay productos con precio entre $${min} y $${max}` });
    }

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
