const { model, Schema } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: { type: String, unique: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    provider: { type: Schema.Types.ObjectId, ref: "User" },
    durationOptions: { type: [Number], default: [3, 6, 12, 24] },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    state: { type: Boolean, default: true },
  },
  { versionKey: false }
);

module.exports = model("Service", serviceSchema);
