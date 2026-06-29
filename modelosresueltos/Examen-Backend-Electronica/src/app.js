const express = require('express')
const app = express()
const connectDB = require('./config/database')
const productosRoutes = require('./routes/productoRoutes')

connectDB()

app.use(express.json())
app.use('/api/productos', productosRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})