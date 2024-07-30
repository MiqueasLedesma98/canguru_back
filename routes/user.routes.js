// Library's
const Router = require("express");

// Middlewares
const { validateJWT, validationErrors } = require("../middlewares");

// Controllers
const { user: controller } = require("../controllers");
const { check } = require("express-validator");

const router = Router();

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Debe ser un ID válido").isMongoId(),
    validationErrors,
  ],
  controller.getUserById
);

// router.put(
//   "/provider/:id",
//   [validateJWT, validationErrors],
//   controller.updateProvider
// );

router.put("/:id", [validateJWT, validationErrors], controller.update);

module.exports = router;
