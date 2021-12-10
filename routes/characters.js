const express = require("express");
const { readFile } = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    let charactersFile = path.join(__dirname, "../assets/characters.json");
    let { name } = req.query;

    if (name) {
      readFile(charactersFile, (err, characters) => {
        if (err) next(err);

        let char = JSON.parse(characters.toString()).find(
          (val) => val.name.toLowerCase() == name.toLowerCase()
        );

        if (char) res.json(char);
        else res.json({ msg: `No character found for ${name}` });
      });
    } else {
      res.sendFile(charactersFile);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
