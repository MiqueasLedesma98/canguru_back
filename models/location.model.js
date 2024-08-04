const { model, Schema } = require("mongoose");

const locationSchema = new Schema(
  {
    provider: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    address: { type: String, required: [true, "Dirección es obligatoria"] },
    city: { type: String, required: [true, "La ciudad es obligatoria"] },
    state: { type: String, required: [true, "Provincia es obligatoria"] },
    zipCode: { type: Number, required: [true, "Codigo postal obligatorio"] },
    country: { type: String, required: [true, "Pais obligatorio"] },
  },
  { versionKey: false }
);

module.exports = model("Location", locationSchema);
