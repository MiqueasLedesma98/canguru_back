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
    },
    timeslots: [timeslotSchema],
  },
  { _id: false, versionKey: false, timestamps: false }
);

const availabilitySchema = new Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    days: { type: [dayAvailabilitySchema], default: [] },
  },
  { versionKey: false }
);

availabilitySchema.pre("save", async function (next) {
  try {
    // Se asegura de que days no contenga repetidos
    this.days = Array.from(new Set(this.days));
    next();
  } catch (error) {
    console.log(error);
    throw new Error(`A ocurrido un error: ${error.message}`);
  }
});

module.exports = model("Availability", availabilitySchema);
