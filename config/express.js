// modules
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config/config');
var path = require('path');

// instantiate express app
var app = express();

module.exports = function () {
    // setup env
    process.env.NODE_ENV = config.server.env;

    // use body parser & cookie parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // static roots
    app.use(express.static('public'));
    app.use('/scripts', express.static(path.resolve('./node_modules')));

    // routes
    require('../app/routes/apis')(app, express);
    require('../app/routes/routes')(app);

    // return instance of express
    return app;
};
