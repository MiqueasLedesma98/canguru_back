const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "La categoria debe tener un nombre"],
    },
    description: { type: String, default: "" },
    status: { type: Boolean, default: true },
    img: { type: [String], default: [] },
  },
  { timestamps: false, versionKey: false }
);

module.exports = model("Category", categorySchema);
