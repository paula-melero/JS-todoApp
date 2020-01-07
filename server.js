require('dotenv').config();
const config = require('config');
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')(process.env);
require('./startup/logging')();
require('./startup/config')();
require('./startup/debugging')(app);

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(config.get('name'));
    if(config.get('name') === 'JS-todoApp - Development') console.log(`Listening on port ${port} ... `);
    winston.info(`Listening on port ${port}...`);
});

