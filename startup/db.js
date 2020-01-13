const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function() {
  const db = config.get("db");
  console.log("connection string: ", db);
  mongoose.set("useCreateIndex", true); //fix mongoose deprecation warning
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => winston.info(`Connected to ${db}`));
  // .catch((err) => winston.error('Could not connect to MongoDB'));
};
