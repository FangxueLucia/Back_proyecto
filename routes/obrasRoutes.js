const express = require('express');
// Importa Express, que sirve para crear rutas y manejar peticiones

const router = express.Router();
// Crea un "router", que es un mini-servidor donde definimos las rutas de esta parte de la API

const Obra = require('../models/obrasModel');
// Importa el modelo Obra desde la carpeta models

const Artista = require('../models/artistasModel');
// Importa el modelo Artista, por si hace falta obtener datos del artista

// -----------------------------------------------------------------------------
//  GET /api/obras
// -----------------------------------------------------------------------------
// Esta ruta devuelve TODAS las obras de la base de datos
// Además, populate('artista') hace que en lugar del ID del artista,
// aparezca el objeto completo del artista (nombre, nacionalidad, etc.)
router.get('/', async (req, res) => {
const obras = await Obra.find().populate('artista');
// Busca todas las obras y rellena la información completa del artista relacionado

res.json(obras);  
// Envía las obras como respuesta en formato JSON


});

// -----------------------------------------------------------------------------
//  POST /api/obras
// -----------------------------------------------------------------------------
// Esta ruta sirve para crear una obra NUEVA
// Los datos llegan desde el frontend (Angular) por req.body
router.post('/', async (req, res) => {


const nuevaObra = await Obra.create(req.body);  
// Crea una nueva obra usando los datos enviados desde el cliente

res.json(nuevaObra);  
// Devuelve al cliente la obra recién creada


});

// Exportamos el router para que el server.js pueda usarlo
module.exports = router;


