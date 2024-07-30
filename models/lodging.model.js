const { Schema, model } = require("mongoose");

const lodgingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El provider es Obligatorio"],
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "La locación es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
  },
  { versionKey: false }
);

module.exports = model("Lodging", lodgingSchema);
