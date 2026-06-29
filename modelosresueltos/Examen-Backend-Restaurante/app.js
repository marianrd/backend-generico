require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/database')
const platosRoutes = require('./routes/platoRoutes')

connectDB()

app.use(express.json())
app.use('/api/platos', platosRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})