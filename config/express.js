// modules
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config/config');
var path = require('path');
var morgan = require('morgan');

// instantiate express app
var app = express();

module.exports = function () {

    // use body parser & cookie parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    //Parse.initialize("ZbsmNrnAoWvV4miJsVzkr4qwSlodOyFzhYWHECbI", "PdB18ikRbBJPjuErs8b2I8kNwczL17bGceMc7qD8");
    
    app.use(morgan('dev'));

    // static roots
    app.use('/css', express.static(path.resolve('./public/css')));
    app.use('/libs', express.static(path.resolve('./public/libs')));
    app.use('/js', express.static(path.resolve('./public/js')));
    app.use('/images', express.static(path.resolve('./public/images')));
    app.use('/scripts', express.static(path.resolve('./node_modules')));
    app.use('/views', express.static(path.resolve('./public/views')));

    // routes
    require('../app/routes/apis')(app, express);
    require('../app/routes/routes')(app);

    // return instance of express
    return app;
};