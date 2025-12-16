import express from "express";
import { obras2 } from "../seed/insertarDatos.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ results: obras2 });
});

export default router;
