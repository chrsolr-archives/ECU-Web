// modules
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config/config');
var path = require('path');
var morgan = require('morgan');
var Parse = require('parse/node').Parse;
var fs = require('fs');
var uglify = require('uglify-js');

// instantiate express app
var app = express();

module.exports = function () {

    // use body parser & cookie parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    Parse.initialize("Mw0dWtJQYVzYlA4vHybSNmuyLJSjzpEpTarhZMEQ", "gXEJhvTtHQcSNrryJ7u9IK4euVWOu00QEGnaK7ow");
    
    app.use(morgan('dev'));

    // static roots
    app.use('/css', express.static(path.resolve('./public/css')));
    app.use('/libs', express.static(path.resolve('./public/libs')));
    app.use('/js', express.static(path.resolve('./public/js')));
    app.use('/images', express.static(path.resolve('./public/images')));
    app.use('/scripts', express.static(path.resolve('./node_modules')));
    app.use('/views', express.static(path.resolve('./public/views')));

    // minify files
    var uglified = uglify.minify([
        './public/js/application.js',
        './public/js/services/navigation-services.js',
        './public/js/services/global-services.js',
        './public/js/services/news-services.js',
        './public/js/services/youtube-services.js',
        './public/js/services/soundcloud-services.js',
        './public/js/controllers/global-controller.js',
        './public/js/controllers/navbar-controller.js',
        './public/js/controllers/home-controller.js',
        './public/js/controllers/videos-controller.js',
    ], {
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        }
    });

    //fs.writeFile('./public/js/application.min.js', uglified.code, function (err){
    //    if (err) throw err;
    //});

    // routes
    require('../app/routes/apis')(app, express);
    require('../app/routes/routes')(app);

    // return instance of express
    return app;
};