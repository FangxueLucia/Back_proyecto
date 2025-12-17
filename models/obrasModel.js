import mongoose from "mongoose";
// Importamos mongoose usando ESM (import)
// Esto es obligatorio porque el proyecto usa `"type": "module"`

const { Schema, model } = mongoose;
// Extraemos Schema (para definir la estructura de la colección)
// y model (para crear el modelo que usaremos en el código)

const obraSchema = new Schema({
  titulo: { type: String, required: true },
  artista: { type: Schema.Types.ObjectId, ref: "Artista", required: true },
  anio: Number,
  tipo: String,
  categoria: { type: String, required: true }, // 👈 ESTO ES CLAVE
  precio: Number,
  disponible: { type: Boolean, default: true },
  image: String,
  bibliografia: String
});

// Exportamos el modelo como exportación por defecto
// Esto permite importarlo así:
// import Obra from "../models/obrasModel.js";
export default model("Obra", obraSchema);