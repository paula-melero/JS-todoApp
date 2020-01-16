const express = require("express");
const app = express();
const path = require("path");
const index_path = path.join(__dirname, "/public");

require("./startup/routes")(app);
require("./startup/db")(process.env);
require("./startup/logging")();
require("./startup/config")();

app.get("/", (req, res) => {
  res.sendFile(index_path);
});

module.exports = app;
