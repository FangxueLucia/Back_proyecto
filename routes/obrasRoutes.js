import express from "express";
import Obra from "../models/obrasModel.js";
import Artista from "../models/artistasModel.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js";

const router = express.Router();

/**
 * GET /api/obras
 * Filtros, búsqueda, paginación y orden
 *
 * Query params soportados:
 * - precioMin, precioMax
 * - anio (exacto) / anioMin, anioMax (rango)
 * - tipo
 * - disponible (true/false)
 * - artistaId (ObjectId)
 * - artista (nombre del artista, regex)
 * - q (búsqueda general en titulo/tipo)
 * - page (default 1), limit (default 10)
 * - sort (ej: "precio", "-precio", "anio", "-anio", "titulo")
 */
router.get("/", async (req, res) => {
  try {
    const {
      precioMin,
      precioMax,
      anio, // exacto
      anioMin,
      anioMax,
      tipo,
      disponible,
      artistaId,
      artista, // nombre artista
      q,
      page = 1,
      limit = 10,
      sort,
    } = req.query;

    const filter = {};

    // ----- FILTROS NUMÉRICOS: PRECIO -----
    if (precioMin || precioMax) {
      filter.precio = {};
      if (precioMin) filter.precio.$gte = Number(precioMin);
      if (precioMax) filter.precio.$lte = Number(precioMax);
    }

    // ----- FILTRO AÑO -----
    // Exacto si viene "anio", si no, rango con anioMin/anioMax
    if (anio !== undefined && anio !== "") {
      const anioNum = Number(anio);
      if (!Number.isNaN(anioNum)) {
        filter.anio = anioNum;
      }
    } else if (anioMin || anioMax) {
      filter.anio = {};
      if (anioMin) filter.anio.$gte = Number(anioMin);
      if (anioMax) filter.anio.$lte = Number(anioMax);
    }

    // ----- FILTROS SIMPLES -----
    if (tipo) {
      filter.tipo = tipo;
    }

    if (disponible !== undefined) {
      filter.disponible = disponible === "true";
    }

    // ----- FILTRO POR ARTISTA -----
    // 1) por ID exacto
    if (artistaId) {
      filter.artista = artistaId;
    }
    // 2) por nombre del artista
    else if (artista) {
      const artistasEncontrados = await Artista.find({
        nombre: { $regex: artista, $options: "i" },
      }).select("_id");

      const artistasIds = artistasEncontrados.map((a) => a._id);

      // Si no hay matches, devolvemos vacío con metadata consistente
      if (artistasIds.length === 0) {
        return res.json({
          results: [],
          page: Number(page),
          limit: Number(limit),
          total: 0,
          totalPages: 0,
        });
      }

      filter.artista = { $in: artistasIds };
    }

    // ----- BÚSQUEDA GENERAL -----
    if (q) {
      filter.$or = [
        { titulo: { $regex: q, $options: "i" } },
        { tipo: { $regex: q, $options: "i" } },
      ];
    }

    // ----- PAGINACIÓN -----
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const total = await Obra.countDocuments(filter);

    let query = Obra.find(filter)
      .populate("artista")
      .skip(skip)
      .limit(limitNum);

    // ----- ORDEN -----
    if (sort) {
      query = query.sort(sort);
    }

    const obras = await query;

    return res.json({
      results: obras,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al obtener obras",
      error: err.message,
    });
  }
});

/**
 * ✅ GET /api/obras/coleccion/:n
 * Colecciones “simuladas” = páginas 1/2/3 del listado general
 *
 * IMPORTANTE: esta ruta va ANTES de "/:id"
 */
router.get("/coleccion/:n", async (req, res) => {
  try {
    const n = Number(req.params.n); // 1 | 2 | 3
    const pageNum = Number.isNaN(n) || n < 1 ? 1 : n;

    const limitNum = 10; // ajustá si querés
    const skip = (pageNum - 1) * limitNum;

    const total = await Obra.countDocuments({});

    const obras = await Obra.find({})
      .populate("artista")
      .skip(skip)
      .limit(limitNum);

    return res.json({
      results: obras,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al obtener colección",
      error: err.message,
    });
  }
});

/**
 * GET /api/obras/:id
 * Detalle de una obra por ID
 *
 * OJO: esta ruta va DESPUÉS del GET "/" y DESPUÉS de "/coleccion/:n"
 */
router.get("/:id", async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id).populate("artista");

    if (!obra) {
      return res.status(404).json({ message: "Obra no encontrada" });
    }

    return res.json(obra);
  } catch (err) {
    return res.status(400).json({
      message: "ID inválido o error al buscar obra",
      error: err.message,
    });
  }
});

/**
 * POST /api/obras (solo admin)
 */
router.post("/", authMiddleware, isAdminMiddleware, async (req, res) => {
  try {
    const obra = await Obra.create(req.body);
    return res.status(201).json(obra);
  } catch (err) {
    return res.status(500).json({
      message: "Error al crear obra",
      error: err.message,
    });
  }
});

/**
 * PUT /api/obras/:id (solo admin)
 */
router.put("/:id", authMiddleware, isAdminMiddleware, async (req, res) => {
  try {
    const obra = await Obra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!obra) {
      return res.status(404).json({ message: "Obra no encontrada" });
    }

    return res.json(obra);
  } catch (err) {
    return res.status(500).json({
      message: "Error al actualizar obra",
      error: err.message,
    });
  }
});

/**
 * DELETE /api/obras/:id (solo admin)
 */
router.delete("/:id", authMiddleware, isAdminMiddleware, async (req, res) => {
  try {
    const deleted = await Obra.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Obra no encontrada" });
    }

    return res.json({ message: "Obra eliminada" });
  } catch (err) {
    return res.status(500).json({
      message: "Error al eliminar obra",
      error: err.message,
    });
  }
});

export default router;
