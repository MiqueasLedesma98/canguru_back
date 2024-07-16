const { model, Schema } = require("mongoose");

const timeslotSchema = new Schema(
  {
    start: { type: String, required: true }, // e.j., '09:00'
    end: { type: String, required: true }, // e.j., '12:00'
  },
  { _id: false, versionKey: false }
);

const dayAvailabilitySchema = new Schema(
  {
    day: {
      type: String,
      enum: [
        "LUNES",
        "MARTES",
        "MIERCOLES",
        "JUEVES",
        "VIERNES",
        "SABADO",
        "DOMINGO",
      ],
      required: true,
    },
    timeslots: [timeslotSchema],
  },
  { _id: false, versionKey: false }
);

const availabilitySchema = new Schema(
  {
    provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    days: [dayAvailabilitySchema],
  },
  { versionKey: false }
);

module.exports = model("Availability", availabilitySchema);
