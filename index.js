import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

// =================== DB ===================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// =================== ROUTES ===================
import obrasRoutes from "./routes/obrasRoutes.js";
import signRoutes from "./routes/sign.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";

app.use("/api/obras", obrasRoutes);
app.use("/api/auth", signRoutes);
app.use("/api", favoritesRoutes);

// =================== START ===================
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
