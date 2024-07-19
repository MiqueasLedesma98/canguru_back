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
    check("collection", "La colección debe ser una colección válida").isIn(
      allowedCollections
    ),
    check("id", "Debe ser un MongoID válido").isMongoId(),
    validationErros,
  ],
  controller.uploadFile
);

router.delete(
  "/:collection/:id",
  [
    validateJWT,
    check("collection", "La colección debe ser una colección válida").isIn(
      allowedCollections
    ),
    validationErros,
  ],
  controller.deleteImage
);

router.get(
  "/:collection/:name",
  [
    check("collection", "La colección debe ser una colección válida").isIn(
      allowedCollections
    ),
    validationErros,
  ],
  controller.showImage
);

module.exports = router;
