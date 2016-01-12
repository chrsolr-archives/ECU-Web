// modules
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config/config');
var path = require('path');
var Parse = require('parse/node').Parse;

// instantiate express app
var app = express();

module.exports = function () {
    // setup env
    process.env.NODE_ENV = config.server.env;

    // use body parser & cookie parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    Parse.initialize(config.apis_keys.parse_app_key, config.apis_keys.parse_client_key);

    Parse.Config.get().then(function (psConfig) {
        var api_keys = psConfig.get("api_keys");

        config.apis_keys.youtube = api_keys.youtube;
        config.apis_keys.soundcloud_client_id = api_keys.soundcloud_client_id;

    });

    // static roots
    app.use(express.static('public'));
    app.use('/scripts', express.static(path.resolve('./node_modules')));

    // routes
    require('../app/routes/apis')(app, express);
    require('../app/routes/routes')(app);

    // return instance of express
    return app;
};
