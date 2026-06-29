const mongoose = require('mongoose')

const connectDB = async () => {
    try {
         await mongoose.connect('mongodb+srv://fran:fionamon777@cluster0.bcvg7nb.mongodb.net/electronicos?appName=Cluster0')
        console.log('Conectado a MongoDB')
    }catch (error) {
        console.error('Error al conectar a MongoDB:', error)
        process.exit(1)
    }
}

module.exports = connectDB