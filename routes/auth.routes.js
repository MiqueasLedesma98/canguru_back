// Library's
const Router = require("express");
const { check } = require("express-validator");

// Controller
const { auth: controller } = require("../controllers");

// Middlewares
const { validationErros } = require("../middlewares");

// Helpers
const { userAlreadyExist, passwordIsValid, userExist } = require("../helpers");

const router = Router();

router.post(
  "/register",
  [
    check("email", "Debe ser un email válido")
      .isEmail()
      .custom(userAlreadyExist),
    check("name", "Debe ser un nombre válido").notEmpty(),
    check("lastName", "Debe ser un nombre válido").notEmpty(),
    check("password", "Debe ser una contraseña válida")
      .notEmpty()
      .custom(passwordIsValid),
    check("role").isIn(["CLIENT", "PROVIDER"]),
    validationErros,
  ],
  controller.register
);

router.post(
  "/login",
  [
    check("email").isEmail().custom(userExist),
    check("password").notEmpty(),
    validationErros,
  ],
  controller.login
);

module.exports = router;
