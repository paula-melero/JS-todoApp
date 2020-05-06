const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')(process.env);
require('./startup/logging')();
require('./startup/config')();

app.use(express.static('public'));

module.exports = app;
