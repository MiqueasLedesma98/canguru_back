const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "La categoria debe tener un nombre"],
    },
    description: { type: String, default: "" },
    state: { type: Boolean, default: true },
  },
  { versionKey: false }
);

module.exports = model("Category", categorySchema);
