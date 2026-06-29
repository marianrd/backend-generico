const Plato = require('../models/plato')

const getAll = async (req, res) => {
    try{
        const platos = await Plato.find()
        res.status(200).json(platos)
    }catch (error) {
        res.status(500).json({ message: 'Error al obtener platos'})
    }
}

const getById = async (req, res) => {
    try{
        const plato = await Plato.findOne({id: req.params.id})
        if(!plato) return res.status(404).json({ message: 'Plato no encontrado'})
        res.status(200).json(plato)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener plato'})
    }
}

const create = async (req, res) => {
    try{
        const nuevoPlato = new Plato(req.body)
        await nuevoPlato.save()
        res.status(201).json(nuevoPlato)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear plato' })
    }
}

const update = async (req, res) => {
    try {
        const plato = await Plato.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true}
        )
        if (!plato) return res.status(404).json({ message: 'Plato no encontrado'})
            res.status(200).json(plato)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar Plato' })
    }
}

const remove = async (req, res) => {
    try {
        const plato = await Plato.findOneAndDelete({ id: req.params.id})
        if (!plato) return res.status(404).json({ message: 'plato no encontrado' })
            res.status(200).json({ message: 'plato eliminado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar plato'})
    }
}

const buscar = async (req, res) => {
    try {
        const { nombre } = req.query
        const platos = await Plato.find({ 
            nombre: { $regex: nombre, $options: 'i' } 
        })
        res.status(200).json(platos)
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar platos' })
    }
}

const getByCategoria = async (req, res) => {
    try {
        const platos = await Plato.find({ categoria: req.params.nombre })
        if (platos.length === 0) return res.status(404).json({ message: 'No hay platos en esa categoría' })
        res.status(200).json(platos)
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar por categoría' })
    }
}

const getByPrecio = async (req, res) => {
    try {
        const { min, max } = req.params
        const platos = await Plato.find({ 
            precio: { $gte: Number(min), $lte: Number(max) } 
        })
        if (platos.length === 0) return res.status(404).json({ message: 'No hay platos en ese rango de precio' })
        res.status(200).json(platos)
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar por precio' })
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    buscar,
    getByCategoria,
    getByPrecio
}

const Modelo = require('../models/modelo')

// TRAER TODOS
const getAll = async (req, res) => {
    try {
        const datos = await Modelo.find()
        res.status(200).json(datos)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener datos' })
    }
}

// TRAER UNO POR ID
const getById = async (req, res) => {
    try {
        const dato = await Modelo.findOne({ id: req.params.id })
        if (!dato) return res.status(404).json({ message: 'No encontrado' })
        res.status(200).json(dato)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener dato' })
    }
}

// CREAR
const create = async (req, res) => {
    try {
        const nuevo = new Modelo(req.body)
        await nuevo.save()
        res.status(201).json(nuevo)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear dato' })
    }
}

// ACTUALIZAR
const update = async (req, res) => {
    try {
        const dato = await Modelo.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        )
        if (!dato) return res.status(404).json({ message: 'No encontrado' })
        res.status(200).json(dato)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar dato' })
    }
}

// ELIMINAR
const remove = async (req, res) => {
    try {
        const dato = await Modelo.findOneAndDelete({ id: req.params.id })
        if (!dato) return res.status(404).json({ message: 'No encontrado' })
        res.status(200).json({ message: 'Eliminado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar dato' })
    }
}

// BUSCAR POR TEXTO PARCIAL
const buscar = async (req, res) => {
    try {
        const { nombre } = req.query
        const datos = await Modelo.find({ nombre: { $regex: nombre, $options: 'i' } })
        res.status(200).json(datos)
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar' })
    }
}

// FILTRAR POR CAMPO EXACTO
const getByCategoria = async (req, res) => {
    try {
        const datos = await Modelo.find({ categoria: req.params.nombre })
        if (datos.length === 0) return res.status(404).json({ message: 'No hay datos' })
        res.status(200).json(datos)
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar por categoria' })
    }
}

// FILTRAR POR RANGO DE PRECIO
const getByPrecio = async (req, res) => {
    try {
        const { min, max } = req.params
        const datos = await Modelo.find({ precio: { $gte: Number(min), $lte: Number(max) } })
        if (datos.length === 0) return res.status(404).json({ message: 'No hay datos en ese rango' })
        res.status(200).json(datos)
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar por precio' })
    }
}

// FILTRAR POR MULTIPLES QUERY PARAMS
const getByFilter = async (req, res) => {
    try {
        const { categoria, precioMin, precioMax } = req.query
        const filtro = {}
        if (categoria) filtro.categoria = categoria
        if (precioMin) filtro.precio = { ...filtro.precio, $gte: Number(precioMin) }
        if (precioMax) filtro.precio = { ...filtro.precio, $lte: Number(precioMax) }
        const datos = await Modelo.find(filtro)
        res.status(200).json(datos)
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar' })
    }
}

// ORDENAR
const getOrdenados = async (req, res) => {
    try {
        const datos = await Modelo.find().sort({ precio: 1 }) // 1 asc, -1 desc
        res.status(200).json(datos)
    } catch (error) {
        res.status(500).json({ message: 'Error al ordenar' })
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    buscar,
    getByCategoria,
    getByPrecio,
    getByFilter,
    getOrdenados
}