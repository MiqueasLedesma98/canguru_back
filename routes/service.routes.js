const Router = require("express");

const { service: controller } = require("../controllers");

const { validateJWT } = require("../middlewares");

const router = Router();

router.get("/", [validateJWT], controller.getServices);

module.exports = router;
