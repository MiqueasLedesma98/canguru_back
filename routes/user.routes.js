const Router = require("express");

const router = Router();

router.get("/", (_req, res) => {
  res.send("HelloWorld!");
});

module.exports = router;
