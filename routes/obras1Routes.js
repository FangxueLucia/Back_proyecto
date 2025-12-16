import express from "express";
import { obras1 } from "../seed/insertarDatos.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ results: obras1 });
});

export default router;
