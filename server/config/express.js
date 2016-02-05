// modules
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var path = require('path');

// instantiate express app
var app = express();
var api = express.Router();

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
    app.use('/api', api);
    
    require('../routes/apis')(app, express);
    require('../routes/node-routes')(app);
    require('../routes/news-routes')(api);

    // return instance of express
    return app;
};
