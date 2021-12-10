const express = require("express");
const { readFile } = require("fs")
const { join } = require("path")

const router = express.Router();

router.get("/characters", (req, res, next) => {
  try {
    let charactersFile = join(__dirname, "../assets/characters.json");
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

router.get("/locations", (req, res, next) => {
  try {
    let locationsFile = join(__dirname, "../assets/locations.json");
    let { name } = req.query;

    if (name) {
      readFile(locationsFile, (err, locations) => {
        if (err) next(err);

        let char = JSON.parse(locations.toString()).find(
          (val) => val.name.toLowerCase() == name.toLowerCase()
        );

        if (char) res.json(char);
        else res.json({ msg: `No character found for ${name}` });
      });
    } else {
      res.sendFile(locationsFile);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/objects", (req, res, next) => {
  try {
    let objectsFile = join(__dirname, "../assets/objects.json");
    let { name } = req.query;

    if (name) {
      readFile(objectsFile, (err, objects) => {
        if (err) next(err);

        let char = JSON.parse(objects.toString()).find(
          (val) => val.name.toLowerCase() == name.toLowerCase()
        );

        if (char) res.json(char);
        else res.json({ msg: `No character found for ${name}` });
      });
    } else {
      res.sendFile(objectsFile);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/creatures", (req, res, next) => {
  try {
    let creaturesFile = join(__dirname, "../assets/creatures.json");
    let { name } = req.query;

    if (name) {
      readFile(creaturesFile, (err, creatures) => {
        if (err) next(err);

        let char = JSON.parse(creatures.toString()).find(
          (val) => val.name.toLowerCase() == name.toLowerCase()
        );

        if (char) res.json(char);
        else res.json({ msg: `No character found for ${name}` });
      });
    } else {
      res.sendFile(creaturesFile);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/groups", (req, res, next) => {
  try {
    let groupsFile = join(__dirname, "../assets/groups.json");
    let { name } = req.query;

    if (name) {
      readFile(groupsFile, (err, groups) => {
        if (err) next(err);

        let char = JSON.parse(groups.toString()).find(
          (val) => val.name.toLowerCase() == name.toLowerCase()
        );

        if (char) res.json(char);
        else res.json({ msg: `No character found for ${name}` });
      });
    } else {
      res.sendFile(groupsFile);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
