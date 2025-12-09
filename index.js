import express from "express";
import Router from "./routes/sign.routes.js";
import verifyRouter from "./routes/verify.route.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Wiwiwiwiwiii");
});

app.use("/api", Router);
app.use("/api/protected", authMiddleware, verifyRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
