// Library's
const Router = require("express");
const { check } = require("express-validator");

// Controller
const { auth: controller } = require("../controllers");

// Middlewares
const { validationErrors } = require("../middlewares");

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
    validationErrors,
  ],
  controller.register
);

router.post(
  "/login",
  [
    check("email").isEmail().custom(userExist),
    check("password").notEmpty(),
    validationErrors,
  ],
  controller.login
);

router.post(
  "/recover",
  [
    check("email", "Debe ser un email válido").notEmpty().isEmail(),
    validationErrors,
  ],
  controller.email_recover
);

router.post(
  "/code",
  [
    check("code", "Debe ser un número de 6 digitos")
      .notEmpty()
      .isLength(6)
      .isNumeric(),
    validationErrors,
  ],
  controller.login_code
);

module.exports = router;
