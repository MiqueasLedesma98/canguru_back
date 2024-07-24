const { Schema, model } = require("mongoose");

const codeSchema = new Schema({
  code: { type: String, required: true },
  uid: { type: Schema.Types.ObjectId, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

module.exports = model("Code", codeSchema);
