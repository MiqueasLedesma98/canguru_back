const Router = require("express");
const { check } = require("express-validator");

const { location: controller } = require("../controllers");

const {
  validateJWT,
  validationErrors,
  validateRol,
} = require("../middlewares");

const router = Router();

router.put(
  "/:id",
  [
    validateJWT,
    validateRol(["PROVIDER"]),
    check("id", "Debe ser un id Válido").isMongoId(),
    check("address").notEmpty(),
    check("state").notEmpty(),
    check("zipCode").notEmpty().isNumeric(),
    check("country").notEmpty(),
    validationErrors,
  ],
  controller.update
);

router.get("/", [validateJWT, validationErrors], controller.getLocation);

module.exports = router;
