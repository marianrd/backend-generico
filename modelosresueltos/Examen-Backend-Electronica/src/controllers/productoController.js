const Producto = require('../models/producto')

const getAll = async (req, res) => {
    try{
        const productos = await Producto.find()
        res.status(200).json(productos)
    }catch (error) {
        res.status(500).json({ message: 'Error al obtener productos'})
    }
}

const getByCodigo = async (req, res) => {
    try{
        const producto = await Producto.findOne({codigo: req.params.codigo})
        if(!producto) return res.status(404).json({ message: 'Producto no encontrado'})
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto'})
    }
}

const create = async (req, res) => {
    try{
        const nuevoProducto = new Producto(req.body)
        await nuevoProducto.save()
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto' })
    }
}

const update = async (req, res) => {
    try {
        const producto = await Producto.findOneAndUpdate(
            { codigo: req.params.codigo },
            req.body,
            { new: true}
        )
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado'})
            res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto' })
    }
}

const remove = async (req, res) => {
    try {
        const producto = await Producto.findOneAndDelete({ codigo: req.params.codigo})
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' })
            res.status(200).json({ message: 'Producto eliminado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto'})
    }
}

const getByFilter = async (req, res) => {
    try {
        const { categoria, precioMax, precioMin } = req.query
        const filtro ={} 
        if (categoria) filtro.categorias = categoria
        if (precioMin) filtro.precio = { ...filtro.precio, $gte: Number(precioMin) }
        if (precioMax) filtro.precio = { ...filtro.precio, $lte: Number(precioMax) }

        const productos = await Producto.find(filtro)
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar productos' })
    }
}

module.exports = {
    getAll,
    getByCodigo,
    create,
    update,
    remove,
    getByFilter
}