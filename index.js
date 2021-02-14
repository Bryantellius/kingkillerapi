const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");

const port = parseInt(process.env.PORT) || 3000;
const app = express();

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/characters", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "characters.json"));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Couldn't process request!");
});

app.listen(port, () => console.log(`Server listening on port ${port}...`));
