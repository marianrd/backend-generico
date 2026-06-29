import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import productosRouter from './routes/productos.routes.js'; // ← CAMBIAR

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando ✅' });
});

app.use('/api/productos', productosRouter); // ← CAMBIAR ruta y router

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
  });
});
