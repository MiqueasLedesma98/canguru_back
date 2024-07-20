const Router = require("express");
const { check } = require("express-validator");

const { booking: controller } = require("../controllers");

const {
  validateJWT,
  validateProvider,
  validationErros,
} = require("../middlewares");

const router = Router();

router.post("/", [validateJWT, validationErros], controller.createBooking);

router.get(
  "/client",
  [
    validateJWT,
    check("page", "Debe ser un número").optional().isNumeric(),
    check("limit", "Debe ser un número").optional().isNumeric(),
    validationErros,
  ],
  controller.getBookingListClient
);

router.get(
  "/provider",
  [
    validateJWT,
    validateProvider,
    check("page", "Debe ser un número").optional().isNumeric(),
    check("limit", "Debe ser un número").optional().isNumeric(),
    validationErros,
  ],
  controller.getBookingListProvider
);

module.exports = router;
