function isAdminMiddleware(req, res, next) {
  if (!req.user) return res.status(401).send("Not authenticated");
  if (req.user.role !== "admin") {
    return res.status(403).send("You do not have permission to perform this action");
  }
  next();
}

module.exports = { isAdminMiddleware };
