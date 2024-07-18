const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "Es obligatorio ingresar una puntuación"],
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: [true, "Debes añadir un comentario"],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Review", reviewSchema);
