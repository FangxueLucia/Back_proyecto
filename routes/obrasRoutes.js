import express from "express";
import Obra from "../models/obrasModel.js"; 
// Modelo principal: de acá salen todas las obras

import Artista from "../models/artistasModel.js"; 
// Lo usamos solo cuando queremos filtrar obras por nombre de artista

import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js";

const router = express.Router();
// Router específico para /api/obras

/**
 * GET /api/obras
 * Este endpoint es el corazón del filtrado.
 * Todo entra por query params y se resuelve acá
 */
router.get("/", async (req, res) => {
  try {
    // Esto es la clave, acá LEEMOS TODO LO QUE VIENE POR LA URL
    // Ej: /api/obras?anio=1900&precioMax=500
    const {
      precioMin,
      precioMax,
      anio,        // año exacto
      anioMin,     // rango mínimo
      anioMax,     // rango máximo
      tipo,
      disponible,
      artistaId,   // si el front ya tiene el ID
      artista,     // si el front manda el nombre
      q,           // búsqueda general
      page = 1,    // default page
      limit = 10,  // default limit
      sort,        // ordenamiento
    } = req.query;

    //  OBJETO FILTRO
    // Arranca vacío y se va armando solo con lo que llegue
    const filter = {};

    //  FILTRO POR PRECIO (RANGO)
    if (precioMin || precioMax) {
      filter.precio = {};
      if (precioMin) filter.precio.$gte = Number(precioMin);
      if (precioMax) filter.precio.$lte = Number(precioMax);
    }

    //  FILTRO POR AÑO
    // a) si viene anio exacto → igualdad
    if (anio !== undefined && anio !== "") {
      const anioNum = Number(anio);
      if (!Number.isNaN(anioNum)) {
        filter.anio = anioNum;
      }
    }
    // b) si no, usamos rango
    else if (anioMin || anioMax) {
      filter.anio = {};
      if (anioMin) filter.anio.$gte = Number(anioMin);
      if (anioMax) filter.anio.$lte = Number(anioMax);
    }

    //  FILTROS SIMPLES
    if (tipo) {
      filter.tipo = tipo;
    }

    if (disponible !== undefined) {
      // viene como string, lo pasamos a booleano real
      filter.disponible = disponible === "true";
    }

    //  FILTRO POR ARTISTA
    // a) si tenemos el ID → directo
    if (artistaId) {
      filter.artista = artistaId;
    }
    // b) si viene el nombre → buscamos artistas primero
    else if (artista) {
      const artistasEncontrados = await Artista.find({
        nombre: { $regex: artista, $options: "i" },
      }).select("_id");

      const artistasIds = artistasEncontrados.map((a) => a._id);

      // si no hay artistas, ya devolvemos vacío
      if (artistasIds.length === 0) {
        return res.json({
          results: [],
          page: Number(page),
          limit: Number(limit),
          total: 0,
          totalPages: 0,
        });
      }

      // filtramos obras cuyos artistas estén en esa lista
      filter.artista = { $in: artistasIds };
    }

    //  BÚSQUEDA GENERAL (q)
    // sirve para buscar texto sin campos específicos
    if (q) {
      filter.$or = [
        { titulo: { $regex: q, $options: "i" } },
        { tipo: { $regex: q, $options: "i" } },
      ];
    }

    //  PAGINACIÓN
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    // contamos cuántos resultados hay en total
    const total = await Obra.countDocuments(filter);

    //  ARMAMOS LA QUERY FINAL
    let query = Obra.find(filter)
      .populate("artista") // trae el artista completo
      .skip(skip)
      .limit(limitNum);

    //  ORDENAMIENTO
    if (sort) {
      query = query.sort(sort);
    }

    //  EJECUTAMOS LA QUERY
    const obras = await query;

    //  RESPUESTA FINAL
    // devolvemos resultados + info para el front
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
 * POST /api/obras
 * Solo admin – crea una obra nueva
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
 * PUT /api/obras/:id
 * Solo admin – edita una obra
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
 * DELETE /api/obras/:id
 * Solo admin – elimina una obra
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
// Se importa en index.js con app.use("/api/obras", router)
