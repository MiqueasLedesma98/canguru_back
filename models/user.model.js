const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "El nombre es obligatorio"] },
    lastName: { type: String, required: [true, "El apellido es obligatorio"] },
    role: { enum: ["1", "2", "3"], default: "1" }, // CLIENTE, VENDEDOR, ADMINISTRADOR
    email: {
      type: String,
      required: true,
      unique: [true, "El email ya esta registrado en la DB"],
    },
    password: { type: String, required: ["La contraseñá es obligatoria"] },
    img: { type: [String] },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = model("User", userSchema);
