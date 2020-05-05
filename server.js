const express = require('express');
const app = express();
const path = require('path');
const serve_static = require('serve-static');
const index_path = path.join(__dirname, '/public/index.html');
const css_path = path.join(__dirname, '/public/style.css');

require('./startup/routes')(app);
require('./startup/db')(process.env);
require('./startup/logging')();
require('./startup/config')();

app.use(express.static('public'));

module.exports = app;
