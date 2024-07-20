const Router = require("express");

const router = Router();

router.get("/:id", (_req, res) => res.send("hello world"));

router.put("/:id", (_req, res) => res.send("hello world"));

router.post("/:id", (_req, res) => res.send("hello world"));

router.delete("/:id", (_req, res) => res.send("hello world"));

module.exports = router;
