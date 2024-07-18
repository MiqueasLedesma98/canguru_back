const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const providerDataSchema = new Schema(
  {
    services: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Service",
        required: [true, "El servicio es obligatorio"],
      },
    ],
    availability: [
      {
        type: Schema.Types.ObjectId,
        ref: "Availability",
        required: [true, "La disponibilidad es obligatoria"],
      },
    ],
    status: { type: Boolean, default: false },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "La ubicación es obligatoria"],
    },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "El nombre es obligatorio"] },
    lastName: { type: String, required: [true, "El apellido es obligatorio"] },
    role: {
      type: String,
      enum: ["CLIENT", "PROVIDER", "ADMIN"],
      default: "CLIENT",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "El email ya esta registrado en la DB"],
    },
    providerData: { type: providerDataSchema },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
    password: { type: String, required: ["La contraseñá es obligatoria"] },
    img: { type: String },
    booking: { type: Schema.Types.ObjectId, ref: "Booking" },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      this.email = this.email;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = model("User", userSchema);
