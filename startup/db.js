
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.set('useCreateIndex', true); //fix mongoose deprecation warning 
    mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => winston.info('Connected to MongoDB'))
    .catch((err) => winston.error('Could not connect to MongoDB'));
}