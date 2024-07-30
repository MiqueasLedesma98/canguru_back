const defaultRoles = ["PROVIDER"];

module.exports = {
  validateRol:
    (roles = defaultRoles) =>
    (req, res, next) => {
      if (!req.user) res.status(401).json({ msg: "No autorizado" });
      if (!roles.includes(req.user.role))
        res.status(401).json({ msg: "No autorizado, el rol no es válido" });
      next();
    },
};
