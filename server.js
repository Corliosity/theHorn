var express,
	app,
	server,
	router,
	admin,
	environment,
	appSettings,
	fs,
	path,
	logger,
	cookieParser,
	bodyParser;

express 		= require('express'),
staticSite		= require('./route'),
admin			= require('./admin'),
environment 	= process.env,
fs				= require('fs'),
path			= require('path'),
logger			= require('morgan'),
cookieParser	= require('cookie-parser'),
bodyParser		= require('body-parser'),
app 			= express(),
appSettings		= app.settings;

/**
 * Application Setup
 *
 * Set rules for Main Directory, Templates, Parse and Logging
 *
 */
app.set('view engine', 'jade');
app.set('view cache', false);

// Use Source FOlDER for development MODE - Grunt will create a distribution  folder
if (appSettings.env !== "production") {

	app.set('views', __dirname + '/source');

} else {
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());



/**
 * Routing setup 
 * param1 {object} - What route to handle
 * param2 {object} - Module to use
 */
app.use('/', staticSite);


/**
 * 404 Error Handler
 * Creates an error objec to be used and passed to pages.
 */
app.use(function(err, req, res, next) {
  // logic - TODO: Create Error handling here
});

server = app.listen(8080, function() {

	var host,
		port;

	host = server.address().address;
	port = server.address().port;

});

module.exports = app;