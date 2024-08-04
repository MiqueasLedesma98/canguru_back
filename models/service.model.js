const { model, Schema } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "La categoria es obligatoria"],
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El proveedor es obligatorio"],
    },
    durationOptions: { type: [Number], default: [3, 6, 12, 24] },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    status: { type: Boolean, default: true },
    img: { type: String },
  },
  { versionKey: false }
);

module.exports = model("Service", serviceSchema);
