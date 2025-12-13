import mongoose from "mongoose";
// Importa Mongoose, que sirve para trabajar con MongoDB usando modelos y esquemas

const { Schema, model } = mongoose;
// Extrae "Schema" (para definir la estructura de los datos)
// y "model" (para crear el modelo basado en esa estructura)

const artistaSchema = new Schema({
// Aquí definimos cómo será un "Artista" dentro de la base de datos


nombre: { type: String, required: true },
// "nombre" es un campo tipo texto (String)
// "required: true" significa que es obligatorio. No se puede crear un artista sin nombre.

nacionalidad: String,
// "nacionalidad" es opcional. Si quieres puedes poner "Mexicana", "Española", etc.

fechaNacimiento: Date,
// "fechaNacimiento" es de tipo fecha. También es opcional.

biografia: String
// "biografia" es un texto opcional con información del artista

});
// Creamos el modelo "Artista" a partir del esquema definido arriba

const Artista = model("Artista", artistaSchema);

// Exporta el modelo "Artista", que usaremos para crear, leer y modificar artistas en MongoDB
export default Artista;
