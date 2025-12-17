import express from "express";
import blogModel from "../models/blog.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

//ruta para obtener todos los blogs
router.get("/", async (req, res) => {
  try {
    const blog = await blogModel.find();
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//ruta para crear un nuevo blog
router.post("/", authMiddleware, async (req, res) => {
  try {
    //create() para guardar automáticamente en la DB
    const blog = await blogModel.create(req.body);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//ruta para obtener un blog por id
router.get("/:id", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
