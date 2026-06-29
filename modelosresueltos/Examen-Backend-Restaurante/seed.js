require('dotenv').config()
const mongoose = require('mongoose')
const Plato = require('./models/plato')
const platos = require('../data/menu.json')

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    await Plato.deleteMany()
    await Plato.insertMany(platos)
    console.log('Base de datos poblada')
    process.exit()
}

seed()