const mongoose = require('mongoose')

const platoSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: {type: String, required: true},
    precio: { type: Number, required: true },
    categoria: { type: String, required: true }
})

const Plato = mongoose.model('Plato', platoSchema)

module.exports = Plato