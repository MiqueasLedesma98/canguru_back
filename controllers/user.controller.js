const { User, Availability, Location, Service } = require("../models");

module.exports = {
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id).select("-password").lean();

      return res.send({ msg: "OK", user });
    } catch (error) {
      next(error);
    }
  },
  update: async (_req, _res, _next) => {},
  getUserDetail: async (_req, _res, _next) => {},
  deleteUser: async (_req, _res, _next) => {},
};
