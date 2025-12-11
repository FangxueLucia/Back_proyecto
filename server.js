// ======================== CARGAR VARIABLES DE ENTORNO ========================

// Esto carga el archivo .env donde guardamos datos privados como el puerto o la URL de MongoDB
require('dotenv').config();


// ======================== IMPORTAR LIBRERÍAS ========================

// Importamos Express, que sirve para crear un servidor web
const express = require('express');

// Importamos Mongoose, que sirve para conectarse y trabajar con MongoDB
const mongoose = require('mongoose');

// Creamos una aplicación (servidor) con Express
const app = express();

// Hacemos que el servidor entienda datos en formato JSON en las peticiones
app.use(express.json());


// ======================== CONECTAR A MONGODB ========================

// Nos conectamos a MongoDB usando la URL que está en el archivo .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 Conectado a MongoDB"))  // Si se conecta bien, muestra mensaje
    .catch(err => console.error(err));  // Si falla, muestra el error


// ======================== MODELOS (TABLAS) ========================

// Extraemos Schema y model de mongoose (sirven para crear estructuras y modelos)
const { Schema, model } = mongoose;


// ------------------------ MODELO ARTISTA ------------------------

// Definimos cómo será un artista en la base de datos
const artistaSchema = new Schema({
    nombre: { type: String, required: true },  // El nombre es obligatorio
    nacionalidad: String,                      // País del artista
    fechaNacimiento: Date,                     // Su fecha de nacimiento
    biografia: String                          // Información sobre su vida
});

// Creamos el modelo "Artista" que corresponde a la colección en MongoDB
const Artista = model("Artista", artistaSchema);


// ------------------------ MODELO TIPO DE OBRA ------------------------

// Aquí definimos una nueva "tabla": Tipo de obra (pintura, escultura, etc.)
const tipoObraSchema = new Schema({
    nombre: { type: String, required: true },  // Nombre del tipo de obra
    descripcion: String                         // Una descripción opcional
});

// Creamos el modelo TipoObra
const TipoObra = model("TipoObra", tipoObraSchema);


// ------------------------ MODELO OBRA ------------------------

// Aquí definimos cómo será una "obra de arte" en la base de datos
const obraSchema = new Schema({
    title: { type: String, required: true },  // Título de la obra (obligatorio)

    artist: {                                  // Aquí guardamos *el artista que creó la obra*
        type: Schema.Types.ObjectId,            // Este es el tipo para guardar IDs de MongoDB
        ref: "Artista",                         // Esto indica que se conecta con el modelo Artista
        required: true
    },

    year: Number,                               // Año en que fue creada la obra

    tipoObra: {                                 // Tipo de obra (pintura, escultura...)
        type: Schema.Types.ObjectId,
        ref: "TipoObra"
    },

    price: Number,                              // Precio de la obra
    disponible: { type: Boolean, default: true } // Si se puede comprar o no
});

// Creamos el modelo Obra
const Obra = model("Obra", obraSchema);


// ======================== RUTAS (ENDPOINTS) ========================
// Estas son las URLs que el usuario puede usar para pedir o enviar datos.


// ------------------------ ARTISTAS ------------------------

// GET → Mostrar todos los artistas
app.get('/artistas', async (req, res) => {
    const artistas = await Artista.find();   // Busca todos los artistas
    res.json(artistas);                      // Los manda como respuesta en formato JSON
});

// POST → Crear un artista nuevo
app.post('/artistas', async (req, res) => {
    const artista = await Artista.create(req.body);  // Crea un artista con los datos enviados
    res.json(artista);                               // Devuelve el artista creado
});


// ------------------------ TIPOS DE OBRA ------------------------

// GET → Mostrar todos los tipos de obra
app.get('/tipos-obra', async (req, res) => {
    const tipos = await TipoObra.find();     // Busca todos los tipos de obra
    res.json(tipos);                         // Los devuelve como JSON
});

// POST → Crear un nuevo tipo de obra
app.post('/tipos-obra', async (req, res) => {
    const tipo = await TipoObra.create(req.body);   // Crea un nuevo tipo de obra
    res.json(tipo);                                  // Devuelve el tipo creado
});


// ------------------------ OBRAS ------------------------

// GET → Mostrar todas las obras
app.get('/obras', async (req, res) => {
    const obras = await Obra.find()              // Busca todas las obras
        .populate("artist")                      // Cambia el ID del artista por sus datos reales
        .populate("tipoObra");                   // Igual con el tipo de obra

    res.json(obras);                             // Devuelve las obras completas
});

// POST → Crear una obra nueva
app.post('/obras', async (req, res) => {
    const obra = await Obra.create(req.body);    // Crea una nueva obra
    res.json(obra);                              // Devuelve la obra creada
});


// ======================== INICIAR SERVIDOR ========================

// Arrancamos el servidor en el puerto indicado en el archivo .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
// Muestra un mensaje cuando el servidor está listo