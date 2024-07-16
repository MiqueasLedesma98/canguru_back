// Library's
const Router = require("express");

// Controller
const { upload: controller } = require("../controllers");

// Middlewares
const { validateJWT, validationErros } = require("../middlewares");
const { check } = require("express-validator");

const router = Router();

const allowedCollections = ["user", "service", "category"];

router.put(
  "/:collection/:id",
  [
    validateJWT,
    check("collection", "Debe ser un modelo válido").isIn(allowedCollections),
    check("id", "Debe ser un MongoID válido").isMongoId(),
    validationErros,
  ],
  controller.uploadFile
);

router.delete(
  "/:collection/:name",
  [validateJWT, check("collection").isIn(allowedCollections), validationErros],
  controller.deleteImage
);

router.get("/:collection/:name", controller.showImage);

module.exports = router;
