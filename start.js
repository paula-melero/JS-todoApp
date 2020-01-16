const config = require("config");
const winston = require("winston");
const app = require("./server");

const port = config.get("port") || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;
