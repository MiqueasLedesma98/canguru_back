const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const Availability = require("./availability.model");
const Location = require("./location.model");
const ProviderData = require("./provider_data.model");

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
    providerData: {
      type: Schema.Types.ObjectId,
      ref: "ProviderData",
    },
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

  if (this.role === "PROVIDER" && !this.providerData) {
    try {
      const availability = new Availability({
        provider: this._id,
      });

      const location = new Location({
        provider: this._id,
        state: "N/A",
        address: "N/A",
        city: "N/A",
        zipCode: 0,
        country: "N/A",
      });

      const providerData = new ProviderData({
        availability: availability._id,
        location: location._id,
      });

      this.providerData = providerData._id;

      await Promise.all([
        availability.save(),
        location.save(),
        providerData.save(),
      ]);

      next();
    } catch (error) {
      return next(error);
    }
  }

  next();
});

module.exports = model("User", userSchema);
