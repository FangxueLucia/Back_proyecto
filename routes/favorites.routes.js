import express from "express";
import User from "../model/user.model.js";
import Obra from "../models/obrasModel.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/me/favorites
router.get("/me/favorites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json({ results: user.favorites || [] });
  } catch (err) {
    res.status(500).json({ message: "Error getting favorites" });
  }
});

// POST /api/me/favorites/:obraId
router.post("/me/favorites/:obraId", authMiddleware, async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.obraId);
    if (!obra) return res.status(404).send("Obra not found");

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { favorites: req.params.obraId },
    });

    res.status(201).json({ message: "Added to favorites" });
  } catch (err) {
    res.status(500).json({ message: "Error adding favorite" });
  }
});

// DELETE /api/me/favorites/:obraId
router.delete("/me/favorites/:obraId", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { favorites: req.params.obraId },
    });

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Error removing favorite" });
  }
});

export default router;
