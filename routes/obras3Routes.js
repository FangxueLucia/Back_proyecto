import express from "express";
import { obras3 } from "../seed/insertarDatos.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ results: obras3 });
});

export default router;
