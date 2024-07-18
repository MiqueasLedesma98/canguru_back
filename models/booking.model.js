const { model, Schema } = require("mongoose");

const timeslotSchema = new Schema(
  {
    start: { type: String, required: true }, // e.j., '09:00'
    end: { type: String, required: true }, // e.j., '12:00'
  },
  { _id: false, versionKey: false }
);

const bookingSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    provider: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: [true, "La fecha es obligatoria"] },
    duration: { type: timeslotSchema, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "completed"],
      default: "pending",
    },
  },
  { versionKey: false }
);

module.exports = model("Booking", bookingSchema);
