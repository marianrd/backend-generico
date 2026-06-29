import mongoose from 'mongoose';

// ↓ CAMBIAR: nombre del Schema y campos según el enunciado
const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'], // ← CAMBIAR mensaje
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'], // ← CAMBIAR
      min: [0, 'El precio no puede ser negativo'],  // ← CAMBIAR o eliminar
    },
    categoria: {
      type: String,
      required: false,     // ← CAMBIAR a true si es obligatorio
      default: 'General',  // ← CAMBIAR o eliminar
    },
    disponible: {
      type: Boolean,
      default: true,       // ← CAMBIAR o eliminar
    },
    stock: {
      type: Number,
      default: 0,
    },
    // Podés agregar más campos:
    // descripcion: { type: String },
    // imagen:      { type: String },
    // fechaAlta:   { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// 'Producto' → colección 'productos' en MongoDB  ← CAMBIAR
const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
