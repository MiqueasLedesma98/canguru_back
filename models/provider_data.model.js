const { Schema, model } = require("mongoose");

const providerDataSchema = new Schema(
  {
    services: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Service",
      },
    ],
    lodging: {
      type: Schema.Types.ObjectId,
      ref: "Lodging",
    },
    availability: {
      type: Schema.Types.ObjectId,
      ref: "Availability",
    },
    status: { type: Boolean, default: false },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "La ubicación es obligatoria"],
    },
  },
  { versionKey: false }
);

module.exports = model("ProviderData", providerDataSchema);
