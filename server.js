require('dotenv').config();
const config = require('config');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')(process.env);
require('./startup/logging')();

const path = require('path');
const startupDebugger = require('debug')('app:startup'); //debug module returns a function. We define an argument for the function with an arbitrary namespace
const helmet = require('helmet'); //helps secure apps by setting various HTTP headers
const morgan = require('morgan'); //logs HTTP requests
const index_path = path.join(__dirname, './index.html');

//MIDDLEWARE (fns w/ access to req and res objects)
app.use(express.urlencoded({extended: true}));//key=value&key=value -> req.body. works for arrays and objects too
app.use(express.static('public')); //used to serve static files in the public folder
app.use(helmet());

//DEBBUGGING    
//log HTTP requests on dev env only 
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled ...');
}

//Log Config Settings
console.log('Application Name:' + config.get('name'));
console.log('Mail server:' + config.get('mail.host'));


//ensure jwtPrivate key is set
if(!process.env.jwtPrivateKey) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.get('/', (req, res) => {
    res.sendFile(index_path);
});

const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

