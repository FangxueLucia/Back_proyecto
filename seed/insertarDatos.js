// Importamos Mongoose para conectarnos y trabajar con MongoDB
import mongoose from 'mongoose';

// Importamos los modelos que ya definimos en /models
// Artista y Obra son colecciones de nuestra base de datos
import Artista from '../models/artistasModel.js';
import Obra from '../models/obrasModel.js';

// Importamos dotenv para poder usar variables de entorno desde un archivo .env
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables del archivo .env en process.env

// -------------------- DATOS A INSERTAR --------------------

//Artistas------
const nombresArtistas = [
  "Anónimo / artistas Paleolíticos",
  "Anónimo (taller funerario del Antiguo Egipto)",
  "Agesandro, Polidoro y Atenodoro (escuela helenística)",
  "Anónimo (mosaísta bizantino)",
  "Anónimo / escuela gótica medieval",
  "Miguel Ángel",
  "Diego Velázquez",
  "Francisco de Goya",
  "Eugène Delacroix",
  "Claude Monet",
  "Édouard Manet",
  "Vincent van Gogh",
  "Edvard Munch",
  "Pablo Picasso",
  "Marcel Duchamp",
  "Salvador Dalí",
  "Jackson Pollock",
  "Andy Warhol",
  "Joseph Kosuth",
  "Cindy Sherman",
  "Judy Chicago",
  "Nam June Paik",
  "Jean-Michel Basquiat",
  "Damien Hirst",
  "Richard Serra",
  "Banksy",
  "Ai Weiwei",
  "Refik Anadol"
];

// Obras--------
const obras1 = [
  { tittle: "Pinturas rupestres de la Cueva de Altamira", artist: "Anónimo / artistas Paleolíticos", year: -15000, type: "Pintura rupestre", image:"/ImagenesDeObras/altamira.jpg" },
  { tittle: "Máscara funeraria de Tutankamon", artist: "Anónimo (taller funerario del Antiguo Egipto)", year: -1323, type: "Objeto funerario / Máscara", image: "/ImagenesDeObras/MascaraTutan-Kamon.jpg" },
  { tittle: "Laocoonte y sus hijos", artist: "Agesandro, Polidoro y Atenodoro (escuela helenística)", year: -40, type: "Escultura", image: "/ImagenesDeObras/Laocoonte.jpg" },
  { tittle: "Mosaico del Emperador Justiniano y su séquito (San Vital, Rávena)", artist: "Anónimo (mosaísta bizantino)", year: 547, type: "Mosaico", image: "/ImagenesDeObras/MosaicoJustiniano.jpg" },
  { tittle: "La Piedad de Villeneuve-les-Avignon", artist: "Anónimo / escuela gótica medieval", year: 1360, type: "Escultura / Pintura gótica", image: "/ImagenesDeObras/LaPiedad.jpg" },
  { tittle: "David", artist: "Miguel Ángel", year: 1504, type: "Escultura", image: "/ImagenesDeObras/David.jpg" },
  { tittle: "La creación de Adán (Capilla Sixtina)", artist: "Miguel Ángel", year: 1512, type: "Fresco", image: "/ImagenesDeObras/LaCreacionDeAdan.jpg" },
  { tittle: "Las Meninas", artist: "Diego Velázquez", year: 1656, type: "Pintura", image: "/ImagenesDeObras/LasMeninas.jpg" },
  { tittle: "El 3 de Mayo en Madrid (Los fusilamientos)", artist: "Francisco de Goya", year: 1814, type: "Pintura", image: "/ImagenesDeObras/Fusilamiento.jpg" },
  { tittle: "La Libertad guiando al pueblo", artist: "Eugène Delacroix", year: 1830, type: "Pintura", image: "/ImagenesDeObras/LibertadGuiandoAlPueblo.jpg" }
];

export const obras2 = [
  { tittle: "Impresión, sol naciente", artist: "Claude Monet", year: 1872, type: "Pintura", image: "/ImagenesDeObras/ImpresionSolNaciente.jpg" },
  { tittle: "Un bar en el Folies-Bergère", artist: "Édouard Manet", year: 1882, type: "Pintura", image: "/ImagenesDeObras/UnBarEnElFolies-Bergere.jpg" },
  { tittle: "La noche estrellada", artist: "Vincent van Gogh", year: 1889, type: "Pintura", image: "/ImagenesDeObras/LaNocheEstrellada.jpg" },
  { tittle: "El grito", artist: "Edvard Munch", year: 1893, type: "Pintura", image: "/ImagenesDeObras/ElGrito.jpg" },
  { tittle: "Las señoritas de Aviñón", artist: "Pablo Picasso", year: 1907, type: "Pintura", image: "/ImagenesDeObras/LasSeñoritasDeAvignon.jpg" },
  { tittle: "Fountain", artist: "Marcel Duchamp", year: 1917, type: "Escultura / Ready-made", image: "/ImagenesDeObras/Fountain.jpg" },
  { tittle: "La persistencia de la memoria", artist: "Salvador Dalí", year: 1931, type: "Pintura", image: "/ImagenesDeObras/LaPersistenciaDeLaMemoria.jpg" },
  { tittle: "Guernica", artist: "Pablo Picasso", year: 1937, type: "Pintura", image: "/ImagenesDeObras/Guernica.jpg" },
  { tittle: "Number 5, 1948", artist: "Jackson Pollock", year: 1948, type: "Pintura / Expresionismo abstracto", image: "/ImagenesDeObras/Number5.jpg" },
  { tittle: "Latas de sopa Campbell", artist: "Andy Warhol", year: 1962, type: "Pintura / Arte pop", image: "/ImagenesDeObras/LatasDeSopaCampbell.jpg" }
];

export const obras3 = [
  { tittle: "Una y Tres Sillas", artist: "Joseph Kosuth", year: 1965, type: "Instalación / Arte conceptual", image: "/ImagenesDeObras/UnaYTresSillas.jpg" },
  { tittle: "Untitled Film Stills (Series)", artist: "Cindy Sherman", year: 1977, type: "Fotografía", image: "/ImagenesDeObras/CindySherman.jpg" },
  { tittle: "The Dinner Party", artist: "Judy Chicago", year: 1979, type: "Instalación", image: "/ImagenesDeObras/DinnerParty.jpg" },
  { tittle: "TV Buddha (Series)", artist: "Nam June Paik", year: 1974, type: "Videoarte / Instalación", image: "/ImagenesDeObras/TVBuddha.jpg" },
  { tittle: "Mona Lisa", artist: "Jean-Michel Basquiat", year: 1983, type: "Pintura", image: "/ImagenesDeObras/MonaLisaBasquiat.jpg" },
  { tittle: "Away from the Flock (El cordero imposible)", artist: "Damien Hirst", year: 1994, type: "Escultura / Instalación", image: "/ImagenesDeObras/ElCorderoImposible.jpg" },
  { tittle: "The Matter of Time (Una cuestión de tiempo)", artist: "Richard Serra", year: 2005, type: "Escultura / Instalación", image: "/ImagenesDeObras/TheMatterOfTime.jpg" },
  { tittle: "Girl with Balloon", artist: "Banksy", year: 2002, type: "Pintura / Arte urbano", image: "/ImagenesDeObras/GirlWithBalloon.jpg" },
  { tittle: "Sunflower Seeds (Semillas de girasol)", artist: "Ai Weiwei", year: 2010, type: "Instalación", image: "/ImagenesDeObras/SemillasDeGirasol.jpg" },
  { tittle: "Machine Hallucinations (Series)", artist: "Refik Anadol", year: 2019, type: "Arte digital / Instalación", image: "/ImagenesDeObras/MachineHallucination.jpg" }
];
// -------------------- CONEXIÓN A MONGODB --------------------
// Nos conectamos a la base de datos usando la URI de .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 Conectado a MongoDB')) // Si conecta bien, mostramos mensaje
  .catch(err => console.error('❌ Error conectando a MongoDB:', err)); // Si falla, mostramos error

// Función que insertará los datos de artistas y obras
// -----------------------------------------------------------------------------




export async function insertarDatos() {
  try {
    // Borra datos existentes
    await Artista.deleteMany({});
    await Obra.deleteMany({});

    console.log("Insertando artistas...");

    // Inserta artistas y guarda sus IDs
    const artistasDocs = await Artista.insertMany(
      nombresArtistas.map(nombre => ({ nombre }))
    );

    const diccionario = {};
    artistasDocs.forEach(a => diccionario[a.nombre] = a._id);

    console.log("Insertando obras...");

    // Combina todas las obras
    const todasObras = [...obras1, ...obras2, ...obras3];

    // Mapear obras para que coincidan con el esquema
    const obrasConIds = todasObras.map(o => ({
      titulo: o.tittle,              // renombrado
      artista: diccionario[o.artist], // ObjectId del artista
      anio: o.year,
      tipo: o.type,
      precio: o.price || 0,          // si quieres agregar precio, opcional
      disponible: true,
      image: o.image
    }));

    // Inserta todas las obras
    await Obra.insertMany(obrasConIds);

    console.log("✔ Datos insertados correctamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit();
  }
}

