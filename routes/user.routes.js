// Library's
const Router = require("express");

// Middlewares
const { validateJWT, validationErros } = require("../middlewares");

// Controllers
const { user: controller } = require("../controllers");
const { check } = require("express-validator");

const router = Router();

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Debe ser un ID válido").isMongoId(),
    validationErros,
  ],
  controller.getUserById
);

router.put(
  "/provider/:id",
  [validateJWT, validationErros],
  controller.updateProvider
);

router.put("/:id", [validateJWT, validationErros], controller.update);

module.exports = router;
