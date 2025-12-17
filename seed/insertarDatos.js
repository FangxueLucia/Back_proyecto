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
export const obras1 = [
  { tittle: "Pinturas rupestres de la Cueva de Altamira", artist: "Anónimo / artistas Paleolíticos", year: -15000, type: "Pintura rupestre", image:"/ImagenesDeObras/altamira.jpg", bibliografia:" Las pinturas rupestres de la Cueva de Altamira, ubicadas en Cantabria, España, son un conjunto excepcional de arte prehistórico que data del Paleolítico Superior, aproximadamente entre 36,000 y 13,000 años atrás. Descubiertas en 1879 por Marcelino Sanz de Sautuola y su hija María, estas pinturas representan principalmente bisontes, ciervos, caballos y otros animales, utilizando técnicas avanzadas como el uso del color y el sombreado para crear una sensación de volumen y movimiento. La cueva fue declarada Patrimonio de la Humanidad por la UNESCO en 1985 debido a su importancia histórica y artística. Las pinturas de Altamira ofrecen una visión invaluable de la vida y las creencias de los primeros seres humanos." },
  { tittle: "Máscara funeraria de Tutankamon", artist: "Anónimo (taller funerario del Antiguo Egipto)", year: -1323, type: "Objeto funerario / Máscara", image: "/ImagenesDeObras/MascaraTutan-Kamon.jpg", bibliografia:" La máscara funeraria de Tutankamón es una obra maestra del arte del Antiguo Egipto, creada alrededor del año 1323 a.C. Esta máscara de oro macizo, incrustada con piedras semipreciosas y vidrios de colores, fue descubierta en 1922 por el arqueólogo Howard Carter en la tumba intacta del joven faraón Tutankamón en el Valle de los Reyes. La máscara representa el rostro idealizado del faraón, con detalles meticulosos que incluyen la barba postiza real y el nemes, el tocado tradicional egipcio. Más que un simple objeto funerario, la máscara simboliza la divinidad y el poder del faraón, y su función era proteger al rey en su viaje al más allá. Actualmente, la máscara se exhibe en el Museo Egipcio de El Cairo y es considerada una de las piezas más emblemáticas del arte egipcio antiguo." },
  { tittle: "Laocoonte y sus hijos", artist: "Agesandro, Polidoro y Atenodoro (escuela helenística)", year: -40, type: "Escultura", image: "/ImagenesDeObras/Laocoonte.jpg", bibliografia:" 'Laocoonte y sus hijos' es una escultura monumental del período helenístico, atribuida a los escultores Agesandro, Polidoro y Atenodoro de Rodas. La obra representa la trágica escena del sacerdote troyano Laocoonte y sus dos hijos siendo atacados por serpientes marinas enviadas por los dioses. Esta escultura destaca por su dinamismo, expresividad y detallada anatomía, capturando el momento de máxima tensión y sufrimiento. Descubierta en Roma en 1506, la obra ha sido admirada por su maestría técnica y su capacidad para transmitir emociones intensas. Actualmente, 'Laocoonte y sus hijos' se encuentra en los Museos Vaticanos y es considerada una de las piezas más importantes del arte clásico." },
  { tittle: "Mosaico del Emperador Justiniano y su séquito (San Vital, Rávena)", artist: "Anónimo (mosaísta bizantino)", year: 547, type: "Mosaico", image: "/ImagenesDeObras/MosaicoJustiniano.jpg", bibliografia:" El Mosaico del Emperador Justiniano y su séquito, ubicado en la Basílica de San Vital en Rávena, Italia, es una obra maestra del arte bizantino creada alrededor del año 547 d.C. Este mosaico representa al emperador Justiniano I acompañado por su corte, incluyendo figuras religiosas y militares, todos ellos adornados con ricos ropajes y coronas. La composición destaca por su uso vibrante del color, la simetría y la frontalidad de las figuras, características típicas del arte bizantino. El mosaico no solo celebra el poder imperial de Justiniano, sino que también simboliza la unión entre la iglesia y el estado. Esta obra es un testimonio significativo de la riqueza cultural y artística del Imperio Bizantino y se conserva como una pieza central del patrimonio artístico mundial." },
  { tittle: "La Piedad de Villeneuve-les-Avignon", artist: "Anónimo / escuela gótica medieval", year: 1360, type: "Escultura / Pintura gótica", image: "/ImagenesDeObras/LaPiedad.jpg", bibliografia:" 'La Piedad de Villeneuve-les-Avignon' es una obra emblemática del arte gótico medieval, creada alrededor de 1360. Esta escultura representa a la Virgen María sosteniendo el cuerpo muerto de Jesucristo después de la crucifixión, capturando un momento de profunda tristeza y compasión. La obra destaca por su detallada representación emocional y su estilo característico del gótico, con figuras alargadas y expresivas que transmiten un sentido de espiritualidad y devoción. Originalmente ubicada en la iglesia de Notre-Dame-des-Pommiers en Villeneuve-les-Avignon, Francia, esta pieza ha sido admirada por su habilidad para evocar empatía y reflexión sobre el sacrificio y la redención. 'La Piedad' es considerada una de las obras más significativas del arte religioso medieval." },
  { tittle: "David", artist: "Miguel Ángel", year: 1504, type: "Escultura", image: "/ImagenesDeObras/David.jpg", bibliografia:" 'David' es una escultura renacentista creada por Miguel Ángel entre 1501 y 1504. Esta obra maestra de mármol representa al joven David, un héroe bíblico, en el momento previo a su enfrentamiento con el gigante Goliat. La escultura destaca por su detallada anatomía, proporciones ideales y expresión de concentración y determinación en el rostro de David. Con una altura de más de 5 metros, 'David' simboliza la fuerza, la juventud y la belleza humana, reflejando los ideales del Renacimiento sobre el potencial humano y la perfección artística. Originalmente encargada para la Catedral de Florencia, la escultura ahora se exhibe en la Galería de la Academia en Florencia, Italia, y es considerada una de las obras más importantes del arte occidental." },
  { tittle: "La creación de Adán (Capilla Sixtina)", artist: "Miguel Ángel", year: 1512, type: "Fresco", image: "/ImagenesDeObras/LaCreacionDeAdan.jpg", bibliografia:" 'La creación de Adán' es un fresco pintado por Miguel Ángel entre 1508 y 1512, ubicado en el techo de la Capilla Sixtina en el Vaticano. Esta obra icónica representa el momento bíblico en el que Dios le da vida a Adán, el primer hombre, a través del toque casi tangencial de sus dedos. El fresco destaca por su composición dinámica, el uso magistral del color y la anatomía detallada de las figuras, reflejando los ideales renacentistas de belleza y proporción. 'La creación de Adán' no solo es una representación visual de un relato religioso, sino que también simboliza la conexión entre lo divino y lo humano. Esta obra es considerada una de las más grandes realizaciones artísticas de Miguel Ángel y un símbolo perdurable del Renacimiento." },
  { tittle: "Las Meninas", artist: "Diego Velázquez", year: 1656, type: "Pintura", image: "/ImagenesDeObras/LasMeninas.jpg", bibliografia:" 'Las Meninas' es una pintura maestra del artista español Diego Velázquez, creada en 1656 durante el Siglo de Oro español. Esta obra compleja y enigmática representa a la infanta Margarita Teresa rodeada de sus damas de honor, con Velázquez incluido en la escena mientras pinta. La composición destaca por su uso innovador de la perspectiva, la luz y el espacio, creando una interacción dinámica entre los personajes y el espectador. 'Las Meninas' explora temas de realidad y representación, cuestionando la naturaleza del arte y la percepción visual. Actualmente se encuentra en el Museo del Prado en Madrid y es considerada una de las pinturas más importantes y estudiadas en la historia del arte occidental." },
  { tittle: "El 3 de Mayo en Madrid (Los fusilamientos)", artist: "Francisco de Goya", year: 1814, type: "Pintura", image: "/ImagenesDeObras/Fusilamiento.jpg", bibliografia:" 'El 3 de Mayo en Madrid', también conocido como 'Los fusilamientos', es una pintura emblemática del artista español Francisco de Goya, creada en 1814. Esta obra representa la brutal represión de las tropas napoleónicas contra los ciudadanos madrileños durante la Guerra de Independencia Española. La composición destaca por su dramatismo, con un uso expresivo del color y la luz para resaltar la figura central del hombre con los brazos levantados, simbolizando la resistencia y el sacrificio. Goya utiliza esta pintura para denunciar la violencia y la injusticia de la guerra, capturando la desesperación y el horror de la escena. 'El 3 de Mayo en Madrid' se encuentra en el Museo del Prado en Madrid y es considerada una de las obras más poderosas y conmovedoras del arte occidental." },
  { tittle: "La Libertad guiando al pueblo", artist: "Eugène Delacroix", year: 1830, type: "Pintura", image: "/ImagenesDeObras/LibertadGuiandoAlPueblo.jpg", bibliografia:" 'La Libertad guiando al pueblo' es una pintura icónica del artista francés Eugène Delacroix, creada en 1830. Esta obra representa una escena alegórica de la Revolución de Julio de 1830 en Francia, donde la figura femenina de la Libertad, personificada como una mujer robusta y decidida, lidera a un grupo diverso de revolucionarios sobre las barricadas. La composición destaca por su dinamismo, uso dramático del color y la luz, y la representación de diferentes clases sociales unidas en la lucha por la libertad. 'La Libertad guiando al pueblo' se ha convertido en un símbolo universal de la resistencia y la lucha por los derechos humanos. Actualmente, la pintura se exhibe en el Museo del Louvre en París y es considerada una de las obras más importantes del Romanticismo." }
];

export const obras2 = [
  { tittle: "Impresión, sol naciente", artist: "Claude Monet", year: 1872, type: "Pintura", image: "/ImagenesDeObras/ImpresionSolNaciente.jpg", bibliografia:" Es una obra fundacional del Impresionismo francés. Esta pintura al óleo sobre lienzo se presentó por primera vez en 1874, en la Primera Exposición Impresionista de París. La crítica de Louis Leroy, al referirse a la obra de forma peyorativa, acabó bautizando el nuevo movimiento artístico. La pintura representa el puerto de Le Havre, ciudad natal del artista, al amanecer. Se conserva en el Musée Marmottan Monet, en París, y está considerada un icono del arte moderno. Enmarcada en la segunda mitad del siglo XIX, responde al estilo impresionista." },
  { tittle: "Un bar en el Folies-Bergère", artist: "Édouard Manet", year: 1882, type: "Pintura", image: "/ImagenesDeObras/UnBarEnElFolies-Bergere.jpg", bibliografia:" Esta obra maestra de Manet, pintada en 1882, es un ejemplo destacado del realismo y la modernidad en el arte del siglo XIX. Representa a una camarera en un bar parisino, con un espejo que refleja la escena detrás de ella, creando una compleja interacción entre el espectador y la imagen. La pintura captura la atmósfera vibrante de la vida urbana y aborda temas de alienación y la dualidad de la percepción. Actualmente se encuentra en el Courtauld Gallery de Londres." },
  { tittle: "La noche estrellada", artist: "Vincent van Gogh", year: 1889, type: "Pintura", image: "/ImagenesDeObras/LaNocheEstrellada.jpg", bibliografia:" Pintada en junio de 1889 durante la estancia de Van Gogh en el asilo de Saint-Rémy-de-Provence, 'La noche estrellada' es una de las obras más emblemáticas del postimpresionismo. La pintura representa una vista nocturna desde la ventana del asilo, con un cielo turbulento lleno de estrellas brillantes y un ciprés oscuro en primer plano. La obra refleja la intensa emoción y la lucha interna del artista, utilizando colores vibrantes y pinceladas dinámicas. Actualmente se encuentra en el Museo de Arte Moderno (MoMA) de Nueva York." },
  { tittle: "El grito", artist: "Edvard Munch", year: 1893, type: "Pintura", image: "/ImagenesDeObras/ElGrito.jpg", bibliografia:" 'El grito', pintado en 1893, es una obra icónica del expresionismo creada por el artista noruego Edvard Munch. La pintura captura una figura andrógina en un momento de angustia existencial, con un fondo de cielo rojo y ondulado que refleja su estado emocional. Munch creó varias versiones de esta obra utilizando diferentes técnicas, incluyendo óleo, temple y pastel. 'El grito' simboliza la ansiedad y el miedo universales, y se ha convertido en un símbolo cultural reconocido mundialmente. Una de las versiones más famosas se encuentra en la Galería Nacional de Noruega en Oslo." },
  { tittle: "Las señoritas de Aviñón", artist: "Pablo Picasso", year: 1907, type: "Pintura", image: "/ImagenesDeObras/LasSeñoritasDeAvignon.jpg", bibliografia:" 'Las señoritas de Aviñón', pintada en 1907, es una obra revolucionaria de Pablo Picasso que marcó el inicio del cubismo. La pintura representa a cinco mujeres desnudas en un burdel de Barcelona, con formas geométricas y perspectivas fragmentadas que desafían las convenciones artísticas tradicionales. La obra refleja la influencia del arte africano y oceánico, así como un enfoque radical hacia la representación del cuerpo humano. Actualmente se encuentra en el Museo de Arte Moderno (MoMA) de Nueva York y es considerada una de las piezas más importantes del arte moderno." },
  { tittle: "Fountain", artist: "Marcel Duchamp", year: 1917, type: "Escultura / Ready-made", image: "/ImagenesDeObras/Fountain.jpg", bibliografia:" 'Fountain', creada en 1917 por Marcel Duchamp, es una obra emblemática del movimiento dadaísta y un hito en la historia del arte contemporáneo. Consiste en un urinario de porcelana invertido y firmado con el seudónimo 'R. Mutt'. Al presentar un objeto cotidiano como arte, Duchamp desafió las nociones tradicionales sobre lo que constituye una obra de arte, cuestionando la autoridad del artista y el papel del contexto en la percepción artística. 'Fountain' ha sido objeto de numerosas discusiones y análisis, y su influencia se extiende hasta el arte conceptual contemporáneo. La obra original fue rechazada por la Sociedad de Artistas Independientes, pero ha sido reproducida y exhibida en varios museos alrededor del mundo." },
  { tittle: "La persistencia de la memoria", artist: "Salvador Dalí", year: 1931, type: "Pintura", image: "/ImagenesDeObras/LaPersistenciaDeLaMemoria.jpg", bibliografia:" 'La persistencia de la memoria', pintada en 1931, es una de las obras más famosas del surrealismo y del artista español Salvador Dalí. La pintura presenta relojes blandos y derretidos en un paisaje onírico, simbolizando la relatividad del tiempo y la naturaleza efímera de la realidad. La obra refleja la influencia de las teorías psicoanalíticas de Sigmund Freud, explorando temas como el sueño, el subconsciente y la percepción distorsionada. Actualmente se encuentra en el Museo de Arte Moderno (MoMA) de Nueva York y es considerada un icono del arte surrealista." },
  { tittle: "Guernica", artist: "Pablo Picasso", year: 1937, type: "Pintura", image: "/ImagenesDeObras/Guernica.jpg", bibliografia:" 'Guernica', pintada en 1937, es una obra monumental de Pablo Picasso que denuncia los horrores de la guerra, específicamente el bombardeo de la ciudad vasca de Guernica durante la Guerra Civil Española. La pintura, realizada."},
  { tittle: "Number 5, 1948", artist: "Jackson Pollock", year: 1948, type: "Pintura / Expresionismo abstracto", image: "/ImagenesDeObras/Number5.jpg", bibliografia:" 'Number 5, 1948' es una obra emblemática del expresionismo abstracto creada por Jackson Pollock. Esta pintura se caracteriza por su técnica de 'dripping' o goteo, donde el artista vertía y salpicaba pintura sobre un lienzo colocado en el suelo, creando una compleja red de líneas y texturas. La obra refleja la espontaneidad y la energía del proceso creativo de Pollock, desafiando las convenciones tradicionales de la pintura. 'Number 5, 1948' es considerada una de las piezas más importantes del arte contemporáneo y ha influido en generaciones de artistas posteriores." },
  { tittle: "Latas de sopa Campbell", artist: "Andy Warhol", year: 1962, type: "Pintura / Arte pop", image: "/ImagenesDeObras/LatasDeSopaCampbell.jpg", bibliografia:" 'Latas de sopa Campbell', creada en 1962 por Andy Warhol, es una obra icónica del movimiento del arte pop. La serie consiste en 32 pinturas que representan las latas de sopa Campbell, un producto cotidiano y comercial. Warhol utilizó la serigrafía para reproducir la imagen de manera uniforme, cuestionando las nociones tradicionales de originalidad y autenticidad en el arte. La obra refleja la cultura de consumo y la influencia de los medios de comunicación en la sociedad contemporánea. 'Latas de sopa Campbell' ha sido ampliamente reconocida como una crítica a la comercialización del arte y un símbolo del arte pop." }
];

export const obras3 = [
  { tittle: "Una y Tres Sillas", artist: "Joseph Kosuth", year: 1965, type: "Instalación / Arte conceptual", image: "/ImagenesDeObras/UnaYTresSillas.jpg", bibliografia:" 'Una y Tres Sillas', creada en 1965 por Joseph Kosuth, es una obra emblemática del arte conceptual. La instalación consta de una silla física, una fotografía de la silla y una definición textual de la palabra 'silla' tomada de un diccionario. Esta obra desafía las nociones tradicionales de representación y significado en el arte, explorando la relación entre el objeto, su imagen y su concepto. Kosuth utiliza esta tríada para cuestionar cómo entendemos y percibimos los objetos cotidianos, enfatizando la importancia del lenguaje y la idea sobre la forma física. 'Una y Tres Sillas' es considerada una pieza fundamental en la historia del arte conceptual." },
  { tittle: "Untitled Film Stills (Series)", artist: "Cindy Sherman", year: 1977, type: "Fotografía", image: "/ImagenesDeObras/CindySherman.jpg", bibliografia:" 'Untitled Film Stills' es una serie de 69 fotografías en blanco."},
  { tittle: "The Dinner Party", artist: "Judy Chicago", year: 1979, type: "Instalación", image: "/ImagenesDeObras/DinnerParty.jpg", bibliografia:" 'The Dinner Party', creada entre 1974 y 1979 por Judy Chicago, es una instalación artística emblemática del feminismo. La obra consiste en una mesa triangular con 39 lugares, cada uno dedicado a una mujer histórica o mitológica significativa. Cada lugar está adornado con vajilla personalizada, incluyendo platos y servilletas que representan la identidad y logros de cada mujer. La instalación celebra la contribución de las mujeres a la historia y la cultura, desafiando la exclusión histórica de las mujeres en el arte y la sociedad. 'The Dinner Party' es considerada una pieza fundamental en el arte feminista y se exhibe permanentemente en el Brooklyn Museum de Nueva York." },
  { tittle: "TV Buddha (Series)", artist: "Nam June Paik", year: 1974, type: "Videoarte / Instalación", image: "/ImagenesDeObras/TVBuddha.jpg", bibliografia:" 'TV Buddha', creada en 1974 por Nam June Paik, es una obra pionera del videoarte que combina tecnología y espiritualidad. La instalación presenta una estatua de Buda frente a un televisor que muestra una transmisión en vivo de la propia estatua. Esta interacción crea un diálogo entre la tradición y la modernidad, cuestionando la relación entre la tecnología, la percepción y la contemplación. Paik utiliza esta obra para explorar temas de auto-reflexión y la influencia de los medios de comunicación en la sociedad contemporánea. 'TV Buddha' es considerada una pieza clave en la historia del arte contemporáneo y el videoarte." },
  { tittle: "Mona Lisa", artist: "Jean-Michel Basquiat", year: 1983, type: "Pintura", image: "/ImagenesDeObras/MonaLisa.jpg", bibliografia:" 'Mona Lisa', pintada en 1983 por Jean-Michel Basquiat, es una reinterpretación contemporánea del icónico retrato renacentista de Leonardo da Vinci. La obra combina elementos del arte callejero y el neoexpresionismo, característicos del estilo de Basquiat, con referencias culturales y simbólicas. En esta versión, Basquiat incorpora su distintivo uso del color, la línea y el texto para desafiar las convenciones artísticas y explorar temas de identidad, poder y cultura. 'Mona Lisa' refleja la fusión de la alta cultura con la cultura popular, y es considerada una pieza significativa en la carrera de Basquiat y en el arte contemporáneo." },
  { tittle: "Away from the Flock (El cordero imposible)", artist: "Damien Hirst", year: 1994, type: "Escultura / Instalación", image: "/ImagenesDeObras/ElCorderoImposible.jpg", bibliografia:" 'Away from the Flock', también conocido como 'El cordero imposible', es una obra creada en 1994 por Damien Hirst. La instalación presenta un cordero disecado suspendido en una vitrina de vidrio llena de formol, desafiando las percepciones tradicionales de la vida y la muerte. Hirst utiliza esta obra para explorar temas de mortalidad, religión y la naturaleza efímera de la existencia. La presentación clínica del animal en formol contrasta con su simbolismo religioso, evocando reflexiones sobre el sacrificio y la redención. 'Away from the Flock' es una pieza emblemática del arte contemporáneo y ha generado debates sobre la ética y la estética en el arte." },
  { tittle: "The Matter of Time (Una cuestión de tiempo)", artist: "Richard Serra", year: 2005, type: "Escultura / Instalación", image: "/ImagenesDeObras/TheMatterOfTime.jpg", bibliografia:" 'The Matter of Time', creada en 2005 por Richard Serra, es una instalación escultórica monumental ubicada en el Museo Guggenheim Bilbao. La obra consiste en una serie de enormes placas de acero curvadas que forman un laberinto por el que los visitantes pueden caminar. A través de su interacción con el espacio y la percepción del tiempo, Serra invita a los espectadores a experimentar la relación entre el cuerpo, el entorno y la materia. La instalación explora temas de peso, equilibrio y movimiento, desafiando las convenciones tradicionales de la escultura. 'The Matter of Time' es considerada una de las obras más importantes de Serra y un hito en el arte contemporáneo." },
  { tittle: "Girl with Balloon", artist: "Banksy", year: 2002, type: "Pintura / Arte urbano", image: "/ImagenesDeObras/GirlWithBallon.jpg", bibliografia:" Girl with Balloon (Niña con globo) de Banksy es una icónica obra de arte callejero (stencil) que muestra a una niña extendiendo su mano hacia un globo rojo con forma de corazón que se le escapa, simbolizando la pérdida de la inocencia, la esperanza, el amor y la fragilidad de la vida." },
  { tittle: "Sunflower Seeds (Semillas de girasol)", artist: "Ai Weiwei", year: 2010, type: "Instalación", image: "/ImagenesDeObras/SemillasDeGirasol.jpg", bibliografia:" 'Sunflower Seeds', creada en 2010 por Ai Weiwei, es una instalación artística que consiste en millones de semillas de girasol de porcelana hechas a mano. La obra fue exhibida en la Tate Modern de Londres y cubría el piso de la sala de Turbina del museo. Cada semilla fue elaborada por artesanos chinos utilizando técnicas tradicionales, lo que refleja la habilidad y el trabajo colectivo. La instalación aborda temas de individualidad, colectividad y la relación entre el individuo y la sociedad, así como las complejidades de la producción en masa y el consumismo. 'Sunflower Seeds' es una pieza significativa en la carrera de Ai Weiwei y en el arte contemporáneo." },
  { tittle: "Machine Hallucinations (Series)", artist: "Refik Anadol", year: 2019, type: "Arte digital / Instalación", image: "/ImagenesDeObras/MachineHallucination.jpg", bibliografia:" 'Machine Hallucinations', creada en 2019 por Refik Anadol, es una serie de instalaciones de arte digital que exploran la intersección entre la inteligencia artificial, el aprendizaje automático y la percepción humana. Utilizando algoritmos avanzados, Anadol transforma grandes conjuntos de datos visuales en experiencias inmersivas y dinámicas que desafían las nociones tradicionales de la realidad y la creatividad. La obra invita a los espectadores a reflexionar sobre el papel de la tecnología en la sociedad contemporánea y cómo ésta puede expandir los límites de la imaginación humana. 'Machine Hallucinations' ha sido exhibida en varios museos y festivales de arte digital alrededor del mundo." }
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
const obrasConIds = [
  ...obras1.map(o => ({
    titulo: o.tittle,
    artista: diccionario[o.artist],
    anio: o.year,
    tipo: o.type,
    categoria: "obras1",
    disponible: true,
    image: o.image,
    bibliografia: o.bibliografia
  })),
  ...obras2.map(o => ({
    titulo: o.tittle,
    artista: diccionario[o.artist],
    anio: o.year,
    tipo: o.type,
    categoria: "obras2",
    disponible: true,
    image: o.image,
    bibliografia: o.bibliografia
  })),
  ...obras3.map(o => ({
    titulo: o.tittle,
    artista: diccionario[o.artist],
    anio: o.year,
    tipo: o.type,
    categoria: "obras3",
    disponible: true,
    image: o.image,
    bibliografia: o.bibliografia
  }))
];


    // Inserta todas las obras
    await Obra.insertMany(obrasConIds);

    console.log("✔ Datos insertados correctamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit();
  }
}


// 👇 SOLO se ejecuta si lo lanzas con `node`
if (process.argv[1].includes("insertarDatos.js")) {
  insertarDatos();
}


