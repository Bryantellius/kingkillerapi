const express = require("express");
const characterRouter = require("./characters");

const router = express.Router();

router.use("/api/v1", characterRouter);

module.exports = router;
