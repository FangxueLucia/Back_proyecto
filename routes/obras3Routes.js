import express from "express";
import Obra from "../models/obrasModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const obras = await Obra.find({ categoria: "obras3" })
      .populate("artista", "nombre");

    res.json({ results: obras });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener obras" });
  }
});

export default router;
