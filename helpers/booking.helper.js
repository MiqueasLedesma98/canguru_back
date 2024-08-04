const { Booking } = require("../models");

module.exports = {
  checkAvailability: async ({ date, provider, duration }) => {
    const startDate = new Date(date);
    const endDate = new Date(date);

    // Convertir hora de formato 09:00 a numero para setear en el formato Date.
    const [startHour, startMinute] = duration.start.split(":").map(Number);
    const [endHour, endMinute] = duration.end.split(":").map(Number);

    startDate.setHours(startHour, startMinute, 0, 0);
    endDate.setHours(endHour, endMinute, 0, 0);

    // Verificar si no existe otra cita en el mismo dia y misma hora.
    const exists = await Booking.findOne({
      provider,
      status: { $in: ["confirmed", "pending"] },
      date: {
        $gte: new Date(startDate.setHours(0, 0, 0, 0)),
        $lt: new Date(endDate.setHours(24, 0, 0, 0)),
      },
      $or: [
        {
          "duration.start": { $lt: duration.end },
          "duration.end": { $gt: duration.start },
        },
      ],
    }).lean();

    if (exists) {
      throw new Error(
        `La fecha ${new Date(date).toLocaleDateString()} en el horario de ${
          duration.start
        } - ${duration.end} no está disponible`
      );
    }
  },
};
