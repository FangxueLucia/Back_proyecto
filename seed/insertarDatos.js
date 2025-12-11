const mongoose = require('mongoose');
// Importamos Mongoose, la librería que permite conectar y trabajar con MongoDB

const Artista = require('../models/artistasModel.js');
// Importamos el modelo "Artista" desde la carpeta models

const Obra = require('../models/obrasModel.js');
// Importamos el modelo "Obra" desde la carpeta models

// -----------------------------------------------------------------------------
// Conexión a la base de datos MongoDB
// -----------------------------------------------------------------------------
mongoose.connect('mongodb+srv://yabastafer:Patata1234@clusterproyecto.hymy05e.mongodb.net/proyecto')
// Conectamos a la base de datos llamada "galeria" en localhost
.then(() => console.log('Conectado a MongoDB'))
// Si conecta bien, muestra este mensaje
.catch(err => console.log(err));
// Si NO conecta, muestra el error

// -----------------------------------------------------------------------------
// Función que insertará los datos de artistas y obras
// -----------------------------------------------------------------------------
async function insertarDatos() {
try {
// ---------------------------------------------------------------------
// BORRAR LOS DATOS EXISTENTES
// deleteMany() elimina TODOS los documentos de la colección
// ---------------------------------------------------------------------
await Artista.deleteMany();
// Borra todos los artistas anteriores para evitar duplicados

    await Obra.deleteMany();
    // Borra todas las obras anteriores por si ya había datos


    // ---------------------------------------------------------------------
    // INSERTAR ARTISTAS
    // insertMany() añade varios artistas a la vez
    // ---------------------------------------------------------------------
    const artistas = await Artista.insertMany([
        { nombre: "Frida Kahlo", nacionalidad: "Mexicana", fechaNacimiento: new Date("1907-07-06") },
        { nombre: "Vincent van Gogh", nacionalidad: "Holandés", fechaNacimiento: new Date("1853-03-30") }
    ]);
    // "artistas" será un array con los documentos creados, incluyendo sus _id de MongoDB


    // ---------------------------------------------------------------------
    // CREAR UN DICCIONARIO PARA RELACIONAR NOMBRE → ID
    // Esto sirve para que al insertar obras podamos poner el artista correcto
    // ---------------------------------------------------------------------
    const dict = {};
    artistas.forEach(a => dict[a.nombre] = a._id);
    // Ejemplo: dict["Frida Kahlo"] = 609d0f2934ae23f1d8c12345


    // ---------------------------------------------------------------------
    // INSERTAR OBRAS (EJEMPLO)
    // Aquí usamos los IDs obtenidos arriba: dict["Nombre"]
    // ---------------------------------------------------------------------
    await Obra.insertMany([
        { titulo: "La Casa Azul", artista: dict["Frida Kahlo"], anio: 1932, tipo: "Pintura", precio: 500000 },
        { titulo: "La noche estrellada", artista: dict["Vincent van Gogh"], anio: 1889, tipo: "Pintura", precio: 1000000 }
    ]);
    // Cada obra queda vinculada a su artista mediante su ID


    console.log("Datos insertados correctamente");
    // Mensaje positivo si todo salió bien

    mongoose.disconnect();
    // Cerramos la conexión a MongoDB cuando terminamos

} catch (error) {
    // Si algo falla, mostramos el error en consola
    console.log(error);
}


}

// -----------------------------------------------------------------------------
// LLAMAR A LA FUNCIÓN PARA EJECUTAR TODO
// -----------------------------------------------------------------------------
insertarDatos();
// Al ejecutar este archivo con node insertarDatos.js se insertarán los datos
