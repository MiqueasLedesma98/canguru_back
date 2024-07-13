const { request } = require("express");

module.exports = {
  validateJWT: async (req = request, res, next) => {
    try {
      const token = req.headers["x-token"];
      if (!token) return res.status(401).json({ msg: "no-authorizado" });

      // TODO: TERMINAR MIDDLEWARE DE AUTH
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
