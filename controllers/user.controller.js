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
  updateProvider: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        address,
        category,
        city,
        country,
        days,
        description,
        name,
        price,
        state,
        zipCode,
      } = req.body;

      const user = await User.findById(id);

      const availability = new Availability({
        provider: id,
        days,
      });

      const location = new Location({
        address,
        city,
        country,
        provider: id,
        state,
        zipCode,
      });

      const service = new Service({
        provider: id,
        category,
        description,
        name,
        price,
      });

      const providerData = {
        services: [service],
        availability,
        location,
      };

      user.providerData = providerData;

      await Promise.all([
        availability.save(),
        location.save(),
        service.save(),
        user.save(),
      ]);

      return res.send({ msg: "OK", providerData });
    } catch (error) {
      next(error);
    }
  },
  update: async (_req, _res, _next) => {},
  getUserDetail: async (_req, _res, _next) => {},
  deleteUser: async (_req, _res, _next) => {},
};
