const { Booking } = require("../models");

const { checkAvailability } = require("../helpers");
const { Types } = require("mongoose");

module.exports = {
  createBooking: async (req, res, next) => {
    try {
      const { service, user, date, start, end, provider } = req.body;

      const duration = { start, end };

      await checkAvailability({ date, duration, provider });

      console.log({ id: new Types.ObjectId(provider) });

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
  // TODO: Terminar controladores para traer las reservas
  getBookingListClient: async (req, res, next) => {
    try {
      const { uid = "" } = req;
      const { page = 1, limit = 10 } = req.query;

      const { date, status } = req.body; // Si se quiere filtrar x algo mas adelante;

      const query = {};

      if (date) query.date = date;
      if (status) query.status = status;

      const bookings = await Booking.aggregate([
        {
          $match: {
            user: new Types.ObjectId(uid),
            ...query,
          },
        },
        { $skip: Number(page - 1) * Number(limit) },
        { $limit: Number(limit) },
        { $sort: { date: -1 } },
        {
          $lookup: {
            from: "services",
            localField: "service",
            foreignField: "_id",
            as: "service_details",
            pipeline: [
              {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "_id",
                  as: "category_details",
                  pipeline: [{ $project: { state: 0 } }],
                },
              },
              { $project: { provider: 0, category: 0, durationOptions: 0 } },
            ],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "provider",
            foreignField: "_id",
            as: "provider_details",
            pipeline: [
              {
                $project: {
                  password: 0,
                  status: 0,
                  role: 0,
                  google: 0,
                  providerData: 0,
                },
              },
            ],
          },
        },
        { $project: { service: 0, user: 0, provider: 0 } },
      ]);

      return res.send({ msg: "OK", bookings });
    } catch (error) {
      next(error);
    }
  },
  getBookingListProvider: async (req, res, next) => {
    try {
      const { uid = "" } = req;
      const { page = 1, limit = 10 } = req.query;

      const { date, status } = req.body; // Si se quiere filtrar x algo mas adelante;

      const query = {};

      if (date) query.date = date;
      if (status) query.status = status;

      const bookings = await Booking.aggregate([
        {
          $match: {
            provider: new Types.ObjectId(uid),
            ...query,
          },
        },
        { $skip: Number(page - 1) * Number(limit) },
        { $limit: Number(limit) },
        { $sort: { date: -1 } },
        {
          $lookup: {
            from: "services",
            localField: "service",
            foreignField: "_id",
            as: "service_details",
            pipeline: [
              {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "_id",
                  as: "category_details",
                  pipeline: [{ $project: { state: 0 } }],
                },
              },
              { $project: { provider: 0, category: 0, durationOptions: 0 } },
            ],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_details",
            pipeline: [
              {
                $project: {
                  password: 0,
                  status: 0,
                  role: 0,
                  google: 0,
                },
              },
            ],
          },
        },
        { $project: { service: 0, user: 0, provider: 0 } },
      ]);

      return res.send({ msg: "OK", bookings });
    } catch (error) {
      next(error);
    }
  },
};
