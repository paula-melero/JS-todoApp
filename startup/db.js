
const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function() {
    mongoose.connect(process.env.DB)
    .then(() => winston.info('Connected to MongoDB'))
}