const Router = require("express");
const { check } = require("express-validator");

const { service: controller } = require("../controllers");

const { validateJWT, validationErrors } = require("../middlewares");

const router = Router();

router.get(
  "/",
  [
    validateJWT,
    check("page", "Debe ser un número").optional().isNumeric(),
    check("limit", "Debe ser un número").optional().isNumeric(),
    validationErrors,
  ],
  controller.getServices
);

module.exports = router;
