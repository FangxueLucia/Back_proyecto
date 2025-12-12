export function isAdminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).send("No autenticado");
  }

  if (req.user.role !== "admin") {
    return res.status(403).send("No autorizado");
  }

  next();
}
