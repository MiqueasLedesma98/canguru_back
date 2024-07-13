// Library
const Router = require("express");

// Controller
const { auth: controller } = require("../controllers");

// Middlewares
const {} = require("../middlewares");

const router = Router();

router.post("/", [], controller.login);

module.exports = router;
