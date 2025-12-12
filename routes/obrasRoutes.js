import express from "express";
import Obra from "../models/obrasModel.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js";

const router = express.Router();

// GET /api/obras
router.get("/", async (req, res) => {
  try {
    const obras = await Obra.find().populate("artista");
    res.json(obras);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener obras" });
  }
});

// POST /api/obras (admin)
router.post("/", authMiddleware, isAdminMiddleware, async (req, res) => {
  try {
    const obra = await Obra.create(req.body);
    res.status(201).json(obra);
  } catch (err) {
    res.status(500).json({ message: "Error al crear obra" });
  }
});

// PUT /api/obras/:id
router.put("/:id", authMiddleware, isAdminMiddleware, async (req, res) => {
  try {
    const obra = await Obra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(obra);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar obra" });
  }
});

// DELETE /api/obras/:id
router.delete("/:id", authMiddleware, isAdminMiddleware, async (req, res) => {
  try {
    await Obra.findByIdAndDelete(req.params.id);
    res.json({ message: "Obra eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar obra" });
  }
});

export default router;
