const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/characters", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../assets/characters.json"));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
