const Router = require("express");
const { check } = require("express-validator");

const { service: controller } = require("../controllers");

const { validateJWT, validationErros } = require("../middlewares");

const router = Router();

router.get(
  "/",
  [
    validateJWT,
    check("page", "Debe ser un número").optional().isNumeric(),
    check("limit", "Debe ser un número").optional().isNumeric(),
    validationErros,
  ],
  controller.getServices
);

module.exports = router;
