const { request } = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

module.exports = {
  validateJWT: async (req = request, res, next) => {
    try {
      const token = req.headers["x-token"];
      if (!token)
        return res.status(401).json({ msg: "No autorizado, falta token" });

      const { uid } = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findById(uid).select("-password").lean();

      if (!user.status)
        return res.status(401).json({
          msg: "Cuenta deshabilitada, pongase en contacto con un administrador",
        });

      if (!user)
        return res.status(401).json({
          msg: "No autorizado, usuario no encontrado",
        });

      req.user = user;
      req.uid = uid;

      next();
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
