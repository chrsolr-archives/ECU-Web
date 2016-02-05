var mongoose = require('mongoose');
var app = require('./server/config/express')();
var config = require('./server/config/config');

if (process.env.NODE_ENV === 'dev') {
	// ONLY ON DEV ENV
	var morgan = require('morgan');

	// logger
	app.use(morgan('dev'));
}

/**
 * Connect to mongolab
 */
mongoose.connect(config.server.db);

/**
 *
 */
app.listen(config.server.port, function (err) {
	if (err) throw err;

	console.info('Application running at port: ' + config.server.port);
});