const { Booking } = require("../models");

module.exports = {
  checkAvailability: async ({ date, provider, duration }) => {
    const exists = await Booking.findOne({
      status: { $in: ["confirmed", "pending"] },
      provider,
      duration,
      date,
    }).lean();

    if (exists)
      throw new Error(
        `La fecha ${date} en el horario de ${duration?.start} - ${duration.end} no esta disponible`
      );
  },
};
