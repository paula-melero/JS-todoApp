require("dotenv").config();
const config = require("config");
const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")(process.env);
require("./startup/logging")();
require("./startup/config")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

//export server obj to use with integration tests
module.exports = server;
