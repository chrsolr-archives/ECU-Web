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
    
    Parse.initialize(config.apis_keys.parse_app_key, config.apis_keys.parse_client_key);
    
    Parse.Config.get().then(function(psConfig) {
      var api_keys = psConfig.get("api_keys");
      
      config.apis_keys.youtube = api_keys.youtube;
      config.apis_keys.soundcloud_client_id = api_keys.soundcloud_client_id;

    });

    app.use(morgan('dev'));

    // static roots
    app.use('/css', express.static(path.resolve('./public/css')));
    app.use('/libs', express.static(path.resolve('./public/libs')));
    app.use('/js', express.static(path.resolve('./public/js')));
    app.use('/images', express.static(path.resolve('./public/images')));
    app.use('/scripts', express.static(path.resolve('./node_modules')));
    app.use('/views', express.static(path.resolve('./public/views')));

    // minify js files
    var uglified = uglify.minify([
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './public/libs/soundcloud-audio/soundcloud-audio.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-loading-bar/build/loading-bar.min.js',
        './node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
        './public/libs/ng-tweets/ng-tweets.min.js',
        './public/js/core/application.js',
        './public/js/core/application-config.js',
        './public/js/core/application-run.js',
        './public/js/directives/media/media-image-directive.js',
        './public/js/services/navigation-services.js',
        './public/js/services/global-services.js',
        './public/js/services/news-services.js',
        './public/js/services/youtube-services.js',
        './public/js/services/soundcloud-services.js',
        './public/js/controllers/global-controller.js',
        './public/js/controllers/navbar-controller.js',
        './public/js/controllers/home-controller.js',
        './public/js/controllers/news-controller.js',
        './public/js/controllers/news-details-controller.js',
        './public/js/controllers/videos-controller.js',
        './public/js/controllers/videos-details-controller.js'
    ], {
        mangle: true,
        compress: {
            // sequences: true,
            // dead_code: true,
            // conditionals: true,
            // booleans: true,
            // unused: true,
            // if_return: true,
            // join_vars: true,
            // drop_console: true
        }
    });

    fs.writeFileSync('./public/js/application.min.js', uglified.code);

    // routes
    require('../app/routes/apis')(app, express);
    require('../app/routes/routes')(app);

    // return instance of express
    return app;
};