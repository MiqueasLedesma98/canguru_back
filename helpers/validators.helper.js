const { User } = require("../models");

const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

module.exports = {
  userAlreadyExist: async (value) => {
    const user = await User.findOne({ email: value }).lean();
    if (user) throw new Error("El usuario ya esta registrado");
    return true;
  },
  passwordIsValid: (value) => {
    if (!regexPass.test(value)) {
      throw new Error(
        "La contraseña debe tener al menos 6 caracteres, al menos una letra y al menos un número"
      );
    }
    return true;
  },
  userExist: async (value) => {
    const user = await User.findOne({ email: value.toLowerCase() }).lean();
    if (!user) throw new Error("Usuario no encontrado");
  },
};
