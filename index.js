import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" })); // Permite peticiones desde el frontend

// =================== DB ===================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    })
  )
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// =================== ROUTES ===================
import obrasRoutes from "./routes/obrasRoutes.js";
import signRoutes from "./routes/sign.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";

app.use("/api/obras", obrasRoutes);
app.use("/api/auth", signRoutes);
app.use("/api", favoritesRoutes);

// =================== START ===================
// he puesto el app.listen dentro del .then para que ejecute rápido y a la base de datos le de tiempo a guardar y procesar la contraseña nueva
