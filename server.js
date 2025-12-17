require("dotenv").config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

//  Aca servimos a la carpeta public (IMÁGENES)
// Todo lo que pongamos en Back_proyecto/public será accesible desde:
// http://localhost:3000/
app.use(express.static(path.join(__dirname, "public")));

// Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((err) => console.error(err));

// CommonJS routes
const obrasRoutes = require("./routes/obrasRoutes");
app.use("/api/obras", obrasRoutes);

// ESM routes
async function mountESMRoutes() {
  const signModule = await import("./routes/sign.routes.js");
  app.use("/api/auth", signModule.default);

  //  Comentado TEMPORALMENTE hasta que confirmem que no rompí nada
  // const favModule = await import("./routes/favorites.routes.js");
  // app.use("/api", favModule.default);

  console.log("✅ Rutas ESM montadas: /api/auth");
}

mountESMRoutes()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor corriendo en puerto ${port}`);
      console.log(`🖼️ Imágenes: http://localhost:${port}/ImagenesDeObras/Guernica.jpg`);
    });
  })
  .catch((err) => {
    console.error("❌ Error montando rutas ESM:", err);
  });
