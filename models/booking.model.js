const { model, Schema } = require("mongoose");

const bookingSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    shopper: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: [true, "La fecha es obligatoria"] },
    duration: {
      type: Number,
      required: [true, "La duración de la reserva es obligatoria"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    state: { type: Boolean, default: true },
  },
  { versionKey: false }
);

module.exports = model("Booking", bookingSchema);
