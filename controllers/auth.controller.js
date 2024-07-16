const { User } = require("../models");
const { generateJWT } = require("../helpers");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, lastName, role, email, password } = req.body;

      const user = new User({
        name,
        lastName,
        role,
        email: email.toLowerCase(),
        password,
      });

      await user.save();

      const token = generateJWT(user._id);

      return res.status(201).json({ msg: "Usuario creado", token });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { password: dbPass, ...user } = await User.findOne({
        email: email.toLowerCase(),
        status: true,
      }).lean();

      const match = bcrypt.compareSync(password, dbPass);

      if (!match) return res.status(401).json({ msg: "Contraseña incorrecta" });

      const token = generateJWT(user._id);

      return res.send({ msg: "OK", user, token });
    } catch (error) {
      next(error);
    }
  },
  recoverEmail: async (req, res, next) => {},
};
