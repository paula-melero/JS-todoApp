const winston = require("winston");

module.exports = function(err, req, res, next) {
  //add error to log file
  winston.error(err.message, err);

  if (err.name === "CastError") res.status(400).json("Invalid ID.");

  res.status(500).send(err.message);
};
