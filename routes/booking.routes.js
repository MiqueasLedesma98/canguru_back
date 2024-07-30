const Router = require("express");
const { check } = require("express-validator");

const { booking: controller } = require("../controllers");

const {
  validateJWT,
  validateProvider,
  validationErrors,
} = require("../middlewares");

const router = Router();

router.post("/", [validateJWT, validationErrors], controller.createBooking);

router.get(
  "/client",
  [
    validateJWT,
    check("page", "Debe ser un número").optional().isNumeric(),
    check("limit", "Debe ser un número").optional().isNumeric(),
    validationErrors,
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
    validationErrors,
  ],
  controller.getBookingListProvider
);

module.exports = router;
