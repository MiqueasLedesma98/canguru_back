const { Booking } = require("../models");

const { checkAvailability } = require("../helpers");
const { Types } = require("mongoose");

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
  getBookingListClient: async (req, res, next) => {
    try {
      const { uid = "" } = req;
      const { page = 1, limit = 10 } = req.query;
      // const {} = req.body; // Si se quiere filtrar x algo mas adelante;

      const bookings = await Booking.aggregate([
        { $match: { user: new Types.ObjectId(uid) } },
        { $skip: Number(page - 1) * Number(limit) },
        { $limit: Number(limit) },
        { $sort: { date: -1 } },
      ]);

      // await Booking.populate([{

      // }]);

      return res.send({ msg: "OK", bookings });
    } catch (error) {
      next(error);
    }
  },
  getBookingListProvider: async (_req, res, next) => {
    try {
      return res.send("Hello world");
    } catch (error) {
      next(error);
    }
  },
};
