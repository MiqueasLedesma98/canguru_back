const { User, Service } = require("../models");

const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

module.exports = {
  userAlreadyExist: async (value) => {
    const user = await User.findOne({ email: value, status: true }).lean();
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
    const user = await User.findOne({
      email: value.toLowerCase(),
      status: true,
    }).lean();
    if (!user) throw new Error("Usuario no encontrado");
    return true;
  },
  serviceExist: async (value) => {
    const service = await Service.findOne({ _id: value, status: true }).lean();
    if (!service) throw new Error(`El servicio con id ${value} no existe`);
    return true;
  },
};
