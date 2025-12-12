require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

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

  console.log(" Rutas ESM montadas: /api/auth");
}

mountESMRoutes()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Error montando rutas ESM:", err);
  });
