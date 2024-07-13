const { model, Schema } = require("mongoose");

const availabilitySchema = new Schema(
  {
    provider: { type: Schema.Types.ObjectId, ref: "User" },
    date: Date,
    timeslots: [{ type: String }], // e.j., ['09:00-12:00', '13:00-16:00']
  },
  { versionKey: false }
);

module.exports = model("Availability", availabilitySchema);
