const { Location } = require("../models");

module.exports = {
  update: async (req, res, next) => {
    try {
      const { address, city, state, zipCode, country } = req.body;

      const location = await Location.findById(req.params.id);

      location.address = address;
      location.city = city;
      location.state = state;
      location.zipCode = zipCode;
      location.country = country;

      await location.save();

      return res.send({ msg: "OK", location });
    } catch (error) {
      next(error);
    }
  },
  getLocation: async (req, res, next) => {
    try {
      const location = await Location.findOne({ provider: req.uid })
        .select(["-provider"])
        .lean({
          virtuals: true,
        });

      res.send({ msg: "ok", location });
    } catch (error) {
      next(error);
    }
  },
};
