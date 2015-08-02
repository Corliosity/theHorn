var express,
	app,
	server,
	router,
	environment,
	fs,
	path,
	logger,
	cookieParser,
	bodyParser;

express 		= require('express'),
router			= require('./route'),
environment 	= process.env,
fs				= require('fs'),
path			= require('path'),
logger			= require('morgan'),
cookieParser	= require('cookie-parser'),
bodyParser		= require('body-parser'),
app 			= express();

/**
 * Application Setup
 *
 * Set rules for Main Directory, Templates, Parse and Logging
 *
 */
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());

/**
 * Found in Router
 * param1 {object} - REQUEST method
 * param2 {object} - RESPONSE method
 * return {object} - can return and OJBECT or Page Reference
 */
app.use('/', router);

server = app.listen(8080, function() {

	var host,
		port;

	host = server.address().address;
	port = server.address().port;

	console.log(environment);
	console.log('The Horn is listening at http://%s:%s', host, port);
});