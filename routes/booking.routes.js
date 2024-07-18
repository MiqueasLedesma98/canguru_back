const Router = require("express");

const { booking: controller } = require("../controllers");

const { validateJWT, validationErros } = require("../middlewares");

const router = Router();

router.post("/", [validateJWT, validationErros], controller.createBooking);

module.exports = router;
