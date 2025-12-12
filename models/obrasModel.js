import mongoose from "mongoose";
// Importamos mongoose usando ESM (import)
// Esto es obligatorio porque el proyecto usa `"type": "module"`

const { Schema, model } = mongoose;
// Extraemos Schema (para definir la estructura de la colección)
// y model (para crear el modelo que usaremos en el código)

const obraSchema = new Schema({
  // Aquí definimos cómo será una "Obra" dentro de la base de datos

  titulo: {
    type: String,
    required: true,
  },
  // "titulo" es un texto obligatorio
  // No se puede crear una obra sin nombre/título

  artista: {
    type: Schema.Types.ObjectId,
    ref: "Artista",
    required: true,
  },
  // "artista" guarda el ID de un artista existente
  // ObjectId indica que es una referencia a otro documento
  // ref: "Artista" enlaza con el modelo Artista
  // required: true → toda obra debe tener artista

  anio: Number,
  // "anio" es opcional y representa el año de creación

  tipo: String,
  // "tipo" indica el tipo de obra: Pintura, Escultura, etc.

  precio: Number,
  // "precio" es opcional, valor de la obra

  disponible: {
    type: Boolean,
    default: true,
  },
  // "disponible" indica si la obra está disponible para venta
  // Por defecto es true
});

// Creamos el modelo "Obra" a partir del esquema
// El nombre "Obra" será el nombre de la colección (en plural) en MongoDB
const Obra = model("Obra", obraSchema);

// Exportamos el modelo como exportación por defecto
// Esto permite importarlo así:
// import Obra from "../models/obrasModel.js";
export default Obra;
