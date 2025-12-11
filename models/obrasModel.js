const mongoose = require('mongoose');
// Importa Mongoose para poder crear modelos y trabajar con MongoDB

const { Schema, model } = mongoose;
// Extrae "Schema" (para definir la estructura de la colección)
// y "model" (para crear el modelo que usaremos en el código)

const obraSchema = new Schema({
// Aquí definimos cómo será una "Obra" dentro de la base de datos

titulo: { type: String, required: true },
// "titulo" es un texto obligatorio (String)
// No se puede crear una obra sin nombre/título

artista: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
// "artista" guarda el ID de un artista que ya existe
// Schema.Types.ObjectId indica que es un ID de MongoDB
// ref: 'Artista' sirve para enlazar con el modelo "Artista"
// required: true → una obra SIEMPRE debe estar asociada a un artista

anio: Number,
// "anio" es opcional y representa el año en que se creó la obra

tipo: String,
// "tipo" puede ser: "Pintura", "Escultura", "Fotografía", etc.

precio: Number,
// "precio" es opcional. Puedes poner el valor que quieras.

disponible: { type: Boolean, default: true }
// "disponible" indica si la obra está disponible (true) o vendida (false)
// Si no se especifica nada, por defecto será TRUE


});

// Exporta el modelo "Obra" para usarlo en rutas, seeds, etc.
module.exports = model('Obra', obraSchema);
