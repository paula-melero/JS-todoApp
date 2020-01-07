const startupDebugger = require('debug')('app:startup'); //debug module returns a function. We define an argument for the function with an arbitrary namespace
const morgan = require('morgan'); //logs HTTP requests

module.exports = function () {
    //log HTTP requests on dev env only 
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('tiny'));
        startupDebugger('Morgan enabled ...');
    }
}