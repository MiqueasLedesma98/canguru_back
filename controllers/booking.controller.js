const { Booking } = require("../models");

const { checkAvailability } = require("../helpers");

module.exports = {
  createBooking: async (req, res, next) => {
    try {
      const { service, user, date, start, end, provider } = req.body;

      const duration = { start, end };

      await checkAvailability({ date, duration, provider });

      const booking = new Booking({
        service,
        provider,
        user,
        date,
        duration,
      });

      await booking.save();

      return res.send({ msg: "Reserva creada", booking });
    } catch (error) {
      next(error);
    }
  },
  getBookingList: async (_req, _res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
